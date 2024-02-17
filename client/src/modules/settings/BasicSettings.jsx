import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';

import Input from '../../component/Input';
import Button from '../../component/Button';
import Spinner from '../../component/Spinner';

import { GiSaveArrow } from "react-icons/gi";

const INITIAL_DATA = {
    username: '',
    firstname: '',
    lastname: '',
    bio: '',
    phoneNumber: '',
    address: ''
};

const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;
const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const PHONE_REGEX = /^\+36\d{2}-\d{3}-\d{4}$/;

const BasicSettings = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState(INITIAL_DATA); 

    const axiosPrivate = useAxiosPrivate();
    const { addToast } = useToast();
    
    useDebounce(
        () => {
        // Validate username
        if (formData.username && !USERNAME_REGEX.test(formData.username)) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            username: 'Hibás felhasználónév formátum.',
            }));
        } else if (formData.username && formData.username.length < 4) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            username: 'A felhasználónévnek legalább 4 karakter hosszúnak kell lennie.',
            }));
        } else if (formData.username && formData.username.length > 16) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            username: 'A felhasználónév legfeljebb 16 karakter hosszú lehet.',
            }));
        } else {
            setErrors((prevErrors) => ({
            ...prevErrors,
            username: '',
            }));
        }
        },
        500,
        [formData.username]
    );

    useDebounce(
        () => {
        // Validate first name and last name
        if (formData.firstname && !NAME_REGEX.test(formData.firstname)) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            firstname: 'Hibás keresztnév formátum.',
            }));
        } else {
            setErrors((prevErrors) => ({
            ...prevErrors,
            firstname: '',
            }));
        }

        if (formData.lastname && !NAME_REGEX.test(formData.lastname)) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            lastname: 'Hibás vezetéknév formátum.',
            }));
        } else {
            setErrors((prevErrors) => ({
            ...prevErrors,
            lastname: '',
            }));
        }
        },
        500,
        [formData.firstname, formData.lastname]
    );

    useDebounce(
        () => {
        // Validate phone number
        if (formData.phoneNumber && !PHONE_REGEX.test(formData.phoneNumber)) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: 'Hibás telefonszám. Formátum: +3630-123-4567',
            }));
        } else {
            setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: '',
            }));
        }
        },
        500,
        [formData.phoneNumber]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axiosPrivate.get(`/api/v1/get_user_data`).then((response) => { 
                setFormData({
                    username: response.data.username,
                    firstname: response.data.first_name,
                    lastname: response.data.last_name,
                    bio: response.data.bio || '',
                    phoneNumber: response.data.phone_number || '',
                    address: response.data.address || ''
                });
            }).catch((error) => { 
                addToast('error', error.message);
            }).finally(() => { 
                setLoading(false);
            });
        };

        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (saving) return;

        const inputFields = {
            username: formData.username,
            firstname: formData.firstname,
            lastname: formData.lastname,
            phoneNumber: formData.phoneNumber
        };

        const emptyInputs = Object.keys(inputFields).filter((key) => inputFields[key] === '');

         if (emptyInputs.length > 0) {
            emptyInputs.forEach((input) => {
                setErrors((prevErrors) => ({
                ...prevErrors,
                [input]: 'A mező kitöltése kötelező.',
                }));
            });
         }
        
        if (Object.values(errors).some((error) => error)) {
            addToast('error', 'Kérjük javítsd a hibás mezőket!');
            return;
        }

        setSaving(true);
        axiosPrivate.put('/api/v1/update_user_data', {
            username: formData.username,
            last_name: formData.lastname,
            first_name: formData.firstname,
            phone_number: formData.phoneNumber,
            bio: formData.bio,
            location: formData.address 
        }).then(() => {
            addToast('success', 'Módosítások mentve!');
        })
        .catch((error) => { 
            addToast('error', error.response.data.non_field_errors);
        })
        .finally(() => { 
            setSaving(false);
        })
    };
    
    return (
        <section className='settings_wrapper'>
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <h3>Account</h3>
                    <Input
                        type="text"
                        value={formData.username}
                        label="Felhasználónév *"
                        autoFocus={true}
                        onChange={(value) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                username: value,
                            }));
                        }}
                        className="input_field"
                        error={errors.username}
                        />
                        <div className="field_wrapper">
                            <Input
                                type="text"
                                value={formData.lastname}
                                label="Vezetéknév *"
                                onChange={(value) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        lastname: value,
                                    }));
                                }}
                                className="input_field"
                                error={errors.lastname}
                            />
                            <Input
                                type="text"
                                value={formData.firstname}
                                label="Keresztnév *"
                                onChange={(value) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        firstname: value,
                                    }));
                                }}
                                className="input_field"
                                error={errors.firstname}
                            />
                        </div>
                        <Input
                            type="tel"
                            value={formData.phoneNumber}
                            label="Mobil telefonszám *"
                            onChange={(value) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    phoneNumber: value,
                                }));
                            }}
                            className="input_field"
                            error={errors.phoneNumber}
                        />
                        <Input
                            type="textarea"
                            value={formData.bio}
                            label="Bio"
                            onChange={(value) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    bio: value,
                                }));
                            }}
                            className="input_field"
                            error={errors.bio}
                        />
                        {/* <div class="mapouter"><div class="gmap_canvas"><iframe  id="gmap_canvas" src="https://maps.google.com/maps?q=szentes%20rákóczi%20utca%20132.&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org%22%3E"></a><br/></div></div> */}
                        <Button type="submit" text="Változtatások mentése" className="primary" loading={saving}>
                            <GiSaveArrow  />
                        </Button>
                </form>
            )}
        </section>
    );   
};

export default BasicSettings;
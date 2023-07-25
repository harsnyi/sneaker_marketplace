package hu.laced.LacedProject.registration.service;

import hu.laced.LacedProject.registration.EmailValidator;
import hu.laced.LacedProject.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService{

    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator
                .test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("Email is not valid");
        }

        return "it works";
    }
}
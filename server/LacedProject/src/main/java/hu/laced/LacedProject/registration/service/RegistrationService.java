package hu.laced.LacedProject.registration.service;

import hu.laced.LacedProject.registration.EmailValidator;
import hu.laced.LacedProject.registration.RegistrationRequest;
import hu.laced.LacedProject.user.AppUser;
import hu.laced.LacedProject.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService{

    private final EmailValidator emailValidator;
    private final UserService userService;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator
                .test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("Email is not valid");
        }

        return userService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getLocation(),
                        request.getDob(),
                        request.getPassword()
                )
        );
    }
}
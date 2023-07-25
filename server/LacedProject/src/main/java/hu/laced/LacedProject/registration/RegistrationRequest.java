package hu.laced.LacedProject.registration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@ToString
public class RegistrationRequest {

    private final String firstName;
    private final String lastName;
    private final LocalDate dob;
    private final String location;
    private final String password;
    private final String email;
}

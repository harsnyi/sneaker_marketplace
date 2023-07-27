package hu.laced.LacedProject.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    //TODO: Add username,sex,phone number
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String location;
    private String password;
    private String email;
}

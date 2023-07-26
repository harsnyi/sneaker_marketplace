package hu.laced.LacedProject.login;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class LoginRequest {

    private final String email;
    private final String password;
}

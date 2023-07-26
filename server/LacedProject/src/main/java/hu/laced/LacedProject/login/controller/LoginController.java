package hu.laced.LacedProject.login.controller;

import hu.laced.LacedProject.login.LoginRequest;
import hu.laced.LacedProject.login.service.LoginService;
import hu.laced.LacedProject.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;


}

package hu.laced.LacedProject.login.service;

import hu.laced.LacedProject.login.LoginRequest;
import hu.laced.LacedProject.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserService userService;
    private final DaoAuthenticationProvider daoAuthenticationProvider;

    public Boolean login(LoginRequest request) {
        UserDetails userDetails = userService.loadUserByUsername(request.getEmail());

        return true;

    }
}

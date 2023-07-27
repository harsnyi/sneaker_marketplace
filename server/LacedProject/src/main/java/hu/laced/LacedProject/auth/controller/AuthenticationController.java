package hu.laced.LacedProject.auth.controller;

import hu.laced.LacedProject.auth.AuthenticationRequest;
import hu.laced.LacedProject.auth.AuthenticationResponse;
import hu.laced.LacedProject.auth.RegisterRequest;
import hu.laced.LacedProject.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServlet;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authentication(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServlet request, HttpServlet response){
        authenticationService.refreshToken(request,response);
    }
}

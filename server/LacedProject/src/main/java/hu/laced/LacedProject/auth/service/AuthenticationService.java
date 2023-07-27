package hu.laced.LacedProject.auth.service;

import hu.laced.LacedProject.auth.AuthenticationRequest;
import hu.laced.LacedProject.auth.AuthenticationResponse;
import hu.laced.LacedProject.auth.RegisterRequest;
import hu.laced.LacedProject.security.configuration.JwtService;
import hu.laced.LacedProject.token.Token;
import hu.laced.LacedProject.token.TokenRepository;
import hu.laced.LacedProject.token.TokenType;
import hu.laced.LacedProject.user.model.AppUser;
import hu.laced.LacedProject.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Optional<AppUser> existing = userRepository.findByEmail(request.getEmail());
        if(existing.isPresent()){
            throw new IllegalArgumentException("The user exists with the given email address.");
        }

        AppUser user = new AppUser(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getLocation(),
                request.getDob(),
                passwordEncoder.encode(request.getPassword())
        );
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveAppUserToken(savedUser, jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authentication(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllAppUserTokens(user);
        saveAppUserToken(user,jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void revokeAllAppUserTokens(AppUser appUser){
        ArrayList<Token> validTokens = (ArrayList<Token>) tokenRepository.findAllValidTokensByAppUser(appUser.getId());
        if(validTokens.isEmpty()){
            return;
        }
        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    private void saveAppUserToken(AppUser savedUser, String jwtToken) {
        var token = Token.builder()
                .appUser(savedUser)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
}

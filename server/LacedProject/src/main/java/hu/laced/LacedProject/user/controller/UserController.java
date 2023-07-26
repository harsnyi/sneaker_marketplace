package hu.laced.LacedProject.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    @GetMapping
    public ResponseEntity<String> sayHelloToUser(){
        return ResponseEntity.ok("Hello From secured body");
    }
}

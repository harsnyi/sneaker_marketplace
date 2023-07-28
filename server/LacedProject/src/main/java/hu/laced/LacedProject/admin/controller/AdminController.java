package hu.laced.LacedProject.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping
    public ResponseEntity<String> sayHelloFromAdminPage(){
        return ResponseEntity.ok("Hello From admin page");
    }
}

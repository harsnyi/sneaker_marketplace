package hu.laced.LacedProject.contribution.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/contribution")
@PreAuthorize("hasAnyRole('ADMIN','MODERATOR','CONTRIBUTOR')")
public class ContributionController {

    @GetMapping
    public ResponseEntity<String> sayHelloFromContributionPage(){
        return ResponseEntity.ok("Hello From contribution page");
    }

}

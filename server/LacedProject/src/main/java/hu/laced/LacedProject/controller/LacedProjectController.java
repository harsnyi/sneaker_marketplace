package hu.laced.LacedProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LacedProjectController {

    @GetMapping(value = "/helloWorld")
    public void helloWorld(){
        System.out.println("Hello World");
    }

}

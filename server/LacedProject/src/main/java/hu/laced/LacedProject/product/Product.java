package hu.laced.LacedProject.product;

import hu.laced.LacedProject.user.model.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String title;
    private String Description;
    private ProductCategory category;

    //TODO size based on the category
    private Integer size;

    //TODO colors
    private String color;

    //TODO conditions
    private String condition;
    private Integer price;

    //TODO sexes
    private String sex;
    private String brand;
    private String model;

    @ManyToOne
    @JoinColumn(name = "appuser_id")
    private AppUser appUser;
    private LocalDate dateOfPost;
    private Integer views;
    private Integer likes;

    //TODO activity
    private String activity;





}

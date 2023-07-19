package hu.laced.LacedProject.account;

import hu.laced.LacedProject.product.Product;
import hu.laced.LacedProject.user.User;
import hu.laced.LacedProject.user.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private LocalDate dateOfBirth;
    @OneToMany(mappedBy = "account")
    private List<Product> productList;

    //TODO Number class
    private String phoneNumber;
    private BigInteger sumOfRatings = BigInteger.valueOf(0);
    private Integer numberOfRatings = 0;
    private Integer activePosts = 0;
    private Integer activity = 0;

    //TODO Image
    private boolean profilePicture;

    //TODO
    private String location;

    public Account(String firstName,
                   String lastName,
                   String email,
                   String password,
                   UserRole role,
                   LocalDate dateOfBirth,
                   String phoneNumber,
                   BigInteger sumOfRatings,
                   Integer numberOfRatings,
                   Integer activePosts,
                   Integer activity,
                   boolean profilePicture,
                   String location) {
        super(firstName, lastName, email, password, role);
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.sumOfRatings = sumOfRatings;
        this.numberOfRatings = numberOfRatings;
        this.activePosts = activePosts;
        this.activity = activity;
        this.profilePicture = profilePicture;
        this.location = location;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", dateOfBirth=" + dateOfBirth +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", sumOfRatings=" + sumOfRatings +
                ", numberOfRatings=" + numberOfRatings +
                ", activePosts=" + activePosts +
                ", activity=" + activity +
                ", profilePicture=" + profilePicture +
                ", location='" + location + '\'' +
                '}';
    }
}

package hu.laced.LacedProject.user.model;

import hu.laced.LacedProject.product.Product;
import hu.laced.LacedProject.token.Token;
import hu.laced.LacedProject.user.Sex;
import hu.laced.LacedProject.user.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@Getter
@Entity
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private LocalDate dateOfBirth;
    private String username;
    @OneToMany(mappedBy = "appUser")
    private List<Product> productList;

    //TODO Number class
    private String phoneNumber;
    private BigInteger sumOfRatings = BigInteger.valueOf(0);
    private Integer numberOfRatings = 0;
    private Integer activePosts = 0;
    private Integer activity = 0;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    //TODO Image
    private boolean profilePicture;

    //TODO
    private String location;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;
    private Boolean locked = false;
    private Boolean enabled = true;

    @OneToMany(mappedBy = "appUser")
    private List<Token> tokens;


    public AppUser(String firstName,
                   String lastName,
                   String username,
                   Integer sex,
                   String email,
                   String phoneNumber,
                   String location,
                   LocalDate dateOfBirth,
                   String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.setSex(sex);
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.role = UserRole.ROLE_USER;
        this.location = location;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    private void setSex(Integer sexNumber) {
        switch (sexNumber) {
            case 1 -> this.sex = Sex.MALE;
            case 2 -> this.sex = Sex.FEMALE;
            case 3 -> this.sex = Sex.OTHER;
            default -> throw new IllegalArgumentException("Illegal number for setting the Sex attribute");
        }
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    //TODO
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //TODO
    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}

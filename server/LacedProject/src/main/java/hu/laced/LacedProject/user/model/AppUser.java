package hu.laced.LacedProject.user.model;

import hu.laced.LacedProject.product.Product;
import hu.laced.LacedProject.token.Token;
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
    @OneToMany(mappedBy = "appUser")
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

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;
    private Boolean locked = false;
    private Boolean enabled = true;

    @OneToMany(mappedBy = "appUser")
    private List<Token> tokens;


    public AppUser(String firstName,
                   String lastName,
                   String email,
                   String location,
                   LocalDate dateOfBirth,
                   String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.location = location;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
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

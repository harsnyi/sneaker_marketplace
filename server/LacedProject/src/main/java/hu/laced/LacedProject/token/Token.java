package hu.laced.LacedProject.token;

import hu.laced.LacedProject.user.model.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    private boolean expired;
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name="appuser_id")
    private AppUser appUser;

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }
}

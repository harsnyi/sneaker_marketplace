package hu.laced.LacedProject.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("""
    select t from Token t inner join AppUser u on t.appUser.id = u.id
    where u.id = : appUserId and(t.expired = false or t.revoked = false)
    """)
    List<Token> findAllValidTokensByAppUser(Integer appUserId);

    Optional<Token> findByToken(String token);
}

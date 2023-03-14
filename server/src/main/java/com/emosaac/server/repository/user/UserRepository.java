package com.emosaac.server.repository.user;

import com.emosaac.server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId); //프로바이더 아이디

    @Query("select u from User u where  u.userId = :userId")
    User findByMyId(@Param("userId") Long userId);


    @Query("select u from User u where  u.email = :userEmail")
    User findByUserEmail(@Param("userEmail")String userEmail);

    @Query("select u from User u where  u.email = :userEmail and u.providerId =:ProviderId")
    Optional<User> findByEmailPAndProviderId(@Param("userEmail")String userEmail, @Param("ProviderId")String ProviderId);
    @Query("select u from User u where u.providerId =:ProviderId")
    Optional<User> findByProviderId(@Param("ProviderId")String ProviderId);

    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(String email);


    Optional<User> existsUserByEmail(String email);

}

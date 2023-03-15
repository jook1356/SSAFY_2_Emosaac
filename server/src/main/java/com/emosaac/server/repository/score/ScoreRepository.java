package com.emosaac.server.repository.score;

import com.emosaac.server.domain.book.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    @Query("select s from Score s where s.book.bookId = :bookId and s.user.userId = :userId")
    Optional<Score> existsByBookIdAndUserId(Long bookId, Long userId);
}

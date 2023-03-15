package com.emosaac.server.repository.novel;

import com.emosaac.server.domain.book.BookMark;
import com.emosaac.server.domain.book.ReadBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NovelReadRepository extends JpaRepository<ReadBook, Long> {
    @Query("select r from ReadBook r where r.book.bookId = :bookId and r.user.userId = :userId")
    Optional<Object> existsByBookIdAndUserId(Long bookId, Long userId);
}

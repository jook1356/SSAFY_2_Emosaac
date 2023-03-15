package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookCommentRepository extends JpaRepository<BookComment, Long> {
    @Query("select c from BookComment c where c.commentId = :commentId")
    Optional<BookComment> findComment(@Param("commentId") Long commnetId);

    @Transactional
    @Modifying
    @Query("delete from BookComment c where c.commentId = :commentId")
    void deleteByCommentId(@Param("commentId") Long commentId);

    @Query("SELECT c FROM BookComment c WHERE c.book.bookId = :postId")
    List<BookComment> findCommentByBookId(@Param("postId")Long postId);
}

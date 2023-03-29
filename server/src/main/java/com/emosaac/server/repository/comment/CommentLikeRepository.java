package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommentLikeRepository extends JpaRepository<BookCommentLike, Long> {
    @Transactional
    @Modifying
    @Query("delete from BookCommentLike bcl where bcl.bookComment.commentId = :commentId")
    void deleteByBookCommentId(@Param("commentId") Long commentId);
}

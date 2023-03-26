package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.EmopickComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface EmopickCommentRepository extends JpaRepository<EmopickComment, Long> {
    @Query("select c from EmopickComment c where c.commentId = :commentId")
    Optional<EmopickComment> findComment(@Param("commentId") Long commnetId);
    @Transactional
    @Modifying
    @Query("delete from EmopickComment c where c.commentId = :commentId")
    void deleteByCommentId(@Param("commentId") Long commentId);

    @Query("SELECT c FROM EmopickComment c WHERE c.parent.commentId = :parentId")
    Optional<EmopickComment> findParentComment(@Param("parentId")Long parentId);
}

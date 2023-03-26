package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.EmoCommentLike;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.QCommentResponse;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static com.emosaac.server.domain.emo.QEmoCommentLike.emoCommentLike;
import static com.emosaac.server.domain.emo.QEmopickComment.emopickComment;


@RequiredArgsConstructor
@Repository
public class EmopickCommentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<CommentResponse> findParentCommentByEmopickId(Long emopickId, String criteria, PageRequest pageRequest) {
        return jpaQueryFactory.select(new QCommentResponse(emopickComment))
                .distinct().from(emopickComment)
                .where(emopickComment.emopick.EmopickId.eq(emopickId),
                        emopickComment.depth.eq(0))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<CommentResponse> findChildCommentByParentId(Long parentId, String criteria, PageRequest pageRequest) {
        return jpaQueryFactory.select(new QCommentResponse(emopickComment))
                .distinct().from(emopickComment)
                .where(emopickComment.parent.commentId.eq(parentId))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.contains("date")){
            return emopickComment.createdDate.desc();
        } else if(criteria.contains("like")){
            return emopickComment.likeScore.desc();
        }
        return emopickComment.createdDate.desc();
    }

    public Long findParentCommentCount(Long emopickId) {
        return jpaQueryFactory.select(emopickComment.count())
                .distinct().from(emopickComment)
                .where(emopickComment.emopick.EmopickId.eq(emopickId),
                        emopickComment.depth.eq(0))
                .fetchOne();
    }

    public Optional<EmoCommentLike> findEmopickCommentLikeState(Long commentId, Long userId) {
        return Optional.ofNullable(jpaQueryFactory.select(emoCommentLike)
                .distinct().from(emoCommentLike)
                .where(emopickComment.commentId.eq(commentId),
                        emopickComment.user.userId.eq(userId))
                .fetchOne());
    }

    public Long findChildCommentCount(Long parentId) {
        return jpaQueryFactory.select(emopickComment.count())
            .distinct().from(emopickComment)
            .where(emopickComment.parent.commentId.eq(parentId))
            .fetchOne();
    }
}

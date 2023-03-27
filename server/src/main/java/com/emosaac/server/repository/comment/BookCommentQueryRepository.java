package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookCommentLike;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.QCommentResponse;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.emosaac.server.domain.book.QBookComment.bookComment;
import static com.emosaac.server.domain.book.QBookCommentLike.bookCommentLike;

@RequiredArgsConstructor
@Repository
public class BookCommentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
    // 작품 당 부모 댓글 조회
    public List<CommentResponse> findParentCommentByBookId(Long bookId, String criteria, PageRequest pageRequest){
        return jpaQueryFactory.select(new QCommentResponse(bookComment))
                .distinct().from(bookComment)
                .where(bookComment.book.bookId.eq(bookId),
                        bookComment.depth.eq(0))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();

    }
    // 부모 댓글 갯수
    public Long findParentCommentCount(Long bookId){
        return jpaQueryFactory.select(bookComment.count())
                .distinct().from(bookComment)
                .where(bookComment.book.bookId.eq(bookId),
                        bookComment.depth.eq(0))
                .fetchOne();
    }
    // 작품에 사용자가 좋아요를 눌렀는 지 여부
    public Optional<BookCommentLike> findBookCommentLikeState(Long commentId, Long userId){
        return Optional.ofNullable(jpaQueryFactory.select(bookCommentLike)
                .distinct().from(bookCommentLike)
                .where(bookCommentLike.bookComment.commentId.eq(commentId),
                        bookCommentLike.user.userId.eq(userId))
                .fetchOne());

    }
    // 부모 댓글마다 자식 댓글 조회
    public List<CommentResponse> findChildCommentByBookId(Long parentId, String criteria, PageRequest pageRequest){
        return jpaQueryFactory.select(new QCommentResponse(bookComment))
                .distinct().from(bookComment)
                .where(bookComment.parent.commentId.eq(parentId))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }
    // 부모 댓글 당 자식 댓글 수
    public Long findChildCommentCount(Long parentId){
        return jpaQueryFactory.select(bookComment.count())
                .distinct().from(bookComment)
                .where(bookComment.parent.commentId.eq(parentId))
                .fetchOne();
    }

    private OrderSpecifier[] findCriteria(String criteria){ //정렬 조건
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if(criteria.contains("date")){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, bookComment.createdDate));
        } else if(criteria.contains("like")){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, bookComment.likeScore));
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, bookComment.createdDate));
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }

}

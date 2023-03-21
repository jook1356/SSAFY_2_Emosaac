package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.QCommentResponse;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBookComment.bookComment;

@RequiredArgsConstructor
@Repository
public class BookCommentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
    public List<CommentResponse> findCommentByBookId(Long bookId, String criteria, int state, PageRequest pageRequest){
        return jpaQueryFactory.select(new QCommentResponse(bookComment))
                .distinct().from(bookComment)
                .where(bookComment.book.bookId.eq(bookId),
                        bookComment.depth.eq(state))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();

    }

    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.contains("date")){
            return bookComment.createdDate.desc();
        } else if(criteria.contains("like")){
            return bookComment.likeScore.desc();
        }
        return bookComment.createdDate.desc();
    }

}

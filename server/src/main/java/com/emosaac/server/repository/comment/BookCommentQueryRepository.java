package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.QCommentResponse;
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
    public List<CommentResponse> findCommentByBookId(Long bookId ,int state, PageRequest pageRequest){
        return jpaQueryFactory.select(new QCommentResponse(bookComment))
                .distinct().from(bookComment)
                .where(bookComment.book.bookId.eq(bookId),
                        bookComment.depth.eq(0))
                .orderBy(bookComment.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();

    }

}

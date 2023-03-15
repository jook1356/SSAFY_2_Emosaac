package com.emosaac.server.repository.comment;

import com.emosaac.server.domain.book.BookComment;
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
    public List<BookComment> findCommentByBookId(Long bookId, PageRequest pageRequest){
        return jpaQueryFactory.select(bookComment).distinct().from(bookComment)
                .where(bookComment.book.bookId.eq(bookId))
//                .orderBy(bookComment.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();

    }
}

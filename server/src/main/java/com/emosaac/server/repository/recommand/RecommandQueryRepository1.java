package com.emosaac.server.repository.recommand;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.BookRequest;
import com.emosaac.server.dto.book.QBookListResponse;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QGenre.genre;
import static com.emosaac.server.domain.book.QReadBook.readBook;

@RequiredArgsConstructor
@Repository
public class RecommandQueryRepository1 {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<BookListResponse> findBestNovelList(int typeCd, Long prevId, Double prevScore, PageRequest page) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(typeCd),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.hit.desc(), book.score.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }
    public Slice<BookListResponse> findBestWebtoonList(int typeCd, Long prevId, Double prevScore, PageRequest page) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(typeCd),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.hit.desc(), book.score.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore).and(book.bookId.lt(cursorId))).or(book.score.lt(cursorScore));
    }

}

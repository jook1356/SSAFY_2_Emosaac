package com.emosaac.server.repository.search;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.book.BookDayResponse;
import com.emosaac.server.dto.book.QBookDayResponse;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;


import java.util.Arrays;
import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QScore.score1;
import static com.emosaac.server.domain.tag.QTagNovel.tagNovel;

@RequiredArgsConstructor
@Repository
public class TagQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<BookDayResponse> findTotalBookListByTagName(String tagName, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        book.tag.contains(tagName),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())  // 평점 추가
                .fetch();
    }
    public List<BookDayResponse> findBookListByTagName(String tagName, int type,  PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        book.type.eq(type),
                        book.tag.contains(tagName),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())  // 평점 추가
                .fetch();
    }
    public List<BookDayResponse> findTotalBookListByTitle(String content, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        book.title.contains(content)
                                .or(book.author.contains(content)),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }
    public List<BookDayResponse> findBookListByTitle(String content, int type, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        book.title.contains(content)
                                .or(book.author.contains(content)),
                        cursorIdAndCursorScore(prevId, prevScore),
                        book.type.eq(type)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }
    private BooleanExpression ltBookId(Long cursorId) {
        return cursorId == null ? null : book.bookId.lt(cursorId);
    }
    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore)
                .and(book.bookId.lt(cursorId)))
                .or(book.score.lt(cursorScore));
    }

    public List<Book> findBookListByTitle(String content, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(book)
                .from(book)
                .where(
                        book.title.contains(content)
                                .or(book.author.contains(content)),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }
}

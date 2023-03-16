package com.emosaac.server.repository.search;

import com.emosaac.server.domain.book.Book;
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

    public List<Book> findBookListByTagName(String tagName, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(book)
                .from(book)
                .where(
                        book.tag.contains(tagName),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc())  // 평점 추가
                .fetch();
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
                        book.title.contains(content).or(book.author.contains(content)),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc())  // 평점 추가
                .fetch();
    }
}

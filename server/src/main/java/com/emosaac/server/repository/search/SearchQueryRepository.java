package com.emosaac.server.repository.search;

import com.emosaac.server.dto.book.BookDayResponse;
import com.emosaac.server.dto.book.QBookDayResponse;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;


import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;

@RequiredArgsConstructor
@Repository
public class SearchQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<BookDayResponse> findBookListByTagName(String tagName, String type,  PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        findType(type),
                        book.tag.contains(tagName),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())  // 평점 추가
                .fetch();
    }
    public List<BookDayResponse> findBookListByTitle(String content, String type, PageRequest page, Long prevId, Double prevScore) {
        return jpaQueryFactory.select(new QBookDayResponse(book))
                .from(book)
                .where(
                        Expressions.stringTemplate("replace({0}, ' ', '')", book.title).contains(content)
                                .or(Expressions.stringTemplate("replace({0}, ' ', '')", book.author).contains(content)),
                        cursorIdAndCursorScore(prevId, prevScore),
                        findType(type)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }
    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore)
                .and(book.bookId.lt(cursorId)))
                .or(book.score.lt(cursorScore));
    }


    private BooleanExpression findType(String type) { // 검색 조건 판별
        if(type.equals("total")){
            return null;
        }else if(type.equals("webtoon")){
            return book.type.eq(0);
        }else{
            return book.type.eq(1);
        }
    }
}

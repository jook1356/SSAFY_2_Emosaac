package com.emosaac.server.repository.webtoon;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.DayToon;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.QBookResponse;
//import com.emosaac.server.dto.webtoon.QWebtoonDayResponse;
import com.emosaac.server.dto.webtoon.QWebtoonDayResponse;
import com.emosaac.server.dto.webtoon.WebtoonDayResponse;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QDayToon.dayToon;

@RequiredArgsConstructor
@Repository
public class WebtoonQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Slice<WebtoonDayResponse> findDayList(String day, PageRequest page, Long id) {
        List<WebtoonDayResponse> content =  jpaQueryFactory.select(new QWebtoonDayResponse(book))
                .from(book)
                .where(book.day.contains(day),ltArticleId(id))
                .limit(page.getPageSize()+1)
                .orderBy(book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content, page, hasNext);
    }
    private BooleanExpression ltArticleId(Long cursorId) {
        return cursorId == null ? null : book.bookId.lt(cursorId);
    }
}

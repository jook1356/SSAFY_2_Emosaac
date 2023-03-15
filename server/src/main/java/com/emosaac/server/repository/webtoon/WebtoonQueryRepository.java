package com.emosaac.server.repository.webtoon;


import com.emosaac.server.domain.book.Gerne;
import com.emosaac.server.dto.webtoon.QWebtoonListResponse;
import com.emosaac.server.dto.webtoon.WebtoonListResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.List;


import static com.emosaac.server.domain.book.QBook.book;

@RequiredArgsConstructor
@Repository
public class WebtoonQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Slice<WebtoonListResponse> findDayList(String day, PageRequest page, Long id) {
        List<WebtoonListResponse> content =  jpaQueryFactory.select(new QWebtoonListResponse(book))
                .from(book)
                .where(book.day.contains(day),ltArticleId(id),book.type.eq(0))
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

    public Slice<WebtoonListResponse> findGenreList(Gerne genre, PageRequest page, Long id) {
        List<WebtoonListResponse> content =  jpaQueryFactory.select(new QWebtoonListResponse(book))
                .from(book)
                .where(book.genre.eq(genre),ltArticleId(id),book.type.eq(0))
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

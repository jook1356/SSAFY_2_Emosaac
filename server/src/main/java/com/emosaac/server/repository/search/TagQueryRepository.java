package com.emosaac.server.repository.search;

import com.emosaac.server.domain.book.Book;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
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

    public List<Book> findBookListByTagName(String tagName) {
        return jpaQueryFactory.select(book)
                .from(book)
                .where(
                        book.tag.contains(tagName), book.type.eq(1)
                )
                .fetch();
    }


}

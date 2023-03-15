package com.emosaac.server.repository;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.QBookResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;

@RequiredArgsConstructor
@Repository
public class TestBookQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<BookResponse> findPostListByUser(String criteria, Pageable pageRequest, Long id){ //내가 쓴 글
        List<BookResponse> content = jpaQueryFactory.select(new QBookResponse(book))
                .distinct().from(book)
//                .innerJoin(book.user).fetchJoin()
                .where(
//                        book.user.userId.eq(userId)
                        ltArticleId(id)
                )
//                .orderBy(findCriteria(criteria))
//                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize()+1)
                .orderBy(book.bookId.desc())
                .fetch();

        boolean hasNext = false;

        if (content.size() == pageRequest.getPageSize()+1) {
            content.remove(pageRequest.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, pageRequest, hasNext);
    }

//    private BooleanExpression cursorIdAndCursorViews(Long cursorId, Integer cursorViews, String sortType) {
//        if (sortType.equals("views")) {
//            if (cursorId == null || cursorViews == null) {
//                return null;
//            }
//
//            return article.views.eq(cursorViews)
//                    .and(article.id.lt(cursorId))
//                    .or(article.views.lt(cursorViews));
//        }
//
//        return ltArticleId(cursorId);
//    }

    private BooleanExpression ltArticleId(Long cursorId) {
        return cursorId == null ? null : book.bookId.lt(cursorId);
    }
}

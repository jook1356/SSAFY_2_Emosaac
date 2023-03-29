package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.EmopickDetail;
import com.emosaac.server.dto.emopick.*;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.emo.QEmopick.emopick;
import static com.emosaac.server.domain.emo.QEmopickDetail.emopickDetail;

@RequiredArgsConstructor
@Repository
public class EmopickQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<EmopickListResponse> findEmopickList(PageRequest page, Long prevId) {
        List<EmopickListResponse> content = jpaQueryFactory.select(new QEmopickListResponse(emopick))
                .from(emopick)
                .where(
                        ltEmopickId(prevId)
                )
                .limit(page.getPageSize()+1)
                .orderBy(emopick.EmopickId.desc())  // 평점 추가
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public Slice<EmopickListResponse> findEmopickListByUser(PageRequest page, Long prevId, Long userId) {
        List<EmopickListResponse> content = jpaQueryFactory.select(new QEmopickListResponse(emopick))
                .from(emopick)
                .where(
                        emopick.user.userId.eq(userId),
                        ltEmopickId(prevId)
                )
                .limit(page.getPageSize()+1)
                .orderBy(emopick.EmopickId.desc())  // 평점 추가
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public List<ThumbnailListResponse> findThumbnail(Long emopickId) {
        return jpaQueryFactory.select(new QThumbnailListResponse(book))
                .from(book).join(emopickDetail).on(book.bookId.eq(emopickDetail.book.bookId))
                .where(
                        emopickDetail.emopick.EmopickId.eq(emopickId)
                ).fetch();
    }

    private BooleanExpression ltEmopickId(Long cursorId) {
        return cursorId == 0 ? null : emopick.EmopickId.lt(cursorId);
    }

    public List<BookReveiwResponse> findEmopickDetailByEmopickId(Long emopickId, int type) {
        return jpaQueryFactory.select(new QBookReveiwResponse(book, emopickDetail))
                .from(book).join(emopickDetail).on(book.bookId.eq(emopickDetail.book.bookId))
                .where(
                        emopickDetail.emopick.EmopickId.eq(emopickId),
                        emopickDetail.type.eq(type)
                )
                .orderBy(emopickDetail.createdDate.asc())
                .fetch();
    }
}

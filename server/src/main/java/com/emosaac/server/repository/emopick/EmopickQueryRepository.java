package com.emosaac.server.repository.emopick;

import com.emosaac.server.dto.emopick.EmopickListResponse;
import com.emosaac.server.dto.emopick.QEmopickListResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.emo.QEmopick.emopick;

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

    private BooleanExpression ltEmopickId(Long cursorId) {
        return cursorId == 0 ? null : emopick.EmopickId.lt(cursorId);
    }
}

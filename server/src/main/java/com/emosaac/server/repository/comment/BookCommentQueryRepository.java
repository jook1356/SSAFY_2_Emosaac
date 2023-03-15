package com.emosaac.server.repository.comment;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class BookCommentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
}

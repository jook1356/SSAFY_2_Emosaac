package com.emosaac.server.dto.webtoon;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.webtoon.QWebtoonListResponse is a Querydsl Projection type for WebtoonListResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QWebtoonListResponse extends ConstructorExpression<WebtoonListResponse> {

    private static final long serialVersionUID = 587832663L;

    public QWebtoonListResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> book) {
        super(WebtoonListResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class}, book);
    }

}


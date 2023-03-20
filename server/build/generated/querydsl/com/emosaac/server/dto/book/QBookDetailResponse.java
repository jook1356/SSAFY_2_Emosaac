package com.emosaac.server.dto.book;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.book.QBookDetailResponse is a Querydsl Projection type for BookDetailResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookDetailResponse extends ConstructorExpression<BookDetailResponse> {

    private static final long serialVersionUID = 1678856874L;

    public QBookDetailResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> book, com.querydsl.core.types.Expression<Boolean> bookmarkStatus, com.querydsl.core.types.Expression<Boolean> readStatus, com.querydsl.core.types.Expression<Double> myScore) {
        super(BookDetailResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class, boolean.class, boolean.class, double.class}, book, bookmarkStatus, readStatus, myScore);
    }

}


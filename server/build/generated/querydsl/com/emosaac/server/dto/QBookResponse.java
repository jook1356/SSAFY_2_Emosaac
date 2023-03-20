package com.emosaac.server.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.QBookResponse is a Querydsl Projection type for BookResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookResponse extends ConstructorExpression<BookResponse> {

    private static final long serialVersionUID = -1198083008L;

    public QBookResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> post) {
        super(BookResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class}, post);
    }

}


package com.emosaac.server.dto.book;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.book.QBookListResponse is a Querydsl Projection type for BookListResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookListResponse extends ConstructorExpression<BookListResponse> {

    private static final long serialVersionUID = 1259580407L;

    public QBookListResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> book) {
        super(BookListResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class}, book);
    }

}


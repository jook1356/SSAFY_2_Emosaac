package com.emosaac.server.dto.emopick;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.emopick.QBookReveiwResponse is a Querydsl Projection type for BookReveiwResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookReveiwResponse extends ConstructorExpression<BookReveiwResponse> {

    private static final long serialVersionUID = 1057323574L;

    public QBookReveiwResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> book, com.querydsl.core.types.Expression<String> review) {
        super(BookReveiwResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class, String.class}, book, review);
    }

}


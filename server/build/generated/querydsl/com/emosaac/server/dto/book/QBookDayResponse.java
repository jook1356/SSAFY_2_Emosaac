package com.emosaac.server.dto.book;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.book.QBookDayResponse is a Querydsl Projection type for BookDayResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookDayResponse extends ConstructorExpression<BookDayResponse> {

    private static final long serialVersionUID = 972070917L;

    public QBookDayResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.Book> book) {
        super(BookDayResponse.class, new Class<?>[]{com.emosaac.server.domain.book.Book.class}, book);
    }

}


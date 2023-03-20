package com.emosaac.server.dto.comment;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.comment.QCommentResponse is a Querydsl Projection type for CommentResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCommentResponse extends ConstructorExpression<CommentResponse> {

    private static final long serialVersionUID = -1985677701L;

    public QCommentResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.book.BookComment> comment) {
        super(CommentResponse.class, new Class<?>[]{com.emosaac.server.domain.book.BookComment.class}, comment);
    }

}


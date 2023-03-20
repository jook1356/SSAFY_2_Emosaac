package com.emosaac.server.dto.emopick;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.emopick.QEmopickDetailResponse is a Querydsl Projection type for EmopickDetailResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QEmopickDetailResponse extends ConstructorExpression<EmopickDetailResponse> {

    private static final long serialVersionUID = 74636286L;

    public QEmopickDetailResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.user.User> user, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<String> content) {
        super(EmopickDetailResponse.class, new Class<?>[]{com.emosaac.server.domain.user.User.class, String.class, String.class}, user, title, content);
    }

}


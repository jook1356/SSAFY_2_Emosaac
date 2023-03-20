package com.emosaac.server.dto.emopick;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.emosaac.server.dto.emopick.QEmopickListResponse is a Querydsl Projection type for EmopickListResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QEmopickListResponse extends ConstructorExpression<EmopickListResponse> {

    private static final long serialVersionUID = -2094040501L;

    public QEmopickListResponse(com.querydsl.core.types.Expression<? extends com.emosaac.server.domain.emo.Emopick> emopick) {
        super(EmopickListResponse.class, new Class<?>[]{com.emosaac.server.domain.emo.Emopick.class}, emopick);
    }

}


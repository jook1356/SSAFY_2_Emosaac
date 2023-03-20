package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDayToon is a Querydsl query type for DayToon
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDayToon extends EntityPathBase<DayToon> {

    private static final long serialVersionUID = 1100025492L;

    public static final QDayToon dayToon = new QDayToon("dayToon");

    public final StringPath bookList = createString("bookList");

    public final NumberPath<Long> dayId = createNumber("dayId", Long.class);

    public final StringPath name = createString("name");

    public QDayToon(String variable) {
        super(DayToon.class, forVariable(variable));
    }

    public QDayToon(Path<? extends DayToon> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDayToon(PathMetadata metadata) {
        super(DayToon.class, metadata);
    }

}


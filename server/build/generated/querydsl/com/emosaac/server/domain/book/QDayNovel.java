package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDayNovel is a Querydsl query type for DayNovel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDayNovel extends EntityPathBase<DayNovel> {

    private static final long serialVersionUID = -264482686L;

    public static final QDayNovel dayNovel = new QDayNovel("dayNovel");

    public final StringPath bookList = createString("bookList");

    public final NumberPath<Long> dayId = createNumber("dayId", Long.class);

    public final StringPath name = createString("name");

    public QDayNovel(String variable) {
        super(DayNovel.class, forVariable(variable));
    }

    public QDayNovel(Path<? extends DayNovel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDayNovel(PathMetadata metadata) {
        super(DayNovel.class, metadata);
    }

}


package com.emosaac.server.domain.tag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTagToon is a Querydsl query type for TagToon
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTagToon extends EntityPathBase<TagToon> {

    private static final long serialVersionUID = -673954787L;

    public static final QTagToon tagToon = new QTagToon("tagToon");

    public final StringPath bookList = createString("bookList");

    public final StringPath name = createString("name");

    public final NumberPath<Long> tagId = createNumber("tagId", Long.class);

    public QTagToon(String variable) {
        super(TagToon.class, forVariable(variable));
    }

    public QTagToon(Path<? extends TagToon> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTagToon(PathMetadata metadata) {
        super(TagToon.class, metadata);
    }

}


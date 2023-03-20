package com.emosaac.server.domain.tag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTagNovel is a Querydsl query type for TagNovel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTagNovel extends EntityPathBase<TagNovel> {

    private static final long serialVersionUID = 576703513L;

    public static final QTagNovel tagNovel = new QTagNovel("tagNovel");

    public final StringPath bookList = createString("bookList");

    public final StringPath name = createString("name");

    public final NumberPath<Long> tagId = createNumber("tagId", Long.class);

    public QTagNovel(String variable) {
        super(TagNovel.class, forVariable(variable));
    }

    public QTagNovel(Path<? extends TagNovel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTagNovel(PathMetadata metadata) {
        super(TagNovel.class, metadata);
    }

}


package com.emosaac.server.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QResearch is a Querydsl query type for Research
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResearch extends EntityPathBase<Research> {

    private static final long serialVersionUID = 414808955L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QResearch research = new QResearch("research");

    public final com.emosaac.server.domain.book.QBook book;

    public final NumberPath<Long> gerneId = createNumber("gerneId", Long.class);

    public final NumberPath<Long> researchId = createNumber("researchId", Long.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public QResearch(String variable) {
        this(Research.class, forVariable(variable), INITS);
    }

    public QResearch(Path<? extends Research> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QResearch(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QResearch(PathMetadata metadata, PathInits inits) {
        this(Research.class, metadata, inits);
    }

    public QResearch(Class<? extends Research> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new com.emosaac.server.domain.book.QBook(forProperty("book"), inits.get("book")) : null;
    }

}


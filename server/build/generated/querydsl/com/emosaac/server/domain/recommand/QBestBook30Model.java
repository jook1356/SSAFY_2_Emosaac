package com.emosaac.server.domain.recommand;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBestBook30Model is a Querydsl query type for BestBook30Model
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBestBook30Model extends EntityPathBase<BestBook30Model> {

    private static final long serialVersionUID = -1615634842L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBestBook30Model bestBook30Model = new QBestBook30Model("bestBook30Model");

    public final NumberPath<Integer> bestBookId = createNumber("bestBookId", Integer.class);

    public final com.emosaac.server.domain.book.QBook book;

    public QBestBook30Model(String variable) {
        this(BestBook30Model.class, forVariable(variable), INITS);
    }

    public QBestBook30Model(Path<? extends BestBook30Model> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBestBook30Model(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBestBook30Model(PathMetadata metadata, PathInits inits) {
        this(BestBook30Model.class, metadata, inits);
    }

    public QBestBook30Model(Class<? extends BestBook30Model> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new com.emosaac.server.domain.book.QBook(forProperty("book"), inits.get("book")) : null;
    }

}


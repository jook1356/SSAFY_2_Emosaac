package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHit is a Querydsl query type for Hit
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHit extends EntityPathBase<Hit> {

    private static final long serialVersionUID = -1962426927L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHit hit = new QHit("hit");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QBook book;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> hitId = createNumber("hitId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.emosaac.server.domain.user.QUser user;

    public QHit(String variable) {
        this(Hit.class, forVariable(variable), INITS);
    }

    public QHit(Path<? extends Hit> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHit(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHit(PathMetadata metadata, PathInits inits) {
        this(Hit.class, metadata, inits);
    }

    public QHit(Class<? extends Hit> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book"), inits.get("book")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


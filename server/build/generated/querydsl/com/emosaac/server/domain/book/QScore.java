package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScore is a Querydsl query type for Score
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScore extends EntityPathBase<Score> {

    private static final long serialVersionUID = -391655088L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScore score1 = new QScore("score1");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QBook book;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Double> score = createNumber("score", Double.class);

    public final NumberPath<Long> scoreId = createNumber("scoreId", Long.class);

    public final com.emosaac.server.domain.user.QUser user;

    public QScore(String variable) {
        this(Score.class, forVariable(variable), INITS);
    }

    public QScore(Path<? extends Score> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScore(PathMetadata metadata, PathInits inits) {
        this(Score.class, metadata, inits);
    }

    public QScore(Class<? extends Score> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book"), inits.get("book")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


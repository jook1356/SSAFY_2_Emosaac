package com.emosaac.server.domain.emo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmopick is a Querydsl query type for Emopick
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmopick extends EntityPathBase<Emopick> {

    private static final long serialVersionUID = 796695902L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmopick emopick = new QEmopick("emopick");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QEmopickCommentList commentList;

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> EmopickId = createNumber("EmopickId", Long.class);

    public final MapPath<Long, String, StringPath> emopickList = this.<Long, String, StringPath>createMap("emopickList", Long.class, String.class, StringPath.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath novelSeq = createString("novelSeq");

    public final StringPath title = createString("title");

    public final com.emosaac.server.domain.user.QUser user;

    public final StringPath webtoonSeq = createString("webtoonSeq");

    public QEmopick(String variable) {
        this(Emopick.class, forVariable(variable), INITS);
    }

    public QEmopick(Path<? extends Emopick> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmopick(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmopick(PathMetadata metadata, PathInits inits) {
        this(Emopick.class, metadata, inits);
    }

    public QEmopick(Class<? extends Emopick> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.commentList = inits.isInitialized("commentList") ? new QEmopickCommentList(forProperty("commentList")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


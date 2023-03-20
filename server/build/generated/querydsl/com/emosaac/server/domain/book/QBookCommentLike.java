package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookCommentLike is a Querydsl query type for BookCommentLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookCommentLike extends EntityPathBase<BookCommentLike> {

    private static final long serialVersionUID = 1288911147L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookCommentLike bookCommentLike = new QBookCommentLike("bookCommentLike");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QBookComment bookComment;

    public final NumberPath<Long> commentLikeId = createNumber("commentLikeId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final BooleanPath likeStatus = createBoolean("likeStatus");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.emosaac.server.domain.user.QUser user;

    public QBookCommentLike(String variable) {
        this(BookCommentLike.class, forVariable(variable), INITS);
    }

    public QBookCommentLike(Path<? extends BookCommentLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookCommentLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookCommentLike(PathMetadata metadata, PathInits inits) {
        this(BookCommentLike.class, metadata, inits);
    }

    public QBookCommentLike(Class<? extends BookCommentLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookComment = inits.isInitialized("bookComment") ? new QBookComment(forProperty("bookComment"), inits.get("bookComment")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


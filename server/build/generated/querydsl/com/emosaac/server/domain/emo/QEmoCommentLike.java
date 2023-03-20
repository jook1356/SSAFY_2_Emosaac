package com.emosaac.server.domain.emo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmoCommentLike is a Querydsl query type for EmoCommentLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmoCommentLike extends EntityPathBase<EmoCommentLike> {

    private static final long serialVersionUID = -1287887207L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmoCommentLike emoCommentLike = new QEmoCommentLike("emoCommentLike");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final NumberPath<Long> commentLikeId = createNumber("commentLikeId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final QEmopickComment emopickComment;

    public final BooleanPath likeStatus = createBoolean("likeStatus");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.emosaac.server.domain.user.QUser user;

    public QEmoCommentLike(String variable) {
        this(EmoCommentLike.class, forVariable(variable), INITS);
    }

    public QEmoCommentLike(Path<? extends EmoCommentLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmoCommentLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmoCommentLike(PathMetadata metadata, PathInits inits) {
        this(EmoCommentLike.class, metadata, inits);
    }

    public QEmoCommentLike(Class<? extends EmoCommentLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.emopickComment = inits.isInitialized("emopickComment") ? new QEmopickComment(forProperty("emopickComment"), inits.get("emopickComment")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


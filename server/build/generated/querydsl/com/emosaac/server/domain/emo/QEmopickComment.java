package com.emosaac.server.domain.emo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmopickComment is a Querydsl query type for EmopickComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmopickComment extends EntityPathBase<EmopickComment> {

    private static final long serialVersionUID = -2045394143L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmopickComment emopickComment = new QEmopickComment("emopickComment");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final ListPath<EmopickComment, QEmopickComment> children = this.<EmopickComment, QEmopickComment>createList("children", EmopickComment.class, QEmopickComment.class, PathInits.DIRECT2);

    public final NumberPath<Long> commentId = createNumber("commentId", Long.class);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Integer> depth = createNumber("depth", Integer.class);

    public final QEmoCommentLikeList emoCommentLikeList;

    public final QEmopick emopick;

    public final BooleanPath isDelete = createBoolean("isDelete");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final QEmopickComment parent;

    public final com.emosaac.server.domain.user.QUser user;

    public QEmopickComment(String variable) {
        this(EmopickComment.class, forVariable(variable), INITS);
    }

    public QEmopickComment(Path<? extends EmopickComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmopickComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmopickComment(PathMetadata metadata, PathInits inits) {
        this(EmopickComment.class, metadata, inits);
    }

    public QEmopickComment(Class<? extends EmopickComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.emoCommentLikeList = inits.isInitialized("emoCommentLikeList") ? new QEmoCommentLikeList(forProperty("emoCommentLikeList")) : null;
        this.emopick = inits.isInitialized("emopick") ? new QEmopick(forProperty("emopick"), inits.get("emopick")) : null;
        this.parent = inits.isInitialized("parent") ? new QEmopickComment(forProperty("parent"), inits.get("parent")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


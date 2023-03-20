package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookComment is a Querydsl query type for BookComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBookComment extends EntityPathBase<BookComment> {

    private static final long serialVersionUID = -2082738316L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBookComment bookComment = new QBookComment("bookComment");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QBook book;

    public final QBookCommentLikeList bookCommentLikeList;

    public final ListPath<BookComment, QBookComment> children = this.<BookComment, QBookComment>createList("children", BookComment.class, QBookComment.class, PathInits.DIRECT2);

    public final NumberPath<Long> commentId = createNumber("commentId", Long.class);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Integer> depth = createNumber("depth", Integer.class);

    public final BooleanPath isDelete = createBoolean("isDelete");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final QBookComment parent;

    public final com.emosaac.server.domain.user.QUser user;

    public QBookComment(String variable) {
        this(BookComment.class, forVariable(variable), INITS);
    }

    public QBookComment(Path<? extends BookComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBookComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBookComment(PathMetadata metadata, PathInits inits) {
        this(BookComment.class, metadata, inits);
    }

    public QBookComment(Class<? extends BookComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book"), inits.get("book")) : null;
        this.bookCommentLikeList = inits.isInitialized("bookCommentLikeList") ? new QBookCommentLikeList(forProperty("bookCommentLikeList")) : null;
        this.parent = inits.isInitialized("parent") ? new QBookComment(forProperty("parent"), inits.get("parent")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


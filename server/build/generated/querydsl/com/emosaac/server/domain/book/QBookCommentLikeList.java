package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookCommentLikeList is a Querydsl query type for BookCommentLikeList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QBookCommentLikeList extends BeanPath<BookCommentLikeList> {

    private static final long serialVersionUID = -787427223L;

    public static final QBookCommentLikeList bookCommentLikeList1 = new QBookCommentLikeList("bookCommentLikeList1");

    public final ListPath<BookCommentLike, QBookCommentLike> bookCommentLikeList = this.<BookCommentLike, QBookCommentLike>createList("bookCommentLikeList", BookCommentLike.class, QBookCommentLike.class, PathInits.DIRECT2);

    public QBookCommentLikeList(String variable) {
        super(BookCommentLikeList.class, forVariable(variable));
    }

    public QBookCommentLikeList(Path<? extends BookCommentLikeList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBookCommentLikeList(PathMetadata metadata) {
        super(BookCommentLikeList.class, metadata);
    }

}


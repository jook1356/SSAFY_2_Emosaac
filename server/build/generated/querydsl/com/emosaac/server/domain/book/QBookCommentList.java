package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookCommentList is a Querydsl query type for BookCommentList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QBookCommentList extends BeanPath<BookCommentList> {

    private static final long serialVersionUID = 1288911410L;

    public static final QBookCommentList bookCommentList = new QBookCommentList("bookCommentList");

    public final ListPath<BookComment, QBookComment> commentList = this.<BookComment, QBookComment>createList("commentList", BookComment.class, QBookComment.class, PathInits.DIRECT2);

    public QBookCommentList(String variable) {
        super(BookCommentList.class, forVariable(variable));
    }

    public QBookCommentList(Path<? extends BookCommentList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBookCommentList(PathMetadata metadata) {
        super(BookCommentList.class, metadata);
    }

}


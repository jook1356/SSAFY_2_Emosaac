package com.emosaac.server.domain.emo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmopickCommentList is a Querydsl query type for EmopickCommentList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEmopickCommentList extends BeanPath<EmopickCommentList> {

    private static final long serialVersionUID = 829517663L;

    public static final QEmopickCommentList emopickCommentList = new QEmopickCommentList("emopickCommentList");

    public final ListPath<EmopickComment, QEmopickComment> commentList = this.<EmopickComment, QEmopickComment>createList("commentList", EmopickComment.class, QEmopickComment.class, PathInits.DIRECT2);

    public QEmopickCommentList(String variable) {
        super(EmopickCommentList.class, forVariable(variable));
    }

    public QEmopickCommentList(Path<? extends EmopickCommentList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEmopickCommentList(PathMetadata metadata) {
        super(EmopickCommentList.class, metadata);
    }

}


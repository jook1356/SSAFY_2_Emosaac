package com.emosaac.server.domain.emo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmoCommentLikeList is a Querydsl query type for EmoCommentLikeList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEmoCommentLikeList extends BeanPath<EmoCommentLikeList> {

    private static final long serialVersionUID = 1529452247L;

    public static final QEmoCommentLikeList emoCommentLikeList1 = new QEmoCommentLikeList("emoCommentLikeList1");

    public final ListPath<EmoCommentLike, QEmoCommentLike> emoCommentLikeList = this.<EmoCommentLike, QEmoCommentLike>createList("emoCommentLikeList", EmoCommentLike.class, QEmoCommentLike.class, PathInits.DIRECT2);

    public QEmoCommentLikeList(String variable) {
        super(EmoCommentLikeList.class, forVariable(variable));
    }

    public QEmoCommentLikeList(Path<? extends EmoCommentLikeList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEmoCommentLikeList(PathMetadata metadata) {
        super(EmoCommentLikeList.class, metadata);
    }

}


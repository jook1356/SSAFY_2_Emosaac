package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScoreList is a Querydsl query type for ScoreList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QScoreList extends BeanPath<ScoreList> {

    private static final long serialVersionUID = -1025323506L;

    public static final QScoreList scoreList1 = new QScoreList("scoreList1");

    public final ListPath<Score, QScore> scoreList = this.<Score, QScore>createList("scoreList", Score.class, QScore.class, PathInits.DIRECT2);

    public QScoreList(String variable) {
        super(ScoreList.class, forVariable(variable));
    }

    public QScoreList(Path<? extends ScoreList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScoreList(PathMetadata metadata) {
        super(ScoreList.class, metadata);
    }

}


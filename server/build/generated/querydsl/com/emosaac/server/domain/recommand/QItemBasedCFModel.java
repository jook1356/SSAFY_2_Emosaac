package com.emosaac.server.domain.recommand;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QItemBasedCFModel is a Querydsl query type for ItemBasedCFModel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItemBasedCFModel extends EntityPathBase<ItemBasedCFModel> {

    private static final long serialVersionUID = -632826401L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QItemBasedCFModel itemBasedCFModel = new QItemBasedCFModel("itemBasedCFModel");

    public final com.emosaac.server.domain.book.QBook book;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public QItemBasedCFModel(String variable) {
        this(ItemBasedCFModel.class, forVariable(variable), INITS);
    }

    public QItemBasedCFModel(Path<? extends ItemBasedCFModel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QItemBasedCFModel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QItemBasedCFModel(PathMetadata metadata, PathInits inits) {
        this(ItemBasedCFModel.class, metadata, inits);
    }

    public QItemBasedCFModel(Class<? extends ItemBasedCFModel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new com.emosaac.server.domain.book.QBook(forProperty("book"), inits.get("book")) : null;
    }

}


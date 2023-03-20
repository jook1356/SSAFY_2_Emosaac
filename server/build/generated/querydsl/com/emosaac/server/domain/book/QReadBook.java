package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReadBook is a Querydsl query type for ReadBook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReadBook extends EntityPathBase<ReadBook> {

    private static final long serialVersionUID = 1246943777L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReadBook readBook = new QReadBook("readBook");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final QBook book;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Long> readId = createNumber("readId", Long.class);

    public final com.emosaac.server.domain.user.QUser user;

    public QReadBook(String variable) {
        this(ReadBook.class, forVariable(variable), INITS);
    }

    public QReadBook(Path<? extends ReadBook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReadBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReadBook(PathMetadata metadata, PathInits inits) {
        this(ReadBook.class, metadata, inits);
    }

    public QReadBook(Class<? extends ReadBook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book"), inits.get("book")) : null;
        this.user = inits.isInitialized("user") ? new com.emosaac.server.domain.user.QUser(forProperty("user")) : null;
    }

}


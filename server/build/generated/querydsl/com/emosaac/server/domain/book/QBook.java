package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = -705865621L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBook book = new QBook("book");

    public final StringPath author = createString("author");

    public final NumberPath<Long> bookId = createNumber("bookId", Long.class);

    public final QBookmarkList bookmarkList;

    public final QBookCommentList commentList;

    public final StringPath day = createString("day");

    public final QGenre genre;

    public final StringPath grade = createString("grade");

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    public final StringPath href = createString("href");

    public final NumberPath<Integer> platform = createNumber("platform", Integer.class);

    public final QReadBookList readBookList;

    public final StringPath regist = createString("regist");

    public final NumberPath<Double> score = createNumber("score", Double.class);

    public final QScoreList scoreList;

    public final StringPath series = createString("series");

    public final StringPath story = createString("story");

    public final StringPath tag = createString("tag");

    public final StringPath thumbnail = createString("thumbnail");

    public final StringPath title = createString("title");

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final StringPath views = createString("views");

    public QBook(String variable) {
        this(Book.class, forVariable(variable), INITS);
    }

    public QBook(Path<? extends Book> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBook(PathMetadata metadata, PathInits inits) {
        this(Book.class, metadata, inits);
    }

    public QBook(Class<? extends Book> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookmarkList = inits.isInitialized("bookmarkList") ? new QBookmarkList(forProperty("bookmarkList")) : null;
        this.commentList = inits.isInitialized("commentList") ? new QBookCommentList(forProperty("commentList")) : null;
        this.genre = inits.isInitialized("genre") ? new QGenre(forProperty("genre")) : null;
        this.readBookList = inits.isInitialized("readBookList") ? new QReadBookList(forProperty("readBookList")) : null;
        this.scoreList = inits.isInitialized("scoreList") ? new QScoreList(forProperty("scoreList")) : null;
    }

}


package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReadBookList is a Querydsl query type for ReadBookList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QReadBookList extends BeanPath<ReadBookList> {

    private static final long serialVersionUID = -750057889L;

    public static final QReadBookList readBookList1 = new QReadBookList("readBookList1");

    public final ListPath<ReadBook, QReadBook> readBookList = this.<ReadBook, QReadBook>createList("readBookList", ReadBook.class, QReadBook.class, PathInits.DIRECT2);

    public QReadBookList(String variable) {
        super(ReadBookList.class, forVariable(variable));
    }

    public QReadBookList(Path<? extends ReadBookList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReadBookList(PathMetadata metadata) {
        super(ReadBookList.class, metadata);
    }

}


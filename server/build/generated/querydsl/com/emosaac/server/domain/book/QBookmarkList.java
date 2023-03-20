package com.emosaac.server.domain.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBookmarkList is a Querydsl query type for BookmarkList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QBookmarkList extends BeanPath<BookmarkList> {

    private static final long serialVersionUID = 643611254L;

    public static final QBookmarkList bookmarkList1 = new QBookmarkList("bookmarkList1");

    public final ListPath<BookMark, QBookMark> bookmarkList = this.<BookMark, QBookMark>createList("bookmarkList", BookMark.class, QBookMark.class, PathInits.DIRECT2);

    public QBookmarkList(String variable) {
        super(BookmarkList.class, forVariable(variable));
    }

    public QBookmarkList(Path<? extends BookmarkList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBookmarkList(PathMetadata metadata) {
        super(BookmarkList.class, metadata);
    }

}


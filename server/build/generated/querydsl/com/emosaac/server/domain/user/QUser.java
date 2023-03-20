package com.emosaac.server.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1904383403L;

    public static final QUser user = new QUser("user");

    public final com.emosaac.server.domain.QBaseEntity _super = new com.emosaac.server.domain.QBaseEntity(this);

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final StringPath favoriteNovelGenre = createString("favoriteNovelGenre");

    public final StringPath favoriteWebtoonGenre = createString("favoriteWebtoonGenre");

    public final BooleanPath gender = createBoolean("gender");

    public final StringPath imageUrl = createString("imageUrl");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath nickName = createString("nickName");

    public final StringPath password = createString("password");

    public final StringPath providerId = createString("providerId");

    public final EnumPath<AuthProvider> providerType = createEnum("providerType", AuthProvider.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userName = createString("userName");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}


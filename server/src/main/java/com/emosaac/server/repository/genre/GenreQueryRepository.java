package com.emosaac.server.repository.genre;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.book.QGenre;
import com.emosaac.server.domain.book.QReadBook;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.book.BookDayResponse;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.QBookListResponse;
import com.emosaac.server.dto.genre.BookRequest;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.*;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QGenre.genre;
import static com.emosaac.server.domain.book.QReadBook.readBook;
import static com.emosaac.server.domain.user.QResearch.research;

@RequiredArgsConstructor
@Repository

public class GenreQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    //장르 조회
    public List<Genre> findBookGenre(int typeCode) {
        return jpaQueryFactory.select(genre)
                .from(genre)
                .where(filterGenreCd(typeCode)).
                orderBy(genre.gerneId.asc()).fetch();
    }

    public List<BookListResponse> findResearch(int typeCode) {
        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(research)
                .where(research.type.eq(typeCode))
                .orderBy(research.gerneId.asc())
                .fetch();
    }

    public Slice<BookListResponse> findBookListByGenre(User user, BookRequest request, PageRequest page) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(
                        request.getTypeCd()),
                        book.genre.gerneId.eq(request.getGenreCode()),
                        cursorIdAndCursorScore(request.getPrevId(), request.getPrevScore()),
                        book.notIn(
                                JPAExpressions
                                        .select(readBook.book).from(readBook)
                                        .where(readBook.user.eq(user))
                                        )
                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    //총 읽음 카운트
    public Long findTotalCount(Long userId, int typeCode) {
        return jpaQueryFactory.select(readBook.book.count())
                .from(readBook)
                .where(readBook.book.type.eq(typeCode),
                        readBook.user.userId.eq(userId))
                .fetchFirst();
    }

    //장르별 읽음 카운트
    public Long findReadSpecGenreCount(Long userId, int typeCode, Long genre) {
        return jpaQueryFactory.select(readBook.book.count())
                .from(readBook)
                .where(readBook.book.type.eq(typeCode),
                        readBook.user.userId.eq(userId),
                        readBook.book.genre.gerneId.eq(genre)
                        )
                .fetchFirst();
    }
    //선호 장르
    public List<Genre> findBookGenreisLike(int typeCode, Long[] likeList) {
        return jpaQueryFactory.select(genre)
                .from(genre)
                .where(filterGenreCd(typeCode),
                        genre.gerneId.in(likeList)
                ).
                orderBy(genre.gerneId.asc())
                .fetch();
    }

    //선호 장르별 책



    /////////////<-----조건


    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore).and(book.bookId.lt(cursorId))).or(book.score.lt(cursorScore));
    }

    private BooleanExpression filterGenreCd(int typeCode) {
        if(typeCode == 1){
            return Expressions.stringTemplate("function('substring', {0}, {1}, {2})", genre.gerneId, 1, 1).eq("2").
                    or(genre.gerneId.ne(12L).
                            and(genre.gerneId.ne(16L)));
        } else if(typeCode == 0){ //웹툰
            return Expressions.stringTemplate("function('substring', {0}, {1}, {2})", genre.gerneId, 1, 1).eq("1");
        }
        return null; // 장르 코드로 사용할 때

    }



}

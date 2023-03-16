package com.emosaac.server.repository.genre;

import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.QBookListResponse;
import com.emosaac.server.dto.book.BookRequest;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QGenre.genre;
import static com.emosaac.server.domain.user.QResearch.research;

@RequiredArgsConstructor
@Repository

public class GenreQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    //소설 장르 조회
    public List<Genre> findNovel() {
        return jpaQueryFactory.select(genre).from(genre).where(Expressions.stringTemplate("function('substring', {0}, {1}, {2})", genre.gerneId, 1, 1).eq("2").or(genre.gerneId.ne(12L).and(genre.gerneId.ne(16L)))).orderBy(genre.gerneId.asc()).fetch();
    }

    public List<BookListResponse> findWebtoonResearch() {
        return jpaQueryFactory.select(new QBookListResponse(book)).from(research).where(research.type.eq(0L)).orderBy(research.gerneId.asc()).fetch();
    }

    public List<BookListResponse> findNovelResearch() {
        return jpaQueryFactory.select(new QBookListResponse(book)).from(research).where(research.type.eq(1L)).orderBy(research.gerneId.asc()).fetch();
    }

    public Slice<BookListResponse> findBookListByGenre(BookRequest request, PageRequest page) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
//                .fetchJoin((readBook)
                .where(book.type.eq(
                        request.getTypeCd()),
                        book.genre.gerneId.eq(request.getGenreCode()),
                        cursorIdAndCursorScore(request.getPrevId(), request.getPrevScore())
//                        readBook.book.ne(book)
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

    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore).and(book.bookId.lt(cursorId))).or(book.score.lt(cursorScore));
    }

}

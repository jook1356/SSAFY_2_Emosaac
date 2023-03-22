package com.emosaac.server.repository.book;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.book.*;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QHit.hit;

@RequiredArgsConstructor
@Repository
public class BookQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    // 요일별 소설 리스트
    public Slice<BookListResponse> findBookListByDay(String day, int typeCd, Long genreCode, PageRequest page, Long prevId, Double prevScore) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.type.eq(typeCd),
                        book.day.contains(day),
                        //no-offset 페이징 처리
//                        ltBookId(prevId),
                        cursorIdAndCursorScore(prevId, prevScore),
                        filterGenreCd(genreCode)
                )
//                .orderBy(findCriteria(criteria))
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(),book.bookId.desc())  // 평점 추가
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    // 장르별 소설 리스트
    public Slice<BookListResponse> findBookListByGenre(Long genreCode, int typeCd, PageRequest page, Long prevId, Double prevScore) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.type.eq(typeCd),
                        book.genre.gerneId.eq(genreCode),
                        //no-offset 페이징 처리
//                        ltBookId(request.getPrevId())
                        cursorIdAndCursorScore(prevId, prevScore)
                )
//                .orderBy(findCriteria(criteria))
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(),book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    // 소설 상세 조회
    public Optional<Book> findBookByBook(Long bookId) {
        return Optional.ofNullable(jpaQueryFactory.select(book)
                .from(book)
                .where(
                        book.bookId.eq(bookId)
                )
                .fetchOne());
    }

    // 같은 작가 다른 작품 조회
    public List<BookListResponse> findBookByAuthor(Long bookId, String[] author){

        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.author.in(author),
                        book.bookId.ne(bookId)
                )
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }

    public List<BookListResponse> findBookByHit(Long userId){

        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book).join(hit).on(book.bookId.eq(hit.book.bookId))
                .where(
                        hit.user.userId.eq(userId)
                )
                .orderBy(hit.createdDate.desc())
                .limit(4)
                .fetch();
    }

    private BooleanExpression ltBookId(Long cursorId) {
        return cursorId == 0 ? null : book.bookId.lt(cursorId);
    }

    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore)
                .and(ltBookId(cursorId)))
//                .and(book.bookId.lt(cursorId)))
                .or(book.score.lt(cursorScore));
    }

    private OrderSpecifier<?> findCriteria(String criteria) { //정렬 조건
        if (criteria.contains("date")) {
            return book.regist.asc();
        } else if (criteria == null) {
            return book.hit.desc();
        }

        return book.bookId.desc();
    }

    /*-  10: 로맨스, 11: 로판, 12: 드라마, 13: 판타지, 14: 액션/무협, 15: BL/GL, 16: 공포 27: 현판, 28: 미스터리 */
    private Predicate filterGenreCd(Long genreCode) {
//        if(criteria.contains("로맨스")){
//            return book.genre.gerneId.eq(10L);
//        } else if(criteria.contains("로판")){
//            return book.genre.gerneId.eq(11L);
//        } else if(criteria.contains("판타지")){
//            return book.genre.gerneId.eq(13L);
//        } else if(criteria.contains("무협")){
//            return book.genre.gerneId.eq(14L);
//        } else if(criteria.contains("BL/GL")){
//            return book.genre.gerneId.eq(15L);
//        } else if(criteria.contains("현판")){
//            return book.genre.gerneId.eq(27L);
//        } else if(criteria.contains("미스터리")){
//            return book.genre.gerneId.eq(28L);
//        } else if(criteria == null || criteria.contains("")){
//            return null;
//        }

        if(genreCode == 0 || genreCode == null) return null;

        return book.genre.gerneId.eq(genreCode); // 장르 코드로 사용할 때
    }
}

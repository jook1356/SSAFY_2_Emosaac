package com.emosaac.server.service.book;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.BookMark;
import com.emosaac.server.domain.book.ReadBook;
import com.emosaac.server.domain.book.Score;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookDayResponse;
import com.emosaac.server.dto.book.BookDetailResponse;
import com.emosaac.server.dto.novel.NovelDetailResponse;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.bookmark.BookmarkRepository;
import com.emosaac.server.repository.readbook.ReadRepository;
import com.emosaac.server.repository.score.ScoreQueryRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {
    private final BookQueryRepository bookQueryRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ReadRepository readRepository;
    private final ScoreQueryRepository scoreQueryRepository;
    private final UserRepository userRepository;

    // 요일별 작품 리스트
    public SlicedResponse<BookDayResponse> findDayList(String day, int size, String criteria, Long prevId, Double prevScore, int typeCd) {

        Slice<BookDayResponse> page = bookQueryRepository.findBookListByDay(typeCd, day, PageRequest.ofSize(size), prevId, prevScore, criteria);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 장르벌 작품 리스트
    public SlicedResponse<BookDayResponse> findGenreList(Long genreCode, int size, String criteria, Long prevId, int typeCd) {

        Slice<BookDayResponse> page = bookQueryRepository.findBookListByGenre(typeCd, genreCode, PageRequest.ofSize(size), prevId, criteria);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 작품 상세 조회
    public BookDetailResponse findDetailByBook(Long bookId, Long userId, int typeCd) {

        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));

        book.addHit();

        Boolean bookmarkStatus = false;
        if(bookmarkRepository.existsByBookIdAndUserId(bookId, userId).isPresent()){
            bookmarkStatus = true;
        }

        Boolean readStatus = false;
        if(readRepository.existsByBookIdAndUserId(bookId, userId).isPresent()){
            readStatus = false;
        }

        Score myScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);
        double score = 0.0;
        if(myScore != null) score = myScore.getScore();

        return new BookDetailResponse(book, bookmarkStatus, readStatus, score);
    }

    @Transactional
    public Boolean toggleBookmarkByBook(Long bookId, Long userId) {
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByMyId(userId);
        //        User user = userRepository.findByMyId(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        BookMark bookMark = BookMark.builder().book(book).user(user).build();
        return book.toggleBookmark(bookMark);
    }

    @Transactional
    public Object toggleReadByBook(Long bookId, Long userId) {
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByMyId(userId);
        //        User user = userRepository.findByMyId(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        ReadBook readBook = ReadBook.builder().book(book).user(user).build();
        return book.toggleReadBook(readBook);
    }

    /* 평점 */
    public Double findScoreByUser(Long bookId, Long userId) {
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByMyId(userId);
        //        User user = userRepository.findByMyId(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));

        Score curScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);
        if(curScore ==  null) return 0.0;
        return curScore.getScore();
    }

    @Transactional
    public Double updateScoreByUser(Long bookId, Long userId, Double score) {
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByMyId(userId);
        //        User user = userRepository.findByMyId(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));

        Score curScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);

        if(curScore != null){
            curScore.update(score);
            book.setAvgScore();
            return curScore.getScore();
        }

        Score newScore = Score.builder().book(book).user(user).score(score).build();
        double result = book.setScore(newScore);
        book.setAvgScore();;
        return result;
    }

    /**/
    public Object findListByAuthor(Long bookId) {
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        return null;
    }

    /* 추천 알고리즘 적용 */
    public Object findListByItem(Long novelId) {
        return null;
    }
}

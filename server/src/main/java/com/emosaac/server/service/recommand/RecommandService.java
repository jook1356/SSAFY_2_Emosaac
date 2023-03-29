package com.emosaac.server.service.recommand;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.domain.book.ReadBook;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.recommand.RecommandQueryRepository;
import com.emosaac.server.repository.recommand.TotalByAgeAndGenderModelRepository;
import com.emosaac.server.repository.recommand.UserBasedCfRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommandService {

    private final CommonService commonService;
    private final RecommandQueryRepository recommandQueryRepository;
    private final UserBasedCfRepository userBasedCfRepository;
    private final TotalByAgeAndGenderModelRepository totalByAgeAndGenderModelRepository;
    private final BookQueryRepository bookQueryRepository;
    public SlicedResponse<BookListResponse> findBestList(int size, Long prevId, Double prevScore, int hit, int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository.findBestList(hit, typeCd, prevId, prevScore, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<BookListResponse> findNewBookList(int size, Long prevId, String regist, int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository.findNewBookList(regist, typeCd, prevId, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public List<BookListResponse> findMdList(int typeCd) {
        List<BookListResponse> res = new ArrayList<>();
        Long[] toonRec = {5L, 596L, 1190L, 404L, 2582L, 2306L, 2384L, 4453L, 4470L, 4463L};
        Long[] novelRec = {6533L, 6535L, 6531L, 7145L, 9069L, 9952L, 9889L, 10938L, 10939L, 10944L};
        Long[][] type = {toonRec, novelRec};

        for (Long n : type[typeCd]) {
            BookListResponse book = new BookListResponse(commonService.getBook(n));
            res.add(book);
        }
        return res;
    }

    public List<BookListResponse> findItemList(int typeCd, Long bookId, Long userId) {
        if(bookId == 0){ // 제일 최근 본 작품과 유사한 작품 추천
            Optional <ReadBook> readBook =bookQueryRepository.findBookRecent(userId);
            if(readBook.isPresent()){
                bookId = readBook.get().getReadId();
            }
        }
        return findBookStrListNotRead10(recommandQueryRepository.findItemList(typeCd, bookId), userId);
    }

    public SlicedResponse<BookListResponse> findPredictList(int typeCd, int size, Double prevScore, Long prevId, Long userId) {

        User user = commonService.getUser(userId);

        Slice<BookListResponse> page = recommandQueryRepository.findPredictList(typeCd, PageRequest.ofSize(size), prevId, prevScore, user.getUserId());
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public List<BookListResponse> findUserList(int typeCd, Long userId) { //유저베이스 추천
        User user = commonService.getUser(userId);
        String str = userBasedCfRepository.findByBookList(userId, typeCd);
        List<BookListResponse> res = findBookStrList(str);
        return res;
    }

    public List<BookListResponse> findBookStrList(String str) {
        List<BookListResponse> res = new ArrayList<>();

        for (String bookIdStr : str.split(" ")) {
            BookListResponse book = new BookListResponse(commonService.getBook(Long.parseLong(bookIdStr)));
            res.add(book);
        }
        return res;

    }

    public List<BookListResponse> findBookStrListNotRead10(String str, Long userId) {
        List<BookListResponse> res = new ArrayList<>();

        for (String bookIdStr : str.split(" ")) {
            // 안 읽은 작품 찾기
            Optional<BookListResponse> book = bookQueryRepository.findBookRead(Long.parseLong(bookIdStr), userId);
            if(book.isEmpty()){
                res.add(new BookListResponse(commonService.getBook(Long.parseLong(bookIdStr))));
            }
            if(res.size() == 10) break;
        }
        return res;

    }

    public List<BookListResponse> findAgeAndGenderList(int typeCd, Long userId) { //나이, 성별별 통계
        User user = commonService.getUser(userId);
        int age = user.getAge();
        int gender = user.getGender();
        String str = totalByAgeAndGenderModelRepository.findByBookList(age, gender, typeCd);
        List<BookListResponse> res = findBookStrList(str);
        return res;
    }
}

package com.emosaac.server.service.recommand;

import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommandService {

    private final CommonService commonService;

    public Object findBestList(int typeCd, int size, String criteria, Long id) {
        return null;
    }

    public Object findNewBookList(int typeCd, int size, String criteria, Long id) {
        return null;
    }

    public List<BookListResponse> findMdList(int typeCd) {
        List<BookListResponse> res = new ArrayList<>();
        Long [] toonRec = {5L, 596L, 1190L, 404L, 2582L, 2306L, 2384L, 4453L, 4470L, 4463L };
        Long [] novelRec = {6533L, 6535L, 6531L, 7145L, 9069L, 9952L, 9889L, 10938L, 10939L, 10944L};
        Long[][] type = {toonRec, novelRec};

        for(Long n : type[typeCd]){
            BookListResponse book = new BookListResponse(commonService.getBook(n));
            res.add(book);
        }
        return res;
    }

    public Object findItemList(int typeCd, int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findPredictiList(int typeCd, int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findUserList(int typeCd, int size, String criteria, Long id, Long userId) {
        return null;
    }
}

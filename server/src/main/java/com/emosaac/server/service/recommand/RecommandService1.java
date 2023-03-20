package com.emosaac.server.service.recommand;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.repository.recommand.RecommandQueryRepository1;
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
public class RecommandService1 {

    private final RecommandQueryRepository1 recommandQueryRepository1;

    public SlicedResponse<BookListResponse> findBestList(int size, Long prevId, Double prevScore, int hit, int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository1.findBestList(hit, typeCd, prevId, prevScore, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }


    public SlicedResponse<BookListResponse> findNewBookList(int size, Long prevId, String regist, int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository1.findNewBookList(regist, typeCd, prevId, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }


}

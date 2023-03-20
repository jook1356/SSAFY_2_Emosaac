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

    public SlicedResponse<BookListResponse> findBestWebtoonList(int size, Long prevId, Double prevScore) {
//        return null;
        Slice<BookListResponse> page = recommandQueryRepository1.findBestWebtoonList(0, prevId, prevScore, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<BookListResponse> findBestNovelList(int size, Long prevId, Double prevScore) {
//        return null;
        Slice<BookListResponse> page = recommandQueryRepository1.findBestNovelList(1, prevId, prevScore, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }



}

package com.emosaac.server.service.webtoon;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Gerne;
import com.emosaac.server.dto.webtoon.WebtoonListResponse;
import com.emosaac.server.repository.webtoon.WebtoonQueryRepository;
import com.emosaac.server.repository.webtoon.GerneRepository;
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
public class WebtoonService {
    private final WebtoonQueryRepository webtoonQueryRepository;
    private final GerneRepository gerneRepository;
    public SlicedResponse<WebtoonListResponse> findDayList(String day, int size, String criteria, Long id) {
        Slice<WebtoonListResponse> page = webtoonQueryRepository.findDayList(day, PageRequest.ofSize(size), id);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<WebtoonListResponse> findGenreList(Long genreCode, int size, String criteria, Long id) {
        Gerne gerne = gerneRepository.findByGerneId(genreCode).orElseThrow(() -> new ResourceNotFoundException("Genre", "genreCode", genreCode));
        Slice<WebtoonListResponse> page = webtoonQueryRepository.findGenreList(gerne,  PageRequest.ofSize(size), id);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public Object findDetailByWebtoon(int size, String criteria, Long id) {
        return null;
    }

    public Object setBookmarkByWebtoon(int size, String criteria, Long id) {
        return null;
    }

    public Object setReadByWebtoon(int size, String criteria, Long id) {
        return null;
    }

    public Object findScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object setScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object updateScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object deleteScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findListByAuthor(int size, String criteria, Long id) {
        return null;
    }

    public Object findListByItem(int size, String criteria, Long id) {
        return null;
    }
}

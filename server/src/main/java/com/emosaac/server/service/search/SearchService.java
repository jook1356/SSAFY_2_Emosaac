package com.emosaac.server.service.search;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.novel.NovelDayResponse;
import com.emosaac.server.repository.search.TagNovelRepository;
import com.emosaac.server.repository.search.TagQueryRepository;
import com.emosaac.server.repository.search.TagToonRepository;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

import java.awt.print.Book;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {
    private final TagNovelRepository tagNovelRepository;
    private final TagToonRepository tagToonRepository;
    private final TagQueryRepository tagQueryRepository;

    public List<NovelDayResponse> findBookListByTagName(String tagName) {
        return tagQueryRepository.findBookListByTagName(tagName).stream().map((b)-> new NovelDayResponse(b)).collect(Collectors.toList());
    }


}

package com.emosaac.server.service.genre;

import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.repository.genre.GenreQueryRepository;
import com.emosaac.server.repository.genre.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {
    private final GenreQueryRepository genreQueryRepository;
    private final GenreRepository genreRepository;


    public List<GenreResponse> getWebtoonGenre() {
        return genreRepository.findWebtoon().stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    public List<GenreResponse> getNovelGenre() {
        return genreQueryRepository.findNovel().stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }
}

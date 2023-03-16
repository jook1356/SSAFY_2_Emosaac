package com.emosaac.server.service.genre;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.dto.genre.UserResearchRequest;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.genre.GenreQueryRepository;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {
    private final UserRepository userRepository;
    private final GenreQueryRepository genreQueryRepository;
    private final GenreRepository genreRepository;
    private final BookRepository bookRepository;
    private final UserService userService;


    public List<GenreResponse> getWebtoonGenre() {
        return genreRepository.findWebtoon().stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    public List<GenreResponse> getNovelGenre() {
        return genreQueryRepository.findNovel().stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }
    
    //설문조사 리스트
    public List<BookListResponse> getWebtoonResearch() {
        return genreQueryRepository.findWebtoonResearch();
    }

    public List<BookListResponse> getNovelGenreRearch() {
        return genreQueryRepository.findNovelResearch();
    }

    public List<GenreResponse> postWebtoonResearch(Long userId, UserResearchRequest request) { //나의 선호 장르에 반영해야함
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        
        String str = BookListToString(request);
        user.setFavoriteWebtoonGenre(str); //선호 장르에 반영
        return userService.stringToGenreList(str).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }

    public List<GenreResponse> postNovelGenreResearch(Long userId, UserResearchRequest request) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        String str = BookListToString(request);
        user.setFavoriteNovelGenre(str); //선호 장르에 반영
        return userService.stringToGenreList(str).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    public String BookListToString(UserResearchRequest request){
        Set<Long> set = new HashSet<>();
        for (Long tmp : request.getBookId()){
            Book book = bookRepository.findByBookId(tmp).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", tmp));
            set.add(book.getGenre().getGerneId());
        }
        String str = "";
        for (Long tmp :set){
            str += tmp+"^";
        }
        return str;
    }



}

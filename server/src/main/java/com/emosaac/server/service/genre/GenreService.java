package com.emosaac.server.service.genre;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.genre.BookRequest;
import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.dto.genre.UserResearchRequest;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.genre.GenreQueryRepository;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.CommonService;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
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
    private final GenreQueryRepository genreQueryRepository;
    private final UserService userService;
    private final CommonService commonService;


    public List<GenreResponse> getBookGenre(Long typeCode) {
        return genreQueryRepository.findBookGenre(typeCode).stream().map(
                (genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }


    //설문조사 리스트
    public List<BookListResponse> getResearch(Long typeCode) {
        return genreQueryRepository.findResearch(typeCode);
    }

    @Transactional
    public List<GenreResponse> postResearch(Long userId, UserResearchRequest request, Long typeCode ) { //나의 선호 장르에 반영해야함

        User user = commonService.getUser(userId);
        String str = BookListToString(request);
        if(typeCode==0){
            user.setFavoriteWebtoonGenre(str); //선호 장르에 반영
        } else if (typeCode==1) {
            user.setFavoriteNovelGenre(str); //선호 장르에 반영

        }
        return userService.stringToGenreList(str).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }

    public String BookListToString(UserResearchRequest request){
        Set<Long> set = new HashSet<>();
        for (Long tmp : request.getBookId()){
            Book book = commonService.getBook(tmp);
            set.add(book.getGenre().getGerneId());
        }
        String str = "";
        for (Long tmp :set){
            str += tmp+"^";
        }
        return str;
    }

    public SlicedResponse<BookListResponse> getBookByGenre(Long userId, BookRequest request) {
        User user = commonService.getUser(userId);
        Slice<BookListResponse> page = genreQueryRepository.findBookListByGenre(user, request, PageRequest.ofSize(request.getSize()));
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());

    }

}

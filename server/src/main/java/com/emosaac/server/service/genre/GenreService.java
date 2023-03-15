package com.emosaac.server.service.genre;

import com.emosaac.server.common.exception.ArgumentMismatchException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;

     public UserResponse getUserGerne(Long userId) { //그냥 유저 정보 조회해도 나오니까 안써도 될것 같음
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        String webtoon = user.getFavoriteWebtoonGenre();
        String novel =user.getFavoriteNovelGenre();
//        return UserGenreResponse.from(webtoon, novel);
        return UserResponse.from(user);
    }

}

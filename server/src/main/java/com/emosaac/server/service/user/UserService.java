package com.emosaac.server.service.user;

import com.emosaac.server.common.exception.ArgumentMismatchException;
import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserGenreResponse;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;

    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return UserResponse.from(user);
    }

    @Transactional
    public Long updateUserInfo(Long userId, UserRequest request) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if(nickNameCheck(request.getNickName())==true){
            throw new ArgumentMismatchException("닉네임 중복입니다");
        }
        
        user.setUserInfo(request); //이미지 링크 수정 빼야함, 따로 처리 필요

        //이미지 널이면 디폴트 이미지 처리
        //기존 이미지와 다르고 디폴트 이미지와 다르면 s3삭제

        return userId;
    }

    public boolean nickNameCheck(String nickName) {
        boolean flag = false;
        if (userRepository.findByUserNickName(nickName).isPresent()) {
            flag = true;
        }
        return flag;
    }

    public UserResponse getUserGerne(Long userId) { //그냥 유저 정보 조회해도 나오니까 안써도 될것 같음
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        String webtoon = user.getFavoriteWebtoonGenre();
        String novel =user.getFavoriteNovelGenre();
//        return UserGenreResponse.from(webtoon, novel);
        return UserResponse.from(user);
    }
    @Transactional
    public UserResponse updateUserNovelGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
//        user.updateFavoriteNovelGenre(request.getGerne());
        String str = convertGenreName(request);
        user.updateFavoriteNovelGenre(str);
        return UserResponse.from(user);
//        return UserGenreResponse.from(user.getFavoriteWebtoonGenre(), user.getFavoriteNovelGenre());
    }
    @Transactional
    public UserResponse updateUserWebtoonGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        String str = convertGenreName(request);
        user.updateFavoriteWebtoonGenre(str);
//        user.updateFavoriteWebtoonGenre(request.getGerne());
//        return UserGenreResponse.from(user.getFavoriteWebtoonGenre(), user.getFavoriteNovelGenre());
        return UserResponse.from(user);

    }

    public String convertGenreName(UserGenreRequest request) {
        String str = "";
        for(String tmp :request.getGerne()){
            Genre genre = genreRepository.findById(Long.parseLong(tmp)).orElseThrow(() -> new ResourceNotFoundException("Genre", "genreId", tmp));
            str += genre.getName()+"^";
        }
        return str;
    }

//    public void validUser(Long currentUser, Long postUser) {
//
//        if (currentUser == postUser || currentUser.equals(postUser)) {
//            return;
//        }
//        else {
//            throw new ResourceForbiddenException("본인이 아닙니다");
//        }
//    }
}

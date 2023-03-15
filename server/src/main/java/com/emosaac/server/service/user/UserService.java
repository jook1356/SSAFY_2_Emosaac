package com.emosaac.server.service.user;

import com.emosaac.server.common.exception.ArgumentMismatchException;
import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.GenreResponse;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

        if (nickNameCheck(request.getNickName()) == true) {
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

    //나의 선호 웹툰 장르
    public List<GenreResponse> getUserWebtoonGerne(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return stringToEntity(user.getFavoriteWebtoonGenre()).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    //나의 선호 소설 장르
    public List<GenreResponse> getUserNovelGerne(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return stringToEntity(user.getFavoriteNovelGenre()).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    //웹툰 선호 장르 변경
    @Transactional
    public List<GenreResponse> updateUserWebtoonGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        user.setFavoriteWebtoonGenre(listToString(request));
        return getUserWebtoonGerne(user.getUserId());
    }

    //소설 선호 장르 변경
    @Transactional
    public List<GenreResponse> updateUserNovelGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        user.setFavoriteNovelGenre(listToString(request));
        return getUserNovelGerne(user.getUserId());
    }


    public String listToString(UserGenreRequest request) {
        String str = "";
        if (!request.getGerne().isEmpty()) {
            for (String tmp : request.getGerne()) {
                Genre genre = genreRepository.findById(Long.parseLong(tmp)).orElseThrow(() -> new ResourceNotFoundException("GenreResponse", "genreId", tmp));
                str += genre.getGerneId() + "^";
            }
        }
        return str;
    }

    public List<Genre> stringToEntity(String request) {
        List<Genre> tmpList = new ArrayList<>();
        if (request != null) {
            String[] list = request.split("\\^");
            for (int i = 0; i < list.length; i++) {
                String tmp = list[i];
                Genre genre = genreRepository.findById(Long.parseLong(tmp)).orElseThrow(() -> new ResourceNotFoundException("GenreResponse", "genreId", tmp));
                tmpList.add(genre);
            }
        }
        return tmpList;
    }

}

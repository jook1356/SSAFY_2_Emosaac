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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public UserGenreResponse getUserGerne(Long userId) { //그냥 유저 정보 조회해도 나오니까 안써도 될것 같음
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Map<Object, Object> mapWebtoon= stringToMap(user.getFavoriteWebtoonGenre());
        Map<Object, Object> mapNovel=  stringToMap(user.getFavoriteNovelGenre());

//        String novel = user.getFavoriteNovelGenre();
        return UserGenreResponse.from(mapWebtoon, mapNovel);
    }

    @Transactional
    public UserGenreResponse updateUserWebtoonGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        Map<Object, Object> mapWebtoon = listToMap(request);
        user.updateFavoriteWebtoonGenre(mapWebtoon.get("str").toString());
        mapWebtoon.remove("str");
//        user.updateFavoriteWebtoonGenre(request.getGerne());
        Map<Object, Object> mapNovel=  stringToMap(user.getFavoriteNovelGenre());

        return UserGenreResponse.from(mapWebtoon, mapNovel);

    }

    @Transactional
    public UserGenreResponse updateUserNovelGenre(Long userId, UserGenreRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
//        user.updateFavoriteNovelGenre(request.getGerne());
        Map<Object, Object> mapNovel = listToMap(request);
        user.updateFavoriteNovelGenre(mapNovel.get("str").toString());
        mapNovel.remove("str");
        Map<Object, Object> mapWebtoon =  stringToMap(user.getFavoriteWebtoonGenre());
        return UserGenreResponse.from(mapWebtoon, mapNovel);
    }



    public Map<Object, Object> listToMap(UserGenreRequest request) {
        String str = "";
        Map<Object, Object> map =new HashMap<>();
        if (!request.getGerne().isEmpty()) {
            for (String tmp : request.getGerne()) {
                Genre genre = genreRepository.findById(Long.parseLong(tmp)).orElseThrow(() -> new ResourceNotFoundException("Genre", "genreId", tmp));
                str += genre.getGerneId() + "^";
                map.put(genre.getGerneId(), genre);
            }
        }
        map.put("str", str);
        return map;
    }

    public Map<Object, Object> stringToMap(String request) {
        Map<Object, Object> map =new HashMap<>();
        if (request != null) {
            String[] list = request.split("\\^");
            for (int i = 0; i < list.length; i++) {
                String tmp = list[i];
                Genre genre = genreRepository.findById(Long.parseLong(tmp)).orElseThrow(() -> new ResourceNotFoundException("Genre", "genreId", tmp));
                map.put(genre.getGerneId(), genre);
            }
        }
        return map;
    }

}

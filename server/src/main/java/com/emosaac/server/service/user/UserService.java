package com.emosaac.server.service.user;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.config.s3.S3Uploader;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.dto.user.UserRequestFile;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final String baseImg = "static/user/06f9a0b1-0b17-4e61-bb31-fc2435cb8d9cng1.png";
    private final S3Uploader s3Uploader;

    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return UserResponse.from(user);
    }

    @Transactional
    public Long updateUserInfo(Long userId, UserRequest request){

        System.out.println("update 진입");

        User originUser = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

//        if (nickNameCheck(request.getNickName()) == true) {
//            throw new ArgumentMismatchException("닉네임 중복입니다");
//        }

        originUser.setUserInfo(request); //이미지 링크 수정 빼고 업데이트

        String originImg = originUser.getImageUrl();
        String newImg = null;

        if(request.getImageUrl()!=null || !request.getImageUrl().equals("")){
            newImg = request.getImageUrl().replace("https://emosaacbucket.s3.ap-northeast-2.amazonaws.com/","");
        }
        System.out.println("newImg "+newImg);

        //이미지 널이면 디폴트 이미지 처리
        if(newImg==null || newImg.equals("")){
            System.out.println("hey1111");
            originUser.updateImageUrl(baseImg);
            deleteS3Image(originImg, baseImg); //기존이미지와 링크도 다른 경우 원래 이미지 삭제
        }else{
            System.out.println("hey2222");
            originUser.updateImageUrl(newImg);
            if(!newImg.equals(originImg)){
                deleteS3Image(originImg, baseImg); //기존이미지와 링크도 다른 경우 원래 이미지 삭제
            }

        }

        return userId;
    }

    private void deleteS3Image(String originImg, String baseImg){

        if(!originImg.equals(baseImg)) {
            try {
                s3Uploader.delete(originImg);
            } catch (AmazonS3Exception e) {
                throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
            }
        }
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
        return stringToList(user.getFavoriteWebtoonGenre()).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    //나의 선호 소설 장르
    public List<GenreResponse> getUserNovelGerne(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return stringToList(user.getFavoriteNovelGenre()).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
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

    public List<Genre> stringToList(String request) {
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

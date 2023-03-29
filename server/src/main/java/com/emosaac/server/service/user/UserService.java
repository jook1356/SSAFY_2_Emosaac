package com.emosaac.server.service.user;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.emosaac.server.common.exception.ArgumentMismatchException;
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
import com.emosaac.server.service.CommonService;
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
    private final String baseImg = "static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png";
    private final S3Uploader s3Uploader;
    private final CommonService commonService;

    public UserResponse getUser(Long userId) {
        User user = commonService.getUser(userId);
        return UserResponse.from(user);
    }

    @Transactional
    public Long updateUserInfo(Long userId, UserRequest request){

        User originUser = commonService.getUser(userId);

        if (nickNameCheck(request.getNickName(), userId) == true) {
            throw new ArgumentMismatchException("닉네임 중복입니다");
        }

        originUser.setUserInfo(request); //이미지 링크 수정 빼고 업데이트

        String originImg = originUser.getImageUrl();
        String newImg = null;

        if(request.getImageUrl()!=null || !request.getImageUrl().equals("")){
            newImg = request.getImageUrl();
        }
        System.out.println("newImg "+newImg);

        //이미지 널이면 디폴트 이미지 처리
        if(newImg==null || newImg.equals("")){
            originUser.updateImageUrl(baseImg);
//            deleteS3Image(originImg, baseImg); //기존이미지와 링크도 다른 경우 원래 이미지 삭제
        }else{
            originUser.updateImageUrl(newImg);
            if(!newImg.equals(originImg)){
                deleteS3Image(originImg, baseImg); //기존이미지와 링크도 다른 경우 원래 이미지 삭제
            }

        }

        return userId;
    }

    private void deleteS3Image(String originImg, String baseImg){

        if(!(originImg != null) && !originImg.equals(baseImg)) {
            try {
                s3Uploader.delete(originImg);
            } catch (AmazonS3Exception e) {
                throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
            }
        }
    }

    public boolean nickNameCheck(String nickName, Long userId) {//본인 닉네임 빼고 중복된 닉네임 있는지 확인
        boolean flag = false;
        if (userRepository.findByUserNickName(nickName, userId).isPresent()) {
            flag = true;
        }
        return flag;
    }

    ///<----------- 장르

    //나의 선호 장르 조회
    public List<GenreResponse> getUserFavoriteGerne(Long userId, Integer typeCode) {
        User user = commonService.getUser(userId);
        String str = (typeCode==0) ? user.getFavoriteWebtoonGenre() : user.getFavoriteNovelGenre(); //선호 장르에 반영

        return stringToGenreList(str).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    //선호 장르 변경
    @Transactional
    public List<GenreResponse> updateUserGenre(Long userId, UserGenreRequest request, Integer typeCode) {
        User user = commonService.getUser(userId);
        String str = listToString(request);
        if(typeCode==0){
            user.setFavoriteWebtoonGenre(str);
        } else if (typeCode==1) {
            user.setFavoriteNovelGenre(str);
        }
        return getUserFavoriteGerne(user.getUserId(), typeCode);
    }


    public String listToString(UserGenreRequest request) {
        String str = "";
        if (!request.getGerne().isEmpty()) {
            for (Long tmp : request.getGerne()) {
                Genre genre = commonService.getGenre(tmp);
                str += genre.getGerneId() + "^";
            }
        }
        return str;
    }

    public List<Genre> stringToGenreList(String request) {
        List<Genre> tmpList = new ArrayList<>();
        if (request != null) {
            String[] list = request.split("\\^");
            System.out.println(list[0]);
            for (int i = 0; i < list.length; i++) {
                String tmp = list[i];
                Genre genre = commonService.getGenre(Long.parseLong(tmp));
                tmpList.add(genre);
            }
        }
        return tmpList;
    }

}

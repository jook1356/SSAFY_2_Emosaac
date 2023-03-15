package com.emosaac.server.dto.user;

import com.emosaac.server.domain.user.User;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String nickname;

    private String email;

    private String userName;

    private String imageUrl;

    private Boolean gender;
    //나이
    private Integer age;

//    private List<String> webtoonGerne;

//    private List<String> novelGerne;

    public static UserResponse from(User user) {
        String imgUrl = user.getImageUrl();
        //        String imgUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + user.getImageUrl();
        List<String> tmpWebtoon = new ArrayList<>();
        List<String> tmpNovel = new ArrayList<>();

//        tmpWebtoon = setWebtoonGerne(user.getFavoriteWebtoonGenre());
//        tmpNovel = setNovelGerne(user.getFavoriteNovelGenre());
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl, user.getGender(), user.getAge());
    }

    public UserResponse(Long userId, String nickname, String email, String userName, String imageUrl, Boolean gender, Integer age) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.userName = userName;
        this.imageUrl = imageUrl;
        this.gender = gender;
        this.age = age;
    }

    public static List<String> setWebtoonGerne(String genre) {
        if (genre != null) {
            String[] list = genre.split("\\^");
            List<String> tmp = new ArrayList<>();
            for (int i = 0; i < list.length; i++) {
                System.out.println(list[i]);
                tmp.add(list[i]);
            }
            return tmp;
        }
        return null;
    }

    public static List<String> setNovelGerne(String genre) {
        if (genre != null) {
            String[] list = genre.split("\\^");
            List<String> tmp = new ArrayList<>();

            for (int i = 0; i < list.length; i++) {
                tmp.add(list[i]);
            }

            return tmp;
        }
        return null;
    }
}

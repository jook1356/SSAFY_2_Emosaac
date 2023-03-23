package com.emosaac.server.dto.user;

import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGenreResponse {

//    private String userId;

    private List<Map<Object, Object>> webtoonGenre;

    private List<Map<Object, Object>> novelGenre;

//    public UserGenreResponse(List<Map<Object, Object>> tmpWebtoon, List<Map<Object, Object>> tmpNovel) {
//        this.webtoonGerne = tmpWebtoon;
//        this.novelGerne = tmpNovel;
//    }

    public static UserGenreResponse from(Map<Object, Object> mapWebtoon, Map<Object, Object> mapNovel) {
        List<Map<Object, Object>> tmpWebtoon = new ArrayList<>();
        List<Map<Object, Object>> tmpNovel = new ArrayList<>();

////        tmpWebtoon = setWebtoonGerne(webtoonGerne);
////        tmpNovel = setNovelGerne(novelGerne);
        tmpWebtoon.add(mapWebtoon);
        tmpNovel.add(mapNovel);
        return new UserGenreResponse(tmpWebtoon, tmpNovel);
    }

//    public static UserGenreResponse from(String webtoonGerne, Map<Object, Object> map) {
//        List<String> tmpWebtoon = new ArrayList<>();
//        List<String> tmpNovel = new ArrayList<>();
//
//        tmpWebtoon = setWebtoonGerne(webtoonGerne);
//        tmpNovel = setNovelGerne(novelGerne);
//
//        return new UserGenreResponse(tmpWebtoon, tmpNovel);
//    }

    public static List<String> setWebtoonGerne(String genre) {
        if (genre != null) {
            String[] list = genre.split("\\^");
            List<String> tmp = new ArrayList<>();
            for (int i = 0; i < list.length; i++) {
                tmp.add(list[i]);
            }
            return tmp;
        }
        return new ArrayList<>();
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
        return new ArrayList<>();
    }
}

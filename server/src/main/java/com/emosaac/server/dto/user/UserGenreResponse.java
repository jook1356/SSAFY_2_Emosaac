package com.emosaac.server.dto.user;

import com.emosaac.server.domain.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class UserGenreResponse {

    private static List<String> webtoonGerne;

    private static List<String> novelGerne;

    public UserGenreResponse(List<String> tmpWebtoon, List<String> tmpNovel) {
        this.webtoonGerne = tmpWebtoon;
        this.novelGerne = tmpNovel;
    }

    public static UserGenreResponse from(String webtoonGerne, String novelGerne) {
        List<String> tmpWebtoon = new ArrayList<>();
        List<String> tmpNovel = new ArrayList<>();

        tmpWebtoon = setWebtoonGerne(webtoonGerne);
        tmpNovel = setNovelGerne(novelGerne);

        return new UserGenreResponse(tmpWebtoon, tmpNovel);
    }

    public static List<String> setWebtoonGerne(String genre) {
        if (genre != null) {
            String[] list = genre.split("^");
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
            String[] list = genre.split("^");
            List<String> tmp = new ArrayList<>();

            for (int i = 0; i < list.length; i++) {
                tmp.add(list[i]);
            }

            return tmp;
        }
        return new ArrayList<>();
    }
}

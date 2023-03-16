package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.WriterInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class EmopickDetailResponse {
    /*썸네일, 제목, 장르, 초기등록일, 작가명, 평균 평점, 플랫폼별 평점
+ review */
    private WriterInfo writerInfo;
    private String title;
    private String content;
    private LinkedHashMap<Long, BookReveiwResponse> webtoons = new LinkedHashMap<>();
    private Map<Long, BookReveiwResponse> novels = new LinkedHashMap<>();

    @QueryProjection
    public EmopickDetailResponse(User user, String title, String content){
        this.writerInfo = WriterInfo.from(user);
        this.title = title;
        this.content = content;
    }
    public void addWebtoon(LinkedHashMap<Long, BookReveiwResponse> map){
        this.webtoons = map;
    }
//    public void addWebtoon(Long bookId, BookReveiwResponse bookReveiwResponse){
//        webtoons.put(bookId, bookReveiwResponse);
//    }
    public void addNovel(Long bookId, BookReveiwResponse bookReveiwResponse){
        novels.put(bookId, bookReveiwResponse);
    }
}

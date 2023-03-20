package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.WriterInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class DetailResponse<T> {
    /*썸네일, 제목, 장르, 초기등록일, 작가명, 평균 평점, 플랫폼별 평점
+ review */
    private WriterInfo writerInfo;
    private String title;
    private String content;
    private Object webtoon;
    private Object novel;
    private boolean emoLike;

    public DetailResponse(User user, String title, String content, Object webtoon, Object novel, boolean emoLikeStatus){
        this.writerInfo = WriterInfo.from(user);
        this.title = title;
        this.content = content;
        this.webtoon = webtoon;
        this.novel = novel;

        this.emoLike = emoLikeStatus;
    }


}
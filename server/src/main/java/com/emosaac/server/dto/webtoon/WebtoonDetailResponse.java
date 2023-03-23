package com.emosaac.server.dto.webtoon;

import com.emosaac.server.domain.book.Genre;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class WebtoonDetailResponse {
    private Long bookId;
    private String author;
    private String title;
    private String thumbnail;
    private String day;
    private Genre genre;
    private String story;
    private String tag;
    private String grade;
    private Long score;
    private Long hit;
    private int platform;
    private String href;
    private String regist;
}

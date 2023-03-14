package com.emosaac.server.dto.novel;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NovelDayResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;

    @QueryProjection
    public NovelDayResponse(Book book){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
    }

}

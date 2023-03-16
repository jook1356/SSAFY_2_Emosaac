package com.emosaac.server.dto.book;

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
public class BookListResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;
    private String href;
    private double score;

    @QueryProjection
    public BookListResponse(Book book){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.href = book.getHref();
        this.score = book.getScore();
    }

}
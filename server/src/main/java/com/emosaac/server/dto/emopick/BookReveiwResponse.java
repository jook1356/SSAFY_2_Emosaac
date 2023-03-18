package com.emosaac.server.dto.emopick;

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
public class BookReveiwResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;
    private String href;
    private String genre;
    private String regist;
    private String grade;
    private double avgScore;

    private String reveiw;

    @QueryProjection
    public BookReveiwResponse(Book book, String review){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.href = book.getHref();
        this.genre = book.getGenre().getName();
        this.grade = book.getGrade();
        this.regist = book.getRegist();

        this.avgScore = book.getScore();

        this.reveiw = review;
    }
}

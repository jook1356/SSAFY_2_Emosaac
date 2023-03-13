package com.emosaac.server.dto;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BookResponse {

    private Long postId;

    private String title;

    private String content;

    private String thumbnail;

    private Integer views;

    private Integer likeStatusSize;

    private Boolean likeStatus;

    private Boolean bookmarkStatus;

    private String createdDate;

    private String modifiedDate;


    @QueryProjection
    public BookResponse(Book post) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.postId = post.getBookId();
        this.title = post.getTitle();
        this.createdDate = post.getCreatedDate().format(myFormatObj);
        if(post.getModifiedDate()!=null) {
            this.modifiedDate = post.getModifiedDate().format(myFormatObj);
        }

//        this.likeStatus = post.getPostLikeList().getPostLikeList().parallelStream()
//                .anyMatch(l -> l.ownedBy(user.getUserId()));
//        this.likeStatusSize = post.getTotalLikes();
//        this.bookmarkStatus = post.getPostBookmarkList().getPostBookmarkList().parallelStream()
//                .anyMatch((b)-> b.ownedBy(user.getUserId()));

    }
}

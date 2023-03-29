package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.WriterInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class EmopickListResponse {
    private WriterInfo writerInfo;
    private Long emopickId;
    private String title;
//    private String webtoonSeq;
//    private String novelSeq;
    private String thumbnails;
    private String createdDate;
    private String modifiedDate;

    @QueryProjection
    public EmopickListResponse (Emopick emopick){

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.writerInfo = WriterInfo.from(emopick.getUser());
        this.emopickId = emopick.getEmopickId();
        this.title = emopick.getTitle();

//        this.webtoonSeq = emopick.getWebtoonSeq();
//        this.novelSeq = emopick.getNovelSeq();

        this.createdDate = emopick.getCreatedDate().format(myFormatObj);
        if(emopick.getModifiedDate()!=null) {
            this.modifiedDate = emopick.getModifiedDate().format(myFormatObj);
        }
    }

    public void setThumbnails(String thumbnails) {
        this.thumbnails = thumbnails;
    }

    //    @QueryProjection
//    public EmopickListResponse(User user, Long emopickId, String title, String thumbnails, LocalDateTime createdDate, LocalDateTime modifiedDate) {
//        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        this.writerInfo = WriterInfo.from(user);
//        this.emopickId = emopickId;
//        this.title = title;
//        this.thumbnails = thumbnails;
//
//        this.createdDate = createdDate.format(myFormatObj);
//        if(modifiedDate!=null) {
//            this.modifiedDate = modifiedDate.format(myFormatObj);
//        }
//    }

}
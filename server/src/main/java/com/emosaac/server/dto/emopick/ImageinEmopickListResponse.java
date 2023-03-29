package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.dto.comment.WriterInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ImageinEmopickListResponse {
    private WriterInfo writerInfo;
    private Long emopickId;
    private String title;
    private List<String> thumbnails;
    private String createdDate;
    private String modifiedDate;

    @QueryProjection
    public ImageinEmopickListResponse (EmopickListResponse emopick, List<String> thumbnails){

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.writerInfo = emopick.getWriterInfo();
        this.emopickId = emopick.getEmopickId();
        this.title = emopick.getTitle();

        this.createdDate = emopick.getCreatedDate();
        if(emopick.getModifiedDate()!=null) {
            this.modifiedDate = emopick.getModifiedDate();
        }

        this.thumbnails = thumbnails;
    }
}
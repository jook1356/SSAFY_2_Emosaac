package com.emosaac.server.dto.genre;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BookRequest {

    private int typeCd;

    private String criteria;

    private int size;

    private Long prevId;

    private Double prevScore;

    private Long genreCode;

//    private int isLike;

//    public BookRequest(int typeCd, int isLike) {
//        this.typeCd = typeCd;
//        this.isLike = isLike;
//    }



    public BookRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
    }

    public static BookRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore, Long genreCode) {
        return new BookRequest(typeCd, criteria,size, prevId, prevScore, genreCode);
    }

    public static BookRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        return new BookRequest(typeCd, criteria,size, prevId, prevScore);
    }

}

package com.emosaac.server.dto.book;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BookPageRequest {

    private int typeCd;

    private String criteria;

    private int size;

    private Long prevId = 20000L;

    private Double prevScore = 10.0;

    private Long genreCode;


    public BookPageRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore, Long genreCode) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
        this.genreCode = genreCode;
    }

    public BookPageRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
    }

    public static BookPageRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore, Long genreCode) {
        return new BookPageRequest(typeCd, criteria,size, prevId, prevScore, genreCode);
    }

    public static BookPageRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        return new BookPageRequest(typeCd, criteria,size, prevId, prevScore);
    }


}

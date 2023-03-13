package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_NO")
    private Long bookId;

    private String author;

    private String title;

    private String thumbnail;

    @Column(columnDefinition = "TEXT")
    private String day;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GENRE_CD")
    private Gerne genre;

    @Column(columnDefinition = "TEXT")
    private String story;

    @Column(columnDefinition = "TEXT")
    private String tag;

    private String views;//플랫폼에서 가져온 조회수

    private double grade; // 플랫폼에서 가져온 평점

    @Column(name = "PLAT_CD")
    private String platform; //0: 카,1:네,2:리

    private String series; //현재까지 총 몇 편인지

    private String href; //플랫폼 작품 주소

    @Column(name = "TYPE_CD")
    private Integer type; //0: 웹툰, 1: 웹소설

    private double score; //우리 페이지 사용자가 체점

    private Integer hit; //우리 사이트에서 조회수

    private String regist; //1화 등록 날짜

    @Embedded
    private final BookCommentList commentList = new BookCommentList();

    @Embedded
    private final BookmarkList bookmarkList = new BookmarkList();

}


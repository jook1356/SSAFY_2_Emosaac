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

    private Integer views;//조회수

    private String grade;

    @Column(name = "PLAT_CD")
    private String platform;

    private String series;

    private String href;

    @Column(name = "TYPE_CD")
    private String type; //0: 카,1:네,2:리

    private String SCORE;

    private Integer hit;

    private String regist;

    private String flag; //이게 뭐더라

    @Embedded
    private final BookCommentList commentList = new BookCommentList();

    @Embedded
    private final BookmarkList bookmarkList = new BookmarkList();

}


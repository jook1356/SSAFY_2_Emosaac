package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
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
public class Book extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String shortDescription;

    private Integer views;//조회수

    private String img;

    @Embedded
    private final BookCommentList commentList = new BookCommentList();

}


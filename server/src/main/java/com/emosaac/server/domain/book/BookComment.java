package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert //@DynamicInsert사용
@DynamicUpdate
public class BookComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "webtoon_comment_id")
    private Long commentId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="user_id")
//    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private BookComment parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<BookComment> children = new ArrayList<>();

    private Integer depth;//0과1

    @Column(columnDefinition="TEXT")
    private String content;

    @ColumnDefault("false")
    private Boolean isDelete; //삭제여부


}

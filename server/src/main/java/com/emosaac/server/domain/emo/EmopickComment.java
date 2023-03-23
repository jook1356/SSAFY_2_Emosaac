package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
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
public class EmopickComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMO_COMMENT_NO")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_NO")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="EMOPICK_NO")
    private Emopick emopick;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private EmopickComment parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<EmopickComment> children = new ArrayList<>();

    private Integer depth;//0과1

    @Column(columnDefinition="TEXT")
    private String content;

    @ColumnDefault("false")
    private Boolean isDelete; //삭제여부

    @Embedded
    private final EmoCommentLikeList emoCommentLikeList = new EmoCommentLikeList();


}

package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.book.BookCommentLike;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    private Double likeScore;
    @Embedded
    private final EmoCommentLikeList emoCommentLikeList = new EmoCommentLikeList();

    @Builder
    public EmopickComment(User user, Emopick emopick, String content, EmopickComment parent, Integer depth) {
        this.user = user;
        this.emopick = emopick;
        this.content = content;
        this.parent = parent;
        this.depth = depth;
    }
    public void setChild(EmopickComment emopickComment) {
        this.children.add(emopickComment);
    }
    public void updateDeleteStatus() {
        this.isDelete = true;
        this.content = null;
    }
    public void update(CommentUpdateRequest request){
        this.content = request.getContent();
    }

    public boolean toggleEmopickCommentLike(EmoCommentLike emoCommentLike) {
        return emoCommentLikeList.toggleEmopickCommentLike(emoCommentLike);
    }
    public Integer getTotalLikes(){
        return emoCommentLikeList.size();
    }


}

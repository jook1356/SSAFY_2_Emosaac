package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
public class EmoCommentLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_LIKE_NO")
    private Long commentLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMO_COMMENT_NO", nullable = false)
    private EmopickComment emopickComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_no")
    private User user;


    @Builder
    public EmoCommentLike(EmopickComment emopickComment, User user){
        this.emopickComment = emopickComment;
        this.user = user;
    }
    public boolean ownedBy(Long userId) {
        return this.user.getUserId().equals(userId);
    }
}

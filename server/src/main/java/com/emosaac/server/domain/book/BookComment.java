package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
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
import java.sql.ConnectionBuilder;
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
    @Column(name = "DETAIL_COMMENT_NO")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_NO")
    private User user;

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

    public void setChild(BookComment bookComment) {
        this.children.add(bookComment);
    }

    @Builder
    public BookComment(User user, Book book, String content, BookComment parent, Integer depth) {
        this.user = user;
        this.book = book;
        this.content = content;
        this.parent = parent;
        this.depth = depth;
    }

    public void update(CommentUpdateRequest request){
        this.content = request.getContent();
    }

    public void updateDeleteStatus() {
        this.isDelete = true;
        this.content = null;
    }

}

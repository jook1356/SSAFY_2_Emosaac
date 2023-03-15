package com.emosaac.server.dto.comment;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CommentSaveRequest {
    private Long parentId; //대댓글이 달릴 댓글

    @NotBlank(message = "내용이 없습니다.")
    private String content;


    public BookComment of(User user, Book book, Integer depth) {
        return BookComment.builder().user(user).content(content).book(book).depth(depth).build();
    }
    public BookComment of(User user, Book book, BookComment parent, Integer depth) {
        return BookComment.builder().user(user).content(content).book(book).parent(parent).depth(depth).build();
    }
}

package com.emosaac.server.service.comment;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.comment.commentSaveRequest;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.comment.BookCommentRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookCommentService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookCommentRepository BookCommentRepository;
    @Transactional
    public Long createBookComment(Long userId, Long bookId, commentSaveRequest request) {
        Book book = bookRepository.findByBookId(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        BookComment bookComment = null;
        if(request.getParentId() != null){
            BookComment parent = BookCommentRepository.findComment(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("ParentComment", "parentId", request.getParentId()));
            bookComment =  BookCommentRepository.save(request.of(user, book, parent,1));
            parent.setChild(bookComment);
        }
        else{
            bookComment = BookCommentRepository.save(request.of(user, book, 0));
        }
        return bookComment.getCommentId();
    }
}

package com.emosaac.server.service.comment;

import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.book.BookCommentLike;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.comment.CommentLikeResponse;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.repository.comment.BookCommentQueryRepository;
import com.emosaac.server.repository.comment.BookCommentRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookCommentService {
    private final CommonService commonService;
    private final BookCommentRepository bookCommentRepository;
    private final BookCommentQueryRepository bookCommentQueryRepository;
    @Transactional
    public Long createBookComment(Long userId, Long bookId, CommentSaveRequest request) {
        Book book = commonService.getBook(bookId);
        User user = commonService.getUser(userId);

        BookComment bookComment = null;
        if(request.getParentId() != null){
            BookComment parent = bookCommentRepository.findComment(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("ParentComment", "parentId", request.getParentId()));
            bookComment =  bookCommentRepository.save(request.of(user, book, parent,1));
            parent.setChild(bookComment);
        }
        else{
            bookComment = bookCommentRepository.save(request.of(user, book, 0));
        }
        return bookComment.getCommentId();
    }

    @Transactional
    public Long updateBookComment(Long userId, Long commentId, CommentUpdateRequest request) {
        BookComment bookComment = bookCommentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("BookComment", "commentId", commentId));

        validBookCommentUser(userId, bookComment.getUser().getUserId());
        bookComment.update(request);
        return bookComment.getCommentId();
    }
    
    

    public void validBookCommentUser(Long currentUser, Long CommentUser) {

        if (currentUser == CommentUser || currentUser.equals(CommentUser)) {
            return;
        } else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }

    @Transactional
    public Long deleteBookComment(Long userId, Long commentId) {
        BookComment bookComment = bookCommentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("BookComment", "commentId", commentId));
        validBookCommentUser(userId, bookComment.getUser().getUserId());

        if(!bookComment.getChildren().isEmpty()){ // 자식 댓글이 있는 경우
            bookComment.updateDeleteStatus();
        }else{
            bookCommentRepository.deleteByCommentId(commentId);
        }
        return commentId;
    }
    
    // state 0 : 부모, 1 : 자식
    public List<CommentResponse> findParentBookCommentList(Long bookId, String criteria, int offset, int size) {
        return bookCommentQueryRepository.findParentCommentByBookId(bookId, criteria, PageRequest.of(offset - 1, size));
    }

    public List<CommentResponse> findChildBookCommentList(Long parentId, String criteria, int offset, int size) {
        return bookCommentQueryRepository.findChildCommentByBookId(parentId, criteria, PageRequest.of(offset - 1, size));
    }
    @Transactional
    public CommentLikeResponse toggleBookCommentLike(Long userId, Long bookCommentId) {
        BookComment bookComment = bookCommentRepository.findByBookCommentId(bookCommentId);
        User user = commonService.getUser(userId);
        BookCommentLike bookCommentLike = BookCommentLike.builder().bookComment(bookComment).user(user).build();
        return new CommentLikeResponse(bookComment.getCommentId(), bookComment.toggleBookCommentLike(bookCommentLike), bookComment.getTotalLikes());
    }
}

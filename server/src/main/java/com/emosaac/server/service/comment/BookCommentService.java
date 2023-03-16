package com.emosaac.server.service.comment;

import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.BookComment;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.comment.BookCommentQueryRepository;
import com.emosaac.server.repository.comment.BookCommentRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookCommentService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookCommentRepository bookCommentRepository;
    private final BookCommentQueryRepository bookCommentQueryRepository;
    @Transactional
    public Long createBookComment(Long userId, Long bookId, CommentSaveRequest request) {
        Book book = bookRepository.findByBookId(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        User user = userRepository.findByMyId(userId);

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

        if(bookComment.getDepth()==0 && !bookComment.getChildren().isEmpty()){ //원댓글이 사라지면 숨김 처리
            bookComment.updateDeleteStatus();
        }else if(!bookComment.getChildren().isEmpty()){
            bookComment.updateDeleteStatus();
        }else{
            bookCommentRepository.deleteByCommentId(commentId);
        }
        return commentId;
    }

    // state 0 : 부모, 1 : 자식
    public List<CommentResponse> findBookCommentList(Long bookId, int state, int offset, int size) {
        return bookCommentQueryRepository.findCommentByBookId(bookId, state, PageRequest.of(offset - 1, size));
//        return convertNestedStructure(bookCommentRepository.findCommentByBookId(bookId));
    }

//    private List<CommentResponse> convertNestedStructure(List<BookComment> comments) {
//        List<CommentResponse> result = new ArrayList<>();
//        Map<Long, CommentResponse> map = new HashMap<>();
//        comments.stream().forEach(c -> {
//            CommentResponse dto = CommentResponse.from(c);
//            map.put(dto.getCommentId(), dto);
//            if(c.getParent() != null) {
//                map.get(c.getParent().getCommentId()).getChildren().add(dto);
//            }
//            else result.add(dto);
//        });
//        return result;
//    }
}

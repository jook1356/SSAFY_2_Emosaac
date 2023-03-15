package com.emosaac.server.controller.comment;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.comment.BookCommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/book/comments")
@Api(tags = {"북 댓글 컨트롤러"})
public class BookCommentController {

    @Autowired
    private BookCommentService bookCommentService;
    @ApiOperation(value = "북 댓글 등록", notes = "북 댓글을 등록한다")
    @PostMapping("/{bookId}")
    public ResponseEntity<CommonResponse> createBookComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable Long bookId,
                                                            @RequestBody @Valid CommentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", bookCommentService.createBookComment(user.getId(), bookId, request)));
    }
    @ApiOperation(value = "북 댓글 수정", notes = "북 댓글을 수정한다")
    @PutMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updateBookComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable Long commentId,
                                                            @RequestBody @Valid CommentUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", bookCommentService.updateBookComment(user.getId(), commentId, request)));
    }

    @ApiOperation(value = "댓글 삭제", notes = "단일 댓글을 삭제한다")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deleteBookComment(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long commentId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", bookCommentService.deleteBookComment(user.getId(), commentId)));
    }

}

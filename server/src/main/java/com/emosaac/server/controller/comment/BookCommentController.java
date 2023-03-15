package com.emosaac.server.controller.comment;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.comment.commentSaveRequest;
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
@RequestMapping("/api/comments")
@Api(tags = {"북 댓글 컨트롤러"})
public class BookCommentController {

    @Autowired
    private BookCommentService BookCommentService;
    @ApiOperation(value = "북 댓글 등록", notes = "북 댓글을 등록한다")
    @PostMapping("/{bookId}")
    public ResponseEntity<CommonResponse> createPost(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long bookId, @RequestBody @Valid commentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", BookCommentService.createBookComment(user.getId(), bookId, request)));
    }


}

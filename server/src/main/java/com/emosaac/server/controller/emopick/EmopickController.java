package com.emosaac.server.controller.emopick;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.emopick.EmopickService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/emopicks")
@Api(tags = {"이모픽 컨트롤러"})
public class EmopickController {

    @Autowired
    EmopickService emopickService;

    @ApiOperation(value = "이모픽 리스트 조회", notes = "이모픽 리스트를 조회한다.")
    @GetMapping
    public ResponseEntity<CommonResponse> findEmopickList(@RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                          @RequestParam(value = "prevId", required = false, defaultValue = "20000")Long prevId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 조회 완료", emopickService.findEmopickList(size, prevId)
        ));
    }

    @ApiOperation(value = "이모픽 상세 조회", notes = "이모픽을 상세 조회한다.")
    @GetMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> findEmopickDetail(@PathVariable Long emopickId,
                                                            @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 조회 완료", emopickService.findEmopickDetail(emopickId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 등록", notes = "유저가 이모픽을 등록한다.")
    @PostMapping
    public ResponseEntity<CommonResponse> createEmopickByUser(@RequestBody @Valid EmopickSaveRequest request,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 등록 완료", emopickService.createEmopickByUser(request, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 수정", notes = "유저가 이모픽을 수정한다.")
    @PutMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> updateEmopickByUser(@PathVariable Long emopickId,
                                                              @RequestBody @Valid EmopickSaveRequest request,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 수정 완료", emopickService.updateEmopickByUser(emopickId, request, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 삭제", notes = "유저가 이모픽을 삭제한다.")
    @DeleteMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> deleteEmopickByUser(@PathVariable Long emopickId,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "이모픽 삭제 완료", emopickService.deleteEmopickByUser(emopickId, userPrincipal.getId())
        ));
    }

    //////////////
    @ApiOperation(value = "이모픽 좋아요", notes = "유저가 이모픽을 좋아요 설정한다.")
    @PutMapping("/{emopickId}/like")
    public ResponseEntity<CommonResponse> updateLikeByUser(@PathVariable Long emopickId,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 수정 성공", emopickService.toggleLikesByEmopick(emopickId, userPrincipal.getId())
        ));
    }

    /* 댓글 */
    @ApiOperation(value = "해당 이모픽의 부모 댓글 리스트 조회", notes = "emopickId를 입력받은 후 댓글을 조회한다. (date : 날짜, like : 좋아요 순으로 정렬)")
    @GetMapping("/comment/parent/{emopickId}")
    public ResponseEntity<CommonResponse> findParentEmopickCommentList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                    @PathVariable Long emopickId,
                                                                    @RequestParam(required=false, defaultValue = "date") String criteria,
                                                                    @RequestParam(required=false, defaultValue = "1") int offset,
                                                                    @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "해당 게시물의 댓글 목록 조회 성공", emopickService.findParentEmopickCommentList(user.getId(), emopickId, criteria, offset, size)));
    }
    @ApiOperation(value = "해당 이모픽의 자식 댓글 리스트 조회", notes = "부모 댓글의 parentId를 입력받은 후 댓글을 조회한다. (date : 날짜, like : 좋아요 순으로 정렬)")
    @GetMapping("/comment/child/{parentId}")
    public ResponseEntity<CommonResponse> findChildEmopickCommentList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                   @PathVariable Long parentId,
                                                                   @RequestParam(required=false, defaultValue = "date") String criteria,
                                                                   @RequestParam(required=false, defaultValue = "1") int offset,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "해당 게시물의 댓글 목록 조회 성공", emopickService.findChildEmopickCommentList(user.getId(), parentId, criteria, offset, size)));
    }

    @ApiOperation(value = "이모픽 댓글 등록", notes = "이모픽 댓글을 등록한다")
    @PostMapping("/comment/{emopickId}")
    public ResponseEntity<CommonResponse> createEmopickComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable Long emopickId,
                                                            @RequestBody @Valid CommentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", emopickService.createEmopickComment(user.getId(), emopickId, request)));
    }
    @ApiOperation(value = "이모픽 댓글 수정", notes = "이모픽 댓글을 수정한다")
    @PutMapping("/comment/{commentId}")
    public ResponseEntity<CommonResponse> updatEmopickComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable Long commentId,
                                                            @RequestBody @Valid CommentUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", emopickService.updateEmopickComment(user.getId(), commentId, request)));
    }

    @ApiOperation(value = "이모픽 댓글 삭제", notes = "단일 댓글을 삭제한다")
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<CommonResponse> deleteEmopickComment(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long commentId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", emopickService.deleteEmopickComment(user.getId(), commentId)));
    }

    @ApiOperation(value = "이모픽 댓글 좋아요", notes = "이모픽 댓글에 좋아요 누른다")
    @PutMapping("/comment/like/{commentId}")
    public ResponseEntity<CommonResponse> toggleEmopickCommentLike(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                @PathVariable Long commentId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", emopickService.toggleBookCommentLike(user.getId(), commentId)));
    }


}

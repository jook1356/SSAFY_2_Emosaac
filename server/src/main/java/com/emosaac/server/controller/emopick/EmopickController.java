package com.emosaac.server.controller.emopick;

import com.emosaac.server.common.CommonResponse;
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
    public ResponseEntity<CommonResponse> findEmopickList() {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 조회 완료", null
        ));
    }

    @ApiOperation(value = "이모픽 상세 조회", notes = "이모픽을 상세 조회한다.")
    @GetMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> findEmopickDetail(@PathVariable Long emopickId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 조회 완료", emopickService.findEmopickDetail(emopickId)
//                HttpStatus.OK, "이모픽 조회 완료", emopickService.findEmopickDetailByWebtoon(emopickId)
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
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 수정 완료", null
        ));
    }

    @ApiOperation(value = "이모픽 삭제", notes = "유저가 이모픽을 삭제한다.")
    @DeleteMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> deleteEmopickByUser(@PathVariable Long emopickId,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "이모픽 삭제 완료", null
        ));
    }

    //////////////
    @ApiOperation(value = "이모픽 좋아요", notes = "유저가 이모픽을 좋아요 설정한다.")
    @PutMapping("/{emopickId}/like")
    public ResponseEntity<CommonResponse> updateLikeByUser(@PathVariable Long emopickId,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 좋아요 완료", null
        ));
    }

    /* 댓글 */

}

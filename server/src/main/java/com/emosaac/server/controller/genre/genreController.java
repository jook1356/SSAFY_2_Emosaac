package com.emosaac.server.controller.genre;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.genre.GenreService;
import com.emosaac.server.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@Api(tags = {"장르 컨트롤러"})
public class genreController {

    private final UserService userService;
    private final GenreService genreService;
//    @GetMapping("/webtoon")
//    @ApiOperation(value = "웹툰 장르 조회", notes = "웹툰 장르를 list로 반환")
//    public ResponseEntity<CommonResponse> getWebtoonGenre() {
//
//
//        return ResponseEntity.ok().body(CommonResponse.of(
//                HttpStatus.OK, "유저 정보 조회 성공", genreService.getWebtoonGenre());
//    }
//
//    @GetMapping("/novel")
//    @ApiOperation(value = "소설 장르 조회", notes = "소설 장르를 list로 반환.")
//    public ResponseEntity<CommonResponse> getNovelGenre() {
//
//
//        return ResponseEntity.ok().body(CommonResponse.of(
//                HttpStatus.OK, "유저 정보 조회 성공", userService.getUser(userPrincipal.getId())));
//    }

    @PutMapping
    @ApiOperation(value = "유저 정보 업데이트", notes = "유저 정보를 등록/수정 하고 유저 아이디 반환")
    public ResponseEntity<CommonResponse> updateUserInfo(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid UserRequest request) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "유저 정보 수정 성공", userService.updateUserInfo(userPrincipal.getId(), request)));
    }



}

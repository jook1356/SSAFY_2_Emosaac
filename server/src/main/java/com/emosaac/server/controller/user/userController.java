package com.emosaac.server.controller.user;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.config.s3.S3Uploader;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserRequestFile;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Api(tags = {"유저 컨트롤러"})
public class userController {

    private final UserService userService;
    private final S3Uploader s3Uploader;
    @GetMapping("/me")
    @ApiOperation(value = "로그인 유저 조회", notes = "현재 로그인한 유저 정보를 반환한다.")
    public ResponseEntity<CommonResponse> getCurrentUser(@ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 정보 조회 성공", userService.getUser(userPrincipal.getId())));
    }

    @PutMapping(value= "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "유저 정보 업데이트", notes = "유저 정보를 등록/수정 하고 유저 아이디 반환")
    public ResponseEntity<CommonResponse> updateUserInfo(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,@Valid UserRequestFile request) throws IOException {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "유저 정보 수정 성공", userService.updateUserInfo(userPrincipal.getId(), filetoString(request))));
    }

    private UserRequest filetoString(UserRequestFile request) throws IOException {
        String imgUrl= "";
        System.out.println("request.getFile() "+ request.getFile().getOriginalFilename());
        if (request.getFile().getOriginalFilename().length()!=0 || !request.getFile().isEmpty()) {
            imgUrl = s3Uploader.upload(request.getFile(), "static/user");
        }
        UserRequest userRequest = UserRequest.from(request, imgUrl);
        return userRequest;
    }

    @GetMapping("/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "닉네임이 중복이면 true를 반환")
    public ResponseEntity<CommonResponse> nickNameCheck(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable String nickName) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "닉네임이 중복인가(중복이면 true)", userService.nickNameCheck(nickName)));
    }

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "조회하고자 하는 유저의 정보를 반환한다.")
    public ResponseEntity<CommonResponse> getUser(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 조회 성공", userService.getUser(userId)));
    }


    @GetMapping("/{userId}/webtoon/genres")
    @ApiOperation(value = "나의 웹툰 선호 장르 보여주기", notes = "웹툰 선호 리스트반환")
    public ResponseEntity<CommonResponse> getUserWebtoonGerne(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 웹툰 선호 장르 조회 성공", userService.getUserWebtoonGerne(userId)));
    }

    @GetMapping("/{userId}/novel/genres")
    @ApiOperation(value = "나의 소설 선호 장르 보여주기", notes = "소설 선호 리스트 반환")
    public ResponseEntity<CommonResponse> getUserNovelGerne(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 소설 선호 장르 조회 성공", userService.getUserNovelGerne(userId)));
    }

    @PutMapping("/webtoon/genres")
    @ApiOperation(value = "나의 웹툰 선호 장르 수정", notes = "나의 웹툰 선호 장르 수정하고 웹툰 선호 리스트 반환")
    public ResponseEntity<CommonResponse> updateUserNovelGenre(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid UserGenreRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "나의 웹툰 선호 장르 수정 성공", userService.updateUserWebtoonGenre(userPrincipal.getId(), request)));

    }

    @PutMapping("/novel/genres")
    @ApiOperation(value = "나의 소설 선호 장르 수정", notes = "나의 소설 선호 장르 수정하고 소설 선호 리스트 반환")
    public ResponseEntity<CommonResponse> updateUserWebtoonGenre(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid UserGenreRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "나의 소설 선호 장르 수정 성공", userService.updateUserNovelGenre(userPrincipal.getId(), request)));
    }



    



}

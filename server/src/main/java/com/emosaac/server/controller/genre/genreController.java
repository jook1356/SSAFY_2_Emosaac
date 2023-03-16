package com.emosaac.server.controller.genre;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.genre.BookRequest;
import com.emosaac.server.dto.genre.UserResearchRequest;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.genre.GenreService;
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

    private final GenreService genreService;

    ////<---장르 조회
    @GetMapping()
    @ApiOperation(value = "장르 조회", notes = "장르를 list로 반환 / typeCode:0이면 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getBookGenre(@RequestParam(value = "typeCode") Long typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르 조회 성공", genreService.getBookGenre(typeCode)));
    }

    ////--->

    ////<----설문조사
    @GetMapping("/research")
    @ApiOperation(value = "설문조사 조회", notes = "설문조사 북 리스트를 반환 / typeCode:0이면 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getResearch(@RequestParam(value = "typeCode") Long typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "설문조사 조회 성공", genreService.getResearch(typeCode)));
    }

    ///////

    @PostMapping("/research/webtoon")
    @ApiOperation(value = "설문조사 수행", notes = "선호 장르 리스트를 반환")
    public ResponseEntity<CommonResponse> postResearch(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                       @RequestBody @Valid UserResearchRequest request,
                                                       @RequestParam(value = "typeCode") Long typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "설문조사 성공", genreService.postResearch(userPrincipal.getId(), request, typeCode)));
    }


    ////---->

    //<-----장르별 추천

    @GetMapping("/books")
    @ApiOperation(value = "장르별 책 추천", notes = "장르별 북 리스트를 반환")
    public ResponseEntity<CommonResponse> getBookByGenre(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                         @RequestParam(value = "genreId")
                                                         Long genreId,
                                                         @RequestParam(value = "typeCode")
                                                         int typeCd,
                                                         @RequestParam(required = false, defaultValue = "")
                                                         String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10")
                                                         int size,
                                                         @RequestParam(value = "prevId", required = false, defaultValue = "20493")
                                                         Long prevId,
                                                         @RequestParam(value = "prevScore", required = false, defaultValue = "10")
                                                         Double prevScore) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 추천 조회 성공", genreService.getBookByGenre(userPrincipal.getId(), BookRequest.of(typeCd, criteria, size, prevId, prevScore, genreId))));
    }


    ///----->
}

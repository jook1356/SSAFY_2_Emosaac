package com.emosaac.server.controller.webtoon;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.webtoon.WebtoonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webtoons")
@Api(tags = {"웹툰 컨트롤러"})
public class WebtoonController {
    @Autowired
    WebtoonService webtoonService;

    @ApiOperation(value = "요일별 리스트", notes = "요일별 웹툰 리스트를 조회한다.")
    @GetMapping("/day/{day}")
    public ResponseEntity<CommonResponse> findDayList(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                      @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "요일별 리스트 조회 성공", webtoonService.findDayList(size, criteria, id)
        ));
    }

    @ApiOperation(value = "장르별 리스트", notes = "장르별 웹툰 리스트를 조회한다.")
    @GetMapping("/genre/{genreId}")
    public ResponseEntity<CommonResponse> findGenreList(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                        @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 리스트 조회 성공", webtoonService.findGenreList(size, criteria, id)
        ));
    }

    @ApiOperation(value = "작품 디테일", notes = "작품의 상세정보를 조회한다.")
    @GetMapping("/{webtoonId}")
    public ResponseEntity<CommonResponse> findDetailByWebtoon(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                            @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "작품 디테일 조회 성공", webtoonService.findDetailByWebtoon(size, criteria, id)
        ));
    }

    @ApiOperation(value = "북마크", notes = "작품의 북마크를 설정한다.")
    @PutMapping("/bookmark/{webtoonId}")
    public ResponseEntity<CommonResponse> setBookmarkByWebtoon(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                             @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                             @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "북마크 수정 성공", webtoonService.setBookmarkByWebtoon(size, criteria, id)
        ));
    }

    @ApiOperation(value = "읽음 유무", notes = "작품의 읽음 여부를 설정한다.")
    @PutMapping("/{webtoonId}")
    public ResponseEntity<CommonResponse> setReadByWebtoon(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                         @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "읽음 유무 설정 성공", webtoonService.setReadByWebtoon(size, criteria, id)
        ));
    }

    @ApiOperation(value = "평점 조회", notes = "사용자가 설정한 평점을 조회한다.")
    @GetMapping("/score/{webtoonId}")
    public ResponseEntity<CommonResponse> findScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                          @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                          @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "평점 조회 성공", webtoonService.findScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 등록", notes = "사용자가 설정한 평점을 등록한다.")
    @PostMapping("/score/{webtoonId}")
    public ResponseEntity<CommonResponse> setScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                         @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                         @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 등록 성공", webtoonService.setScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 수정", notes = "사용자가 설정한 평점을 수정한다.")
    @PutMapping("/score/{webtoonId}")
    public ResponseEntity<CommonResponse> updateScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                            @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                            @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 수정 성공", webtoonService.updateScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 삭제", notes = "사용자가 설정한 평점을 삭제한다.")
    @DeleteMapping("/score/{webtoonId}")
    public ResponseEntity<CommonResponse> deleteScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                            @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                            @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "평점 삭제 성공", webtoonService.deleteScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "같은 작가 다른 작품", notes = "같은 작가 다른 작품을 조회한다.")
    @GetMapping("/author/{webtoonId}")
    public ResponseEntity<CommonResponse> findListByAuthor(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "같은 작가 다른 작품 조회 성공", webtoonService.findListByAuthor(size, criteria, id)
        ));
    }

    @ApiOperation(value = "유사한 작품", notes = "유사한 작품들을 조회한다.")
    @GetMapping("/recommand/{webtoonId}")
    public ResponseEntity<CommonResponse> findListByItem(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                         @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유사한 작품 조회 성공", webtoonService.findListByItem(size, criteria, id)
        ));
    }

}

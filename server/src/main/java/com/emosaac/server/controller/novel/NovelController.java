package com.emosaac.server.controller.novel;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.novel.NovelService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/novels")
@Api(tags = {"소설 컨트롤러"})
public class NovelController {
    @Autowired
    NovelService novelService;

    @ApiOperation(value = "요일별 리스트", notes = "요일별 소설 리스트를 조회한다.")
    @GetMapping("/day/{dayCode}")
    public ResponseEntity<CommonResponse> findDayList(@PathVariable Long dayCode,
                                                      @RequestParam(required=false, defaultValue = "date") String criteria,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                      @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "요일별 리스트 조회 성공", novelService.findDayList(size, criteria, id)
        ));
    }

    @ApiOperation(value = "장르별 리스트", notes = "장르별 소설 리스트를 조회한다.")
    @GetMapping("/genre/{genreCode}")
    public ResponseEntity<CommonResponse> findGenreList(@PathVariable Long genreCode,
                                                        @RequestParam(required=false, defaultValue = "date") String criteria,
                                                        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                        @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 리스트 조회 성공", novelService.findGenreList(size, criteria, id)
        ));
    }

    @ApiOperation(value = "작품 디테일", notes = "작품의 상세정보를 조회한다.")
    @GetMapping("/{novelId}")
    public ResponseEntity<CommonResponse> findDetailByNovel(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                              @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "작품 디테일 조회 성공", novelService.findDetailByNovel(size, criteria, id)
        ));
    }

    @ApiOperation(value = "북마크", notes = "작품의 북마크를 설정한다.")
    @PutMapping("/bookmark/{novelId}")
    public ResponseEntity<CommonResponse> setBookmarkByNovel(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                               @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                               @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "북마크 수정 성공", novelService.setBookmarkByNovel(size, criteria, id)
        ));
    }

    @ApiOperation(value = "읽음 유무", notes = "작품의 읽음 여부를 설정한다.")
    @PutMapping("/{novelId}")
    public ResponseEntity<CommonResponse> setReadByNovel(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "읽음 유무 설정 성공", novelService.setReadByNovel(size, criteria, id)
        ));
    }

    @ApiOperation(value = "평점 조회", notes = "사용자가 설정한 평점을 조회한다.")
    @GetMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> findScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                          @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                          @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "평점 조회 성공", novelService.findScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 등록", notes = "사용자가 설정한 평점을 등록한다.")
    @PostMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> setScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                         @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                         @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 등록 성공", novelService.setScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 수정", notes = "사용자가 설정한 평점을 수정한다.")
    @PutMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> updateScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                            @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                            @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 수정 성공", novelService.updateScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "평점 삭제", notes = "사용자가 설정한 평점을 삭제한다.")
    @DeleteMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> deleteScoreByUser(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                            @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                            @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "평점 삭제 성공", novelService.deleteScoreByUser(size, criteria, id, user.getId())
        ));
    }

    @ApiOperation(value = "같은 작가 다른 작품", notes = "같은 작가 다른 작품을 조회한다.")
    @GetMapping("/author/{novelId}")
    public ResponseEntity<CommonResponse> findListByAuthor(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "같은 작가 다른 작품 조회 성공", novelService.findListByAuthor(size, criteria, id)
        ));
    }

    @ApiOperation(value = "유사한 작품", notes = "유사한 작품들을 조회한다.")
    @GetMapping("/recommand/{novelId}")
    public ResponseEntity<CommonResponse> findListByItem(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                         @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                         @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유사한 작품 조회 성공", novelService.findListByItem(size, criteria, id)
        ));
    }
}

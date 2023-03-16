package com.emosaac.server.controller.novel;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.book.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/novels")
@Api(tags = {"소설 컨트롤러"})
public class NovelController {

    @Autowired
    BookService bookService;


    @ApiOperation(value = "요일별 리스트", notes = "요일별 소설 리스트를 조회한다.")
    @GetMapping("/day/{day}")
    public ResponseEntity<CommonResponse> findDayList(@PathVariable String day,
                                                      @RequestParam(required=false, defaultValue = "date") String criteria,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                      @RequestParam(value = "prevId", required = false, defaultValue = "20493")Long prevId,
                                                      @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "요일별 리스트 조회 성공", bookService.findDayList(day, size, criteria, prevId, prevScore, 1)
        ));
    }

    @ApiOperation(value = "장르별 리스트", notes = "장르별 소설 리스트를 조회한다.")
    @GetMapping("/genre/{genreCode}")
    public ResponseEntity<CommonResponse> findGenreList(@PathVariable Long genreCode,
                                                        @RequestParam(required=false, defaultValue = "date") String criteria,
                                                        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                        @RequestParam(value = "prevId", required = false, defaultValue = "1")Long prevId) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 리스트 조회 성공", bookService.findGenreList(genreCode, size, criteria, prevId, 1)
        ));
    }

    @ApiOperation(value = "작품 디테일", notes = "작품의 상세정보를 조회한다.")
    @GetMapping("/{bookId}")
    public ResponseEntity<CommonResponse> findDetailByNovel(@PathVariable Long bookId,
                                                            @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "작품 디테일 조회 성공", bookService.findDetailByBook(bookId, userPrincipal.getId(), 1)
        ));
    }

    /*toggle*/

    @ApiOperation(value = "북마크", notes = "작품의 북마크를 설정한다.")
    @PutMapping("/bookmark/{novelId}")
    public ResponseEntity<CommonResponse> setBookmarkByNovel(@PathVariable Long novelId,
                                                             @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "북마크 수정 성공", bookService.toggleBookmarkByBook(novelId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "읽음 유무", notes = "작품의 읽음 여부를 설정한다.")
    @PutMapping("/read-check/{novelId}")
    public ResponseEntity<CommonResponse> setReadByNovel(@PathVariable Long novelId,
                                                         @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "읽음 유무 설정 성공", bookService.toggleReadByBook(novelId, userPrincipal.getId())
        ));
    }

    /* 평점 */

    @ApiOperation(value = "평점 조회", notes = "사용자가 설정한 평점을 조회한다.")
    @GetMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> findScoreByUser(@PathVariable Long novelId,
                                                          @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "평점 조회 성공", bookService.findScoreByUser(novelId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "평점 수정", notes = "사용자가 설정한 평점을 수정한다.")
    @PutMapping("/score/{novelId}")
    public ResponseEntity<CommonResponse> updateScoreByUser(@PathVariable Long novelId,
                                                            @ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                            @RequestParam(value = "score", defaultValue = "0")Double score) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 수정 성공", bookService.updateScoreByUser(novelId, userPrincipal.getId(), score)
        ));
    }

    ////////////////////

    @ApiOperation(value = "같은 작가 다른 작품", notes = "같은 작가 다른 작품을 조회한다.")
    @GetMapping("/author/{novelId}")
    public ResponseEntity<CommonResponse> findListByAuthor(@PathVariable Long novelId) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "같은 작가 다른 작품 조회 성공", bookService.findListByAuthor(novelId, 1)
        ));
    }

    @ApiOperation(value = "유사한 작품", notes = "유사한 작품들을 조회한다.")
    @GetMapping("/recommand/{novelId}")
    public ResponseEntity<CommonResponse> findListByItem(@PathVariable Long novelId) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유사한 작품 조회 성공", bookService.findListByItem(novelId)
        ));
    }
}

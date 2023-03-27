package com.emosaac.server.controller.recommand;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.recommand.RecommandService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/recommand")
@Api(tags = {"추천 컨트롤러"})
public class RecommandController {
    @Autowired
    RecommandService recommandService;

    @ApiOperation(value = "인기작 top 30", notes = "소설 인기작 top 30 리스트를 조회한다.")
    @GetMapping("/best30")
    public ResponseEntity<CommonResponse> findBestList(@RequestParam(value = "size", required = false, defaultValue = "10")
                                                       int size,
                                                       @RequestParam(value = "prevId", required = false, defaultValue = "20000")
                                                       Long prevId,
                                                       @RequestParam(value = "prevScore", required = false, defaultValue = "10")
                                                       Double prevScore,
                                                       @RequestParam(value = "hit", required = false, defaultValue = "1000")
                                                       Integer hit,
                                                       @RequestParam(value = "typeCd", required = true)
                                                       int typeCd) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "인기작 top 30 조회 성공", recommandService.findBestList(size, prevId, prevScore, hit, typeCd)
        ));
    }

    @ApiOperation(value = "올해의 신작", notes = "올해의 신작(n개?)을 조회한다.")
    @GetMapping("/newbook")
    public ResponseEntity<CommonResponse> findNewBookList(@RequestParam(value = "size", required = false, defaultValue = "10")
                                                          int size,
                                                          @RequestParam(value = "prevId", required = false, defaultValue = "20000")
                                                          Long prevId,
                                                          @RequestParam(value = "prevRegist", required = false, defaultValue = "2023.03.20")
                                                          String prevRegist,
                                                          @RequestParam(value = "typeCd", required = true)
                                                          int typeCd){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "올해의 신작 조회 성공", recommandService.findNewBookList(size, prevId,prevRegist, typeCd))
        );
    }

    @ApiOperation(value = "md 추천작", notes = "사이트 내 md의 추전작을 조회한다.")
    @GetMapping("/md")
    public ResponseEntity<CommonResponse> findMdList(@RequestParam (value = "typeCode") int typeCd) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "md 추천작 조회 성공", recommandService.findMdList(typeCd))
        );
    }

    @ApiOperation(value = "최근 읽은 작품과 비슷한 작품 추천", notes = "사용자가 최근 읽은 작품과 유사한 작품들을 추천한다.")
    @GetMapping("/item")
    public ResponseEntity<CommonResponse> findItemList(@RequestParam (value = "typeCode") int typeCd,
                                                       @RequestParam(required=false, defaultValue = "date") String criteria,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                       @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                       @ApiIgnore @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "최근 읽은 작품과 비슷한 작품 조회 성공", recommandService.findItemList(typeCd, size, criteria, id, user.getId()))
        );
    }

    @ApiOperation(value = "예측 점수가 높은 작품 추천", notes = "나와 비슷한 작품을 읽은 다른 사용자의 평점을 활용해 나의 평점을 예측, 높은 평점 작품을 추천한다.")
    @GetMapping("/prediction")
    public ResponseEntity<CommonResponse> findPredictiList(@RequestParam (value = "typeCode") int typeCd,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                           @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore,
                                                           @ApiIgnore @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "예측 점수가 높은 작품 조회 성공", recommandService.findPredictList(typeCd, size, prevScore, prevId, user.getId()))
        );
    }

    @ApiOperation(value = "성별/연령대 추천", notes = "나와 유사한 사용자를 활용해 관심있을 작품을 추천한다.")
    @GetMapping("/user")
    public ResponseEntity<CommonResponse> findUserList(@RequestParam (value = "typeCode") int typeCd,
                                                       @RequestParam(required=false, defaultValue = "date") String criteria,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                       @RequestParam(value = "id", required = false, defaultValue = "1")Long id,
                                                       @ApiIgnore @CurrentUser UserPrincipal user) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "성별/연령대 추천 조회 성공", recommandService.findUserList(typeCd, size, criteria, id, user.getId()))
        );
    }
}

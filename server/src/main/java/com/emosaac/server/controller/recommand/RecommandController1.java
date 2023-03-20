package com.emosaac.server.controller.recommand;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.service.recommand.RecommandService1;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommand1")
@Api(tags = {"추천 컨트롤러1"})
public class RecommandController1 {
    @Autowired
    RecommandService1 recommandService1;

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
                HttpStatus.OK, "인기작 top 30 조회 성공", recommandService1.findBestList(size, prevId, prevScore, hit, typeCd)
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
                HttpStatus.OK, "올해의 신작 조회 성공", recommandService1.findNewBookList(size, prevId,prevRegist, typeCd))
        );
    }



  }

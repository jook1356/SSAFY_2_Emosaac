package com.emosaac.server.controller.recommand;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.recommand.RecommandService1;
import com.emosaac.server.service.recommand.WebtoonRecommandService;
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
@RequestMapping("/api/recommand/webtoon1")
@Api(tags = {"웹툰 추천 컨트롤러1"})
public class WebtoonRecommandController1 {
    @Autowired
    RecommandService1 recommandService1;

    @ApiOperation(value = "인기작 top 30", notes = "웹툰 인기작 top 30 리스트를 조회한다.")
    @GetMapping("/best30")
    public ResponseEntity<CommonResponse> findBestList(@RequestParam(value = "size", required = false, defaultValue = "10")
                                                       int size,
                                                       @RequestParam(value = "prevId", required = false, defaultValue = "20000")
                                                       Long prevId,
                                                       @RequestParam(value = "prevScore", required = false, defaultValue = "10")
                                                       Double prevScore) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "인기작 top 30 조회 성공", recommandService1.findBestWebtoonList(size, prevId, prevScore)
        ));
    }

}

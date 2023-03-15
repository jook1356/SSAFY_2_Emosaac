package com.emosaac.server.controller.search;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.service.search.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@Api(tags = {"검색 컨트롤러"})
public class SearchController {
    @Autowired
    private SearchService searchService;

    @ApiOperation(value = "전체 태그 이름별 리스트 조회", notes = "태그 이름별로,정렬 기준(view/date/like)으로 게시물 목록을 조회한다.")
    @GetMapping("tag/{tagName}")
    public ResponseEntity<CommonResponse> findByTagNamePostList(@PathVariable String tagName){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그 이름별 게시물 목록 조회 성공", searchService.findBookListByTagName(tagName))
        );
    }
//    @ApiOperation(value = "전체 제목/작가 리스트 조회", notes = "제목/작가 이름별로,정렬 기준(view/date/like)으로 게시물 목록을 조회한다.")
//    @GetMapping("tag/{content}")
//    public ResponseEntity<CommonResponse> findByTitlePostList(@PathVariable String content){
//        return ResponseEntity.ok().body(CommonResponse.of(
//                HttpStatus.OK, "제목작가별 게시물 목록 조회 성공", searchService.findBookListByTitle(content))
//        );
//    }
}

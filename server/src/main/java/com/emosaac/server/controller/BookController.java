package com.emosaac.server.controller;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.service.TestBookService;
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
@RequestMapping("/api/books")
@Api(tags = {"북 컨트롤러"})
public class BookController {

    @Autowired
    TestBookService bookService;

    @ApiOperation(value = "내가 쓴 게시물 리스트 조회", notes = "내가 쓴 게시물 목록을 조회한다.(최근날짜순)")
    @GetMapping("/users")
    public ResponseEntity<CommonResponse> findPostListByMy(@RequestParam(required=false, defaultValue = "date") String criteria,
                                                           @RequestParam(required=false, defaultValue = "1") int offset,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                                   @RequestParam(value = "id", required = false, defaultValue = "1")Long id) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 게시물 목록 조회 성공", bookService.findPostListByUser(offset, size, criteria, id))
        );
    }
}

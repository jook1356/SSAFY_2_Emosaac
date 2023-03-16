package com.emosaac.server.config.s3;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/s3")
@Api(tags = {"s3 컨트롤러"})

public class S3Controller {

    private final S3Uploader s3Uploader;

    @ApiOperation(value = "프로필 이미지 업로드", notes = "파일을 업로드하고 주소를 반환한다.")
    @PostMapping("/users")
    public String uploadProfileFile(@RequestParam("file") MultipartFile multipartFile) throws IOException{
        return s3Uploader.upload(multipartFile, "static/user");
    }

}

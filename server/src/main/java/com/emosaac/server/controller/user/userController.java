package com.emosaac.server.controller.user;


import com.emosaac.server.common.CommonResponse;
//import com.emosaac.server.security_old.UserPrincipal;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Api(tags = {"유저 컨트롤러"})
public class userController {

    private final UserService userService;
    @GetMapping("/me")
    @ApiOperation(value = "로그인 유저 조회", notes = "현재 로그인한 유저 정보를 반환한다.")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CommonResponse> getCurrentUser(@ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 정보 조회 성공", userService.getCurrentUser(userPrincipal.getId())));
    }
}

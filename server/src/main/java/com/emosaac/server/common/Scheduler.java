package com.emosaac.server.common;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.TotalResponse;
import com.emosaac.server.dto.recommand.UserBaseCfDto;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.genre.GenreService;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    RestTemplate restTemplate = new RestTemplate();

//    @Scheduled(cron = "0 0 0 * * *")  //매일 정각에
    @Scheduled(cron = "0 0/5 * * * ? ")  //5분마다
//    @Scheduled(cron = "0/1 * * * * ?")
    @Transactional
    public void getTotalGenre() { //스케줄러 처리 필요

        String url = "http://j8d203.p.ssafy.io:8000/recommand/";


//        UserBaseCfDto userBaseCfDto = restTemplate.getForObject(url + "genre", UserBaseCfDto.class);
        UserBaseCfDto userPredictfDto = restTemplate.getForObject(url + "predict", UserBaseCfDto.class);
//        System.out.println(userBaseCfDto);
        System.out.println(userPredictfDto);
    }
}

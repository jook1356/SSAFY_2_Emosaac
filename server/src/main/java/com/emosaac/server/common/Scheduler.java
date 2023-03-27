package com.emosaac.server.common;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.TotalResponse;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.genre.GenreService;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    private final GenreService genreService;
    private final UserRepository userRepository;


//    @Scheduled(cron = "0/1 * * * * ?")

    @Scheduled(cron = "0 0 0 * * *")  //매일 정각에
    @Transactional
    public void getTotalGenre() { //스케줄러 처리 필요

        List<User> list = userRepository.findAllUser();
        for (User user : list) {
            Long userId = user.getUserId();

            List<TotalResponse> listWebtoon = genreService.getTotalGenreCount(userId, 0);
            List<TotalResponse> listNovel = genreService.getTotalGenreCount(userId, 1);

            List<Long> tmpWebtoonList = genreService.calcMinOrMax(listWebtoon); //2
            List<Long> tmpNovelList = genreService.calcMinOrMax(listNovel); //2

            System.out.println(tmpWebtoonList);
            genreService.setFavoriteGenre(tmpWebtoonList, 0, userId); //유저에 반영
            genreService.setFavoriteGenre(tmpNovelList, 1, userId); //유저에 반영
        }
    }
}

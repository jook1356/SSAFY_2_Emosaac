package com.emosaac.server.service.novel;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NovelService {
    public Object findDayList(int size, String criteria, Long id) {
        return null;
    }

    public Object findGenreList(int size, String criteria, Long id) {
        return null;
    }

    public Object findDetailByNovel(int size, String criteria, Long id) {
        return null;
    }

    public Object setBookmarkByNovel(int size, String criteria, Long id) {
        return null;
    }

    public Object setReadByNovel(int size, String criteria, Long id) {
        return null;
    }

    public Object findScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object setScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object updateScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object deleteScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findListByAuthor(int size, String criteria, Long id) {
        return null;
    }

    public Object findListByItem(int size, String criteria, Long id) {
        return null;
    }
}

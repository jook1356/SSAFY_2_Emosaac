package com.emosaac.server.service.recommand;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NovelRecommandService {

    public Object findBestList(int size, String criteria, Long id) {
        return null;
    }

    public Object findNewBookList(int size, String criteria, Long id) {
        return null;
    }

    public Object findMdList(int size, String criteria, Long id) {
        return null;
    }

    public Object findItemList(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findPredictiList(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findUserList(int size, String criteria, Long id, Long userId) {
        return null;
    }
}

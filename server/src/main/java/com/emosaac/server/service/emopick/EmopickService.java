package com.emosaac.server.service.emopick;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.emopick.EmopickRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmopickService {

    private final EmopickRepository emopickRepository;
    private final BookQueryRepository bookQueryRepository;
    private final CommonService commonService;

    @Transactional
    public Long createEmopickByUser(EmopickSaveRequest request, Long userId) {
        User user = commonService.getUser(userId);
        Emopick emopick = emopickRepository.save(request.of(user));

        if(!request.getEmopickList().isEmpty()){
            int idx = 0;
            for(Entry<Integer, String> emo : request.getEmopickList().entrySet()){
                Map<Integer, String> item = new HashMap<>();
                item.put(emo.getKey(), emo.getValue());
                emopick.addEmopick(idx, item);
                idx++;
            }
        }
//
        return emopick.getEmopickId();

//        System.out.println(request.getEmopickList().toString());

//        return null;
    }

}

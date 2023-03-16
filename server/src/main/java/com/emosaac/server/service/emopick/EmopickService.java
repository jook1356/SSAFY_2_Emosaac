package com.emosaac.server.service.emopick;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookDetailResponse;
import com.emosaac.server.dto.emopick.BookReveiwResponse;
import com.emosaac.server.dto.emopick.EmopickDetailResponse;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.emopick.EmopickRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
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

    // 이모픽 리스트 조회

    // 이모픽 상세 조회
    public EmopickDetailResponse findEmopickDetail(Long emopickId){
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        EmopickDetailResponse result = new EmopickDetailResponse(emopick.getUser(), emopick.getTitle(), emopick.getContent());

        String[] bookId = emopick.getBookSeq().split("_");

        LinkedHashMap<Long, BookReveiwResponse> map = new LinkedHashMap<>();

        for(int i=0; i<bookId.length; i++){
            Book book = commonService.getBook(Long.valueOf(bookId[i]));

            BookReveiwResponse bookReveiwResponse = new BookReveiwResponse(book, emopick.getEmopickList().get(book.getBookId()));

            if(book.getType() == 0) { // 웹툰
//                result.addWebtoon(book.getBookId(), bookReveiwResponse);
                map.put(book.getBookId(), bookReveiwResponse);
            }else{
                result.addNovel(book.getBookId(), bookReveiwResponse);
            }
        }

        for(Entry<Long, BookReveiwResponse> temp : map.entrySet()){
            System.out.println(temp.getKey() + " " + temp.getValue());
        }

        result.addWebtoon(map);

        return result;
    }

    // 이모픽 등록
    @Transactional
    public Long createEmopickByUser(EmopickSaveRequest request, Long userId) {
        User user = commonService.getUser(userId);
        Emopick emopick = emopickRepository.save(request.of(user));

        String bookIdStr = "";

        if(!request.getEmopickList().isEmpty()){
            for(Entry<Long, String> emo : request.getEmopickList().entrySet()){
                emopick.addEmopick(emo.getKey(), emo.getValue());
                bookIdStr += emo.getKey().toString() + "_";
            }
        }

        emopick.setBookSeq(bookIdStr);

        return emopick.getEmopickId();
    }

    // 이모픽 수정

    // 이모픽 삭제


}

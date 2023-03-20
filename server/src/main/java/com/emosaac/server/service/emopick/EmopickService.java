package com.emosaac.server.service.emopick;

import com.emosaac.server.common.PagedResponse;
import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.emo.LikeEmo;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookDetailResponse;
import com.emosaac.server.dto.emopick.*;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.emopick.EmoLikeRepository;
import com.emosaac.server.repository.emopick.EmopickQueryRepository;
import com.emosaac.server.repository.emopick.EmopickRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import static com.emosaac.server.domain.emo.QEmopick.emopick;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmopickService {

    private final EmopickRepository emopickRepository;
    private final EmopickQueryRepository emopickQueryRepository;
    private final EmoLikeRepository emoLikeRepository;
    private final CommonService commonService;

    // 이모픽 리스트 조회
    public SlicedResponse<EmopickListResponse> findEmopickList(int size, Long prevId){
//    public PagedResponse<EmopickListResponse> findEmopickList(int offset, int size){
//
//        Page<EmopickListResponse> page = emopickQueryRepository.findEmopickList(PageRequest.of(offset - 1, size));
//        return new PagedResponse<>()(page.getContent(), page.getNumber()+1, page.getSize(), page.getTotalElements(), page.getTotalPages(), page.isLast());

        Slice<EmopickListResponse> page = emopickQueryRepository.findEmopickList(PageRequest.ofSize(size), prevId);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());

    }

    // 이모픽 상세 조회
    public DetailResponse<BookReveiwResponse> findEmopickDetail(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        List<BookReveiwResponse> webtoon = new ArrayList<>();
        List<BookReveiwResponse> novel = new ArrayList<>();

        if (emopick.getWebtoonSeq() != "") {
            String[] webtoonId = emopick.getWebtoonSeq().split("_");
            webtoon = getList(emopick, webtoonId);
        }

        if (emopick.getWebtoonSeq() != "") {
            String[] novelId = emopick.getNovelSeq().split("_");
            novel = getList(emopick, novelId);
        }

        Boolean emoLikeStatus = false;
        if(emoLikeRepository.existsByEmopickIdAndUserId(emopickId, userId).isPresent())
            emoLikeStatus = true;
        
        DetailResponse result = new DetailResponse(emopick.getUser(), emopick.getTitle(), emopick.getContent(), webtoon, novel, emoLikeStatus);

        return result;
    }

    // 이모픽 등록
    @Transactional
    public Long createEmopickByUser(EmopickSaveRequest request, Long userId) {
        User user = commonService.getUser(userId);
        Emopick emopick = emopickRepository.save(request.of(user));

        String webtoonIdStr = "";
        String novelIdStr = "";

        // 웹툰 리스트
        if (request.getWebtoonList() != null || !request.getWebtoonList().isEmpty())
            webtoonIdStr = setIdStr(emopick, request.getWebtoonList());

        // 노블 리스트
        if (request.getNovelList() != null || !request.getNovelList().isEmpty())
            novelIdStr = setIdStr(emopick, request.getNovelList());

        emopick.setSeq(webtoonIdStr, novelIdStr);

        return emopick.getEmopickId();
    }

    private String setIdStr(Emopick emopick, Map<Long, String> bookList){
        String result = "";

        for (Entry<Long, String> emo : bookList.entrySet()) {
            emopick.addEmopick(emo.getKey(), emo.getValue());
            result += emo.getKey().toString() + "_";
        }

        return result;
    }

    // 이모픽 수정
    @Transactional
    public Long updateEmopickByUser(Long emopickId, EmopickSaveRequest request, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        validEmopickUser(userId, emopick.getUser().getUserId());

        emopick.update(request);

        String webtoonIdStr = "";
        String novelIdStr = "";

        // 웹툰 리스트
        if (request.getWebtoonList() != null || !request.getWebtoonList().isEmpty())
            webtoonIdStr = setIdStr(emopick, request.getWebtoonList());

        // 노블 리스트
        if (request.getNovelList() != null || !request.getNovelList().isEmpty())
            novelIdStr = setIdStr(emopick, request.getNovelList());

        emopick.setSeq(webtoonIdStr, novelIdStr);

        return emopick.getEmopickId();
    }

    // 이모픽 삭제
    @Transactional
    public Long deleteEmopickByUser(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        validEmopickUser(userId, emopick.getUser().getUserId());

        emopick.clearUser();

        emopickRepository.deleteById(emopickId);
        return emopickId;
    }

    // 이모픽 좋아요
    @Transactional
    public Object toggleLikesByEmopick(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));
        User user = commonService.getUser(userId);

        LikeEmo likeEmo = LikeEmo.builder().emopick(emopick).user(user).build();
        return emopick.toggleLikes(likeEmo);
    }

    ///////////////////////
    private List<BookReveiwResponse> getList(Emopick emopick, String[] bookId) {
        List<BookReveiwResponse> result = new ArrayList<>();

        for (String id : bookId) {
            if (id.equals("")) break;
            Book book = commonService.getBook(Long.valueOf(id));

            BookReveiwResponse bookReveiwResponse = new BookReveiwResponse(book, emopick.getEmopickList().get(book.getBookId()));

            result.add(bookReveiwResponse);
        }

        return result;
    }

    public void validEmopickUser(Long currentUser, Long emopickUser) {

        if (currentUser == emopickUser || currentUser.equals(emopickUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }

}

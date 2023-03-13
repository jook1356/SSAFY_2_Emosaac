package com.emosaac.server.service;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.BookResponse;
import com.emosaac.server.dto.QBookResponse;
import com.emosaac.server.repository.BookQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookQueryRepository bookQueryRepository;


    public SlicedResponse<BookResponse> findPostListByUser(int offset, int size, String criteria, Long id) {//내가 쓴 글 조회/오프셋
//        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Slice<BookResponse> page =  bookQueryRepository.findPostListByUser(criteria, PageRequest.of(offset - 1, size), id);

//        List<BookResponse> responses = page.stream().map((post)-> new BookResponse(post)).collect(Collectors.toList());
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

}

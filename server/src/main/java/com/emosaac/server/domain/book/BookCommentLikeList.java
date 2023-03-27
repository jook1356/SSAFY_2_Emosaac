package com.emosaac.server.domain.book;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.emo.EmoCommentLike;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Embeddable
public class BookCommentLikeList {

    @OneToMany(mappedBy = "bookComment", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<BookCommentLike> bookCommentLikeList = new ArrayList<>();

    public int size(){
        return bookCommentLikeList.size();
    }

    public boolean toggleBookCommentLike(BookCommentLike bookCommentLike){
        if(contains(bookCommentLike.getUser().getUserId())){
            removeBookCommentLike(bookCommentLike);
            return false;
        }
        bookCommentLikeList.add(bookCommentLike);
        return true;
    }

    public boolean contains(Long userId){
        return bookCommentLikeList.parallelStream()
                .anyMatch(l -> l.ownedBy(userId));
    }

    private void removeBookCommentLike(BookCommentLike bookCommentLike) {
        Long userId = bookCommentLike.getUser().getUserId();
        BookCommentLike removalTarget = bookCommentLikeList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny()
                .orElseThrow(()-> new ResourceNotFoundException("이미 좋아요를 해제했습니다"));
        bookCommentLikeList.remove(removalTarget);
    }


    public void clear() {
        bookCommentLikeList.clear();
    }


}

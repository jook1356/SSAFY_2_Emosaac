package com.emosaac.server.domain.emo;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.BookCommentLike;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Embeddable
public class EmoCommentLikeList {

    @OneToMany(mappedBy = "emopickComment", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<EmoCommentLike> emoCommentLikeList = new ArrayList<>();

    public int size(){
        return emoCommentLikeList.size();
    }


    public boolean toggleEmopickCommentLike(EmoCommentLike emoCommentLike){
        if(contains(emoCommentLike.getUser().getUserId())){
            removeEmoCommentLike(emoCommentLike);
            return false;
        }
        emoCommentLikeList.add(emoCommentLike);
        return true;
    }

    public boolean contains(Long userId){
        return emoCommentLikeList.parallelStream()
                .anyMatch(l -> l.ownedBy(userId));
    }

    private void removeEmoCommentLike(EmoCommentLike emoCommentLike) {
        Long userId = emoCommentLike.getUser().getUserId();
       EmoCommentLike removalTarget = emoCommentLikeList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny()
                .orElseThrow(()-> new ResourceNotFoundException("이미 좋아요를 해제했습니다"));
        emoCommentLikeList.remove(removalTarget);
    }

}

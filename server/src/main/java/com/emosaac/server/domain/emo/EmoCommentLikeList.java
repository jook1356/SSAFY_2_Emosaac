package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
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

}

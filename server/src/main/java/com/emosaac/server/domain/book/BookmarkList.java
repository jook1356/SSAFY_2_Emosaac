package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
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
public class BookmarkList extends BaseEntity {

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<BookMark> bookmarkList = new ArrayList<>();

    public int size(){
        return bookmarkList.size();
    }

}

package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import com.emosaac.server.domain.book.BookCommentList;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Emopick extends BaseEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMOPICK_NO")
    private Long EmopickId;

    private String title;

    @Column(columnDefinition="TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

//    private String CONTENTS_LIST; //map으로 변환 해야함

    @Type(type = "json")
    @Column(name = "CONTENTS_LIST", columnDefinition = "json")
    private Map<Integer, Map<Integer, String>> emopickList = new LinkedHashMap<>();
//    bookId, review

    // 웹툰, 웹소설 등록은 한번에, 조회할 때는 맵으로 나눠서

    /*
    * map 웹툰: 웹툰리스트, 소설: 소설리스트
    *  */

    @Embedded
    private final EmopickCommentList commentList = new EmopickCommentList();

    @Builder
    public Emopick(User user, String title, String content){
        this.user = user;
        this.title = title;
        this.content = content;
    }

    public void addEmopick(int idx, Map<Integer, String> emo){
        emopickList.put(idx, emo);
    }
}

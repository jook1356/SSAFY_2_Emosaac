package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.BookCommentList;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
public class Emopick extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMOPICK_NO")
    private Long EmopickId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    private String CONTENTS_LIST; //map으로 변환 해야함

    @Embedded
    private final EmopickCommentList commentList = new EmopickCommentList();

}

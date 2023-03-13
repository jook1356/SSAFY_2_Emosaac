package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
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
public class Gerne extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GENRE_CD")
    private Long gerneId;
    /*
    - 웹소설
    - 로맨스: 20 로판: 21  판타지: 23 무협: 24 BL/GL: 25  현판: 27 미스터리: 28
    - 웹툰
    - 로맨스:  10 로판:  11 드라마: 12  판타지: 13  액션/무협: 14  BL/GL: 15 공포: 16
*/
    private String name;

}

package com.emosaac.server.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicUpdate
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Research {
    @Id
    @Column(name = "RESEARCH_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long researchId;

    private Long bookId;

    private Long gerneId;

    private Long type;

}

package com.emosaac.server.domain.book;

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
public class Read {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "READ_NO")
    private Long readId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOOK_NO")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;
}

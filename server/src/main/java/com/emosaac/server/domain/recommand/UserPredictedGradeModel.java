package com.emosaac.server.domain.recommand;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="UserPredictedGradeModel")
public class UserPredictedGradeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PRED_GRADE_NO")
    int id;

    // search_log - user
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name ="USER_NO")
    User user;

    // search_log - book
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name ="BOOK_NO")
    Book book;
}

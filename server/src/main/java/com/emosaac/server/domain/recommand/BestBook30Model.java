package com.emosaac.server.domain.recommand;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="BestBook30Model")
public class BestBook30Model {

    @Id
    @Column(name="BEST_NO")
    int id;

    // book-bookGrade
    @JsonBackReference
    @OneToOne
    @JoinColumn(name="BOOK_NO")
    Book book;
}

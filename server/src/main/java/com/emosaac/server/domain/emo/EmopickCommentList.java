package com.emosaac.server.domain.emo;

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
public class EmopickCommentList {

    @OneToMany(mappedBy = "emopick", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<EmopickComment> commentList = new ArrayList<>();

}

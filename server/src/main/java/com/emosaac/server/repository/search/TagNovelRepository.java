package com.emosaac.server.repository.search;

import com.emosaac.server.domain.tag.TagNovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;

@Repository
public interface TagNovelRepository extends JpaRepository<TagNovel, Long> {

}

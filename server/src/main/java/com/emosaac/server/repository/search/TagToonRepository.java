package com.emosaac.server.repository.search;

import com.emosaac.server.domain.tag.TagNovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagToonRepository extends JpaRepository<TagNovel, Long> {
}

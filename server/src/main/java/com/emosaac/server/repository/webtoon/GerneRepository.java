package com.emosaac.server.repository.webtoon;

import com.emosaac.server.domain.book.Gerne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerneRepository extends JpaRepository<Gerne, Long> {
    Optional<Gerne> findByGerneId(Long gerneCode);
}

package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.EmopickDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmopickDetailRepository extends JpaRepository<EmopickDetail, Long> {

}

package com.emosaac.server.repository.recommand;

import com.emosaac.server.domain.book.Hit;
import com.emosaac.server.domain.recommand.UserBasedCFModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBasedCfRepository extends JpaRepository<UserBasedCFModel, Long> {
    @Query("select m.bookNoList from UserBasedCFModel m where m.user.userId = :userId and m.typeCode = :typeCd")
    String findByBookList(@Param("userId") Long userId, @Param("typeCd") int typeCd);

}

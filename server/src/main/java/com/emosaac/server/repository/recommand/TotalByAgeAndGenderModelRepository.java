package com.emosaac.server.repository.recommand;

import com.emosaac.server.domain.recommand.TotalByAgeAndGenderModel;
import com.emosaac.server.domain.recommand.UserBasedCFModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalByAgeAndGenderModelRepository extends JpaRepository<TotalByAgeAndGenderModel, Long> {
    @Query("select m.bookNoList from TotalByAgeAndGenderModel m where m.age = :age and m.gender = :gender and m.typeCode = :typeCd")
    String findByBookList(@Param("age") Integer age, @Param("gender") Integer gender, @Param("typeCd") int typeCd);

}


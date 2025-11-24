package io.anupamnilav.IPL_Dashboard.repository;

import io.anupamnilav.IPL_Dashboard.model.Match;
import org.hibernate.query.Page;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

}

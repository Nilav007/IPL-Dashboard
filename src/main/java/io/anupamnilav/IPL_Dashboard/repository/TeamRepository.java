package io.anupamnilav.IPL_Dashboard.repository;

import io.anupamnilav.IPL_Dashboard.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByTeamNameIgnoreCase(String teamName);

    @Override
    List<Team> findAll();  // Override to return List
}
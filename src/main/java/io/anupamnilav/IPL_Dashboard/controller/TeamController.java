package io.anupamnilav.IPL_Dashboard.controller;

import io.anupamnilav.IPL_Dashboard.model.Team;
import io.anupamnilav.IPL_Dashboard.repository.MatchRepository;
import io.anupamnilav.IPL_Dashboard.repository.TeamRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Pageable;
import java.util.List;

@CrossOrigin
@RestController
public class TeamController {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }
    @GetMapping("/teams")
    public List<Team> getAllTeams() {
        return this.teamRepository.findAll();
    }
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team= this.teamRepository.findByTeamNameIgnoreCase(teamName);
        Pageable pageable = (Pageable) PageRequest.of(0,4);
        team.setMatches(this.matchRepository.getByTeam1OrTeam2OrderByDateDesc(teamName,teamName,pageable));
        return team;
    }

}

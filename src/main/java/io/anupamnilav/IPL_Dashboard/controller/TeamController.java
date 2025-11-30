package io.anupamnilav.IPL_Dashboard.controller;

import io.anupamnilav.IPL_Dashboard.model.Match;
import io.anupamnilav.IPL_Dashboard.model.Team;
import io.anupamnilav.IPL_Dashboard.repository.MatchRepository;
import io.anupamnilav.IPL_Dashboard.repository.TeamRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamController {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }
    @GetMapping("/teams")
    public Iterable<Team> getAllTeam() {
        return this.teamRepository.findAll();
    }
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team= this.teamRepository.findByTeamNameIgnoreCase(teamName);
        Pageable pageable = (Pageable) PageRequest.of(0,4);
        team.setMatches(this.matchRepository.getByTeam1OrTeam2OrderByDateDesc(teamName,teamName,pageable));
        return team;
    }
    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam int year) {
        LocalDate startDate=LocalDate.of(year,1,1);
        LocalDate endDate=LocalDate.of(year+1,1,1);
        return this.matchRepository.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
                teamName,
                startDate,
                endDate,
                teamName,
                startDate,
                endDate);
    }
}

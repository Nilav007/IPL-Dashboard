package io.anupamnilav.IPL_Dashboard.controller;

import io.anupamnilav.IPL_Dashboard.model.Team;
import io.anupamnilav.IPL_Dashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class TeamController {

    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }
    @CrossOrigin
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        return this.teamRepository.findByTeamNameIgnoreCase(teamName);
    }
    @GetMapping("/teams")
    public Iterable<Team> getAllTeams() {
        System.out.println("=== /teams endpoint hit ===");
        Iterable<Team> teams = teamRepository.findAll();

        // Count teams
        long count = teamRepository.count();
        System.out.println("Repository count: " + count);

        int i = 0;
        for (Team team : teams) {
            System.out.println("Team " + i + ": " + team);
            i++;
        }
        System.out.println("Total teams iterated: " + i);
        System.out.println("===========================");
        return teams;
    }
}

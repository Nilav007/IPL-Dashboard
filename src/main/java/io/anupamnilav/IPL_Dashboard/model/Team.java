package io.anupamnilav.IPL_Dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Team {
    @Id
    private long id;
    private String teamName;
    private long totalMatches;
    private long totalWins;

    public Team() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public long getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(long totalMatches) {
        this.totalMatches = totalMatches;
    }

    public long getTotalWins() {
        return totalWins;
    }

    public void setTotalWins(long totalWins) {
        this.totalWins = totalWins;
    }

    public Team(String teamName,long totalMatches) {
        this.teamName = teamName;
        this.totalMatches=totalMatches;
    }
}

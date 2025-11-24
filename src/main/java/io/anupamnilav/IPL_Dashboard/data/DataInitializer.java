package io.anupamnilav.IPL_Dashboard.data;

import io.anupamnilav.IPL_Dashboard.model.Team;
import io.anupamnilav.IPL_Dashboard.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Component
@Order(2)
public class DataInitializer implements ApplicationRunner {

    private final EntityManager em;
    private final TeamRepository teamRepository;

    public DataInitializer(EntityManager em, TeamRepository teamRepository) {
        this.em = em;
        this.teamRepository = teamRepository;
    }

    @Override
    @Transactional  // This handles the transaction automatically
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("=== DataInitializer: Saving teams AFTER batch job ===");

        Map<String, Team> teamData = new HashMap<>();

        em.createQuery("select distinct m.team1,count(*) from Match m group by m.team1", Object[].class)
                .getResultList()
                .stream()
                .map(e -> new Team((String) e[0], (long) e[1]))
                .forEach(team -> teamData.put(team.getTeamName(), team));

        em.createQuery("select distinct m.team2,count(*) from Match m group by m.team2", Object[].class)
                .getResultList()
                .stream()
                .forEach(e -> {
                    Team team = teamData.get((String) e[0]);
                    team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
                });

        em.createQuery("select m.matchWinner,count(*) from Match m group by m.matchWinner", Object[].class)
                .getResultList()
                .stream()
                .forEach(e -> {
                    Team team = teamData.get((String) e[0]);
                    if (team != null) team.setTotalWins((long) e[1]);
                });

        teamRepository.saveAll(teamData.values());

        System.out.println("=== SAVED " + teamData.size() + " TEAMS ===");
        System.out.println("=== DataInitializer: Teams saved successfully ===");
    }
}
package io.anupamnilav.IPL_Dashboard.data;


import io.anupamnilav.IPL_Dashboard.model.Match;
import io.anupamnilav.IPL_Dashboard.model.Team;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager em;
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");
            List<Object[]> results=em.createQuery("select distinct m.team1,count(*) from match m group by m.team1")
                                     .getResultList()
                                     .stream()
            Map<String, Team> teamData=new HashMap<>();
        }
    }
}

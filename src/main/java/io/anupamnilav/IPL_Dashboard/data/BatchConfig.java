package io.anupamnilav.IPL_Dashboard.data;

import io.anupamnilav.IPL_Dashboard.data.MatchDataProcessor;
import io.anupamnilav.IPL_Dashboard.data.MatchInput;
import io.anupamnilav.IPL_Dashboard.model.Match;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
public class BatchConfig {

    @Value("${input.path:match-data.csv}")
    private String inputPath;

    @Bean
    public FlatFileItemReader<MatchInput> reader() {
        return new FlatFileItemReaderBuilder<MatchInput>()
                .name("matchItemReader")
                .resource(new ClassPathResource(inputPath))
                .delimited()
                .names("id", "season", "city", "date", "match_type", "player_of_match", "venue",
                        "team1", "team2", "toss_winner", "toss_decision", "winner", "result",
                        "result_margin", "target_runs", "target_overs", "super_over", "method",
                        "umpire1", "umpire2")
                .targetType(MatchInput.class)
                .linesToSkip(0)
                .build();
    }

    @Bean
    public MatchDataProcessor processor() {
        return new MatchDataProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<Match>()
                .sql("INSERT INTO match (id, city, date, player_of_match, venue, team1, team2, " +
                        "toss_winner, toss_decision, match_winner, result, result_margin, umpire1, umpire2) " +
                        "VALUES (:id, :city, :date, :playerOfMatch, :venue, :team1, :team2, " +
                        ":tossWinner, :tossDecision, :matchWinner, :result, :resultMargin, :umpire1, :umpire2)")
                .dataSource(dataSource)
                .beanMapped()
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,
                      PlatformTransactionManager transactionManager,
                      FlatFileItemReader<MatchInput> reader,
                      MatchDataProcessor processor,
                      JdbcBatchItemWriter<Match> writer) {
        return new StepBuilder("step1", jobRepository)
                .<MatchInput, Match>chunk(10, transactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }

    @Bean
    public Job importMatchJob(JobRepository jobRepository, Step step1) {
        return new JobBuilder("importMatchJob", jobRepository)
                .start(step1)
                .build();
    }
}
package com.cleveronion.knowgraphbackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cleveronion.knowgraph.**.mapper")
public class KnowGraphBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KnowGraphBackendApplication.class, args);
    }

}

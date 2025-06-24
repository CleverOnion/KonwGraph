package com.cleveronion.knowgraphbackend;

import cn.dev33.satoken.SaManager;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.cleveronion.knowgraph.**.mapper")
@ComponentScan("com.cleveronion.knowgraph")
public class KnowGraphBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KnowGraphBackendApplication.class, args);
        System.out.println("启动成功，Sa-Token 配置如下：" + SaManager.getConfig());
    }


}

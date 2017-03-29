package com.curiousby.cn.service;

import redis.clients.jedis.Jedis;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by wanghp on 2017/3/29.
 */
public class MyExcutorService {
    public static void main(String[] args) {
        final String watchkey = "watchKey";
        Jedis jedis = new Jedis("127.0.0.1",6379);
        jedis.set(watchkey,"0");
        jedis.del("setsucc","setfail");
        ExecutorService executor = Executors.newFixedThreadPool(20);
        //10万条并发
        for(int i=0;i<100000;i++){
            executor.execute(new MyThread());
        }
        executor.shutdown();
    }

}

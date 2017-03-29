package com.curiousby.cn.service;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

import java.util.List;
import java.util.UUID;

/**
 * Created by wanghp on 2017/3/29.
 */
public class MyThread extends Thread {
    Jedis jedis = new Jedis("127.0.0.1",6379);

    public void run(){
        try {
            jedis.watch("watchKey");
            int val = Integer.valueOf(jedis.get("watchKey"));
            if (val < 10) {
                Transaction tc = jedis.multi();
                tc.incr("watchKey");
                List<Object> list = tc.exec();
                String userInfo = UUID.randomUUID().toString();
                if (null != list) {
                    jedis.sadd("setsucc", UUID.randomUUID().toString());
                    System.out.println("恭喜你，"+userInfo+"成功抢到秒杀商品！第" +val+1+"个商品" );
                } else {
                    jedis.sadd("setfail", "抢购失败，"+userInfo+",请重新再试");
                    System.out.println("对不起，你没有抢到商品！");
                    Thread.currentThread().sleep(1000);
                    return;
                }
            } else {
                System.out.println("秒杀活动已结束，请下次再来！");
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            jedis.close();
        }
    }

}

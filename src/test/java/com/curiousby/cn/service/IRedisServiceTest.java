/*
 * Project: SpringBootWebDemo
 * 
 * File Created at 2016年11月15日
 * 
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 */
package com.curiousby.cn.service;

import com.curiousby.cn.SpringBootSampleApplication;
import com.curiousby.cn.dao.UserDaoTest;
import com.curiousby.cn.one.entity.User;
import com.curiousby.cn.redis.IRedisService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;

/**
 * @Type UserServiceTest.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月15日 上午10:50:12
 * @version 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SpringBootSampleApplication.class)
@WebAppConfiguration
public class IRedisServiceTest {

 private final Logger logger = LoggerFactory.getLogger(UserDaoTest.class);
    
    @Resource
    IRedisService iRedisService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    
    @Test
    public void  test(){
        
        boolean result =  iRedisService.setBit("bitKey1",1,true);
        logger.info("bit count : "+ result);

    }


}


/**
 * Revision history
 * -------------------------------------------------------------------------
 * 
 * Date Author Note
 * -------------------------------------------------------------------------
 * 2016年11月15日 cmcc-B100036 creat
 */
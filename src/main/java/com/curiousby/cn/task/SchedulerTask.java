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
package com.curiousby.cn.task;
  
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * @Type SchedulerTask.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月15日 上午10:37:09
 * @version 
 */
@Configuration
@EnableScheduling 
public class SchedulerTask {
    
    private final Logger logger = LoggerFactory.getLogger(SchedulerTask.class);

    @Scheduled(cron = "0/2 * * * * ?")  
    public void scheduler() {
        logger.info("===================== scheduled ====================");
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
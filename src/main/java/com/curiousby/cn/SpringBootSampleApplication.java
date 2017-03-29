/**
 *  Project: SpringBootWebDemo
 * 
 * File Created at 2016年11月14日
 * 
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 */
package com.curiousby.cn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @Type SpringBootSampleApplication.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月14日 下午12:46:12
 * @version 
 */
@EnableTransactionManagement  //事务自动扫描
@SpringBootApplication
@ComponentScan(value = {"com"})
@ServletComponentScan  // servlet 自动扫描 
public class SpringBootSampleApplication {

    
     
    
    public static void main(String[] args) {
        SpringApplication.run(SpringBootSampleApplication.class, args);
    }


}

/**
 * Revision history
 * -------------------------------------------------------------------------
 * 
 * Date Author Note
 * -------------------------------------------------------------------------
 * 2016年11月14日 cmcc-B100036 creat
 */
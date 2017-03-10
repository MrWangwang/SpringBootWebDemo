/*
 * Project: SpringBootWebDemo
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
package com.curiousby.cn.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Type HelloWebController.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月14日 下午1:27:57
 * @version 
 */
@Controller
@RequestMapping("/helloweb")
public class HelloWebController {

    @RequestMapping(value = {"/","/index"})
    public String index(Map<String, Object> model) {
        return "index";
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
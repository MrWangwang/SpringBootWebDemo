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

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Type HelloController.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月14日 下午12:59:59
 * @version 
 */
@Controller
@RequestMapping("/web/static/")
public class StaticController {

     

    @RequestMapping(value = "/forward")
    public String newForm(HttpServletRequest request){ 
        String str ="web/common/error";
        String index = request.getParameter("param");
        int curr = Integer.parseInt(index == null || "".equals(index) ? "0" : index );
        switch (curr) {
            case 0:
                str ="web/common/error";
                break;
            case 1:
                str ="web/common/error";
                break;
            default:
                str ="web/common/error";
                break;
        }
        return str;
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
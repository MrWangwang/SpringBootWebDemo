/*
 * Project: SPRINGBOOTDEMO
 * 
 * File Created at 2016年11月10日
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

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.curiousby.cn.one.entity.User;
import com.curiousby.cn.service.UserService;

/**
 * @Type UserController.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月10日 下午3:57:05
 * @version 
 */ 
@Controller
@RequestMapping(value="/web/users")
//@Api(value = "用户控制",description = "用户控制类测试",tags = "测试接口")
public class UserController {

   
    @Resource
    UserService userService;
    
    
    @ResponseBody
    @RequestMapping(value="/{userId}", method=RequestMethod.GET)
    public User  getUserById(@PathVariable int userId){
        
        return  userService .findById(userId); 
    }

    @ResponseBody
    @RequestMapping(value="/name/{name}", method=RequestMethod.GET)
    public com.curiousby.cn.two.entity.User  getUserByName(@PathVariable String name){

        return  userService .findByName(name);
    }

}


/**
 * Revision history
 * -------------------------------------------------------------------------
 * 
 * Date Author Note
 * -------------------------------------------------------------------------
 * 2016年11月10日 cmcc-B100036 creat
 */
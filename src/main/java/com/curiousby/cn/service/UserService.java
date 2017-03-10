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
package com.curiousby.cn.service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.curiousby.cn.one.dao.UserDao;
import com.curiousby.cn.one.entity.User;

/**
 * @Type UserService.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月10日 下午3:56:14
 * @version 
 */
@Transactional
@Service
public class UserService {

    @Resource
    UserDao userDao;
    
    
    public User  findById(int userId){
        return userDao.findById(userId);
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
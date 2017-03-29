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
package com.curiousby.cn.two.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;

import com.curiousby.cn.two.entity.User;
import org.springframework.stereotype.Repository;

/**
 * @Type UserDao.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月10日 下午3:49:04
 * @version 
 */
@Repository(value = "UserDaoTwo")
@Transactional
public interface  UserDao extends CrudRepository<User, Integer>{

    //crud
    User findByUserName(String name);

}


/**
 * Revision history
 * -------------------------------------------------------------------------
 * 
 * Date Author Note
 * -------------------------------------------------------------------------
 * 2016年11月10日 cmcc-B100036 creat
 */
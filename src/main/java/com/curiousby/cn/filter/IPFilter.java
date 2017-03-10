/*

 * Project: springmvchibernate
 * 
 * File Created at 2016年11月4日
 * 
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 */
package com.curiousby.cn.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.curiousby.cn.redis.IRedisService;

/**
 * @com.curiousby.baoyou.cn.filters.IPFilter
 * @Type IPFilter.java
 * @Desc 
 * @author cmcc-B100036
 * @date 2016年11月4日 上午10:42:42
 * @version 
 */
@WebFilter(filterName="ipFilter",urlPatterns="/*")
public class IPFilter  implements Filter {

    protected static final Logger logger = LoggerFactory.getLogger(IPFilter.class);
  
    
    public final static int IPMAXCOUNTPERMINUTES = 5;
    public final static long IPLIMITSENCONDS = 300;
    public final static long IPCOUNTSENCONDS = 60;
    
    
   // @Resource
    IRedisService iredisService;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
      
        
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request; 
        WebApplicationContext wac=WebApplicationContextUtils.getWebApplicationContext(req.getSession().getServletContext());
        iredisService =  (IRedisService) wac.getBean("redisService");
        
        String ip = getIpAddr(req); 

        String ipLimit = iredisService.get(ip+"_limit");
        if (ipLimit !=null &&  !"".equals(ipLimit)) {
            req.getRequestDispatcher("/web/static/forward").forward(req, response);
            return;
        }else{
            String ipConut =  iredisService.get(ip+"_count");
            if (ipConut !=null &&  !"".equals(ipConut)){
                int ipLCount = Integer.parseInt(ipConut);
                if(ipLCount >= IPMAXCOUNTPERMINUTES){
                    iredisService.set(ip+"_limit", ipLCount+"", IPLIMITSENCONDS);
                    iredisService.set(ip+"_count", "0", IPCOUNTSENCONDS); 
                    req.getRequestDispatcher("/web/static/forward").forward(req, response);
                    return;
                }else{
                    ipLCount += 1; 
                    iredisService.set(ip+"_count", ipLCount+"", IPCOUNTSENCONDS); 
                } 
            }else{
                iredisService.set(ip+"_count", "1", IPCOUNTSENCONDS);
            }
        } 
        chain.doFilter(req, response);
    }

    @Override
    public void destroy() {
         
        
    }
    
    
    public String getIpAddr(HttpServletRequest request) {   
        String ip = request.getHeader("x-forwarded-for");   
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
            ip = request.getHeader("Proxy-Client-IP");   
        }   
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
            ip = request.getHeader("WL-Proxy-Client-IP");   
        }   
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
            ip = request.getRemoteAddr();   
        }   
        return ip;   
    } 

}


/**
 * Revision history
 * -------------------------------------------------------------------------
 * 
 * Date Author Note
 * -------------------------------------------------------------------------
 * 2016年11月4日 cmcc-B100036 creat
 */
package com.curiousby.cn.nio;

import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.Iterator;
import java.util.Set;
import java.util.logging.Logger;

/**
 * java nio 多路复用
 * Created by wanghp on 2017/3/29.
 */
public class ServerChannerServce {
    private InetSocketAddress inetSocketAddress;

    private static final Logger  log = Logger.getLogger("ServerChannerServer");

    public ServerChannerServce(int port){
        inetSocketAddress = new InetSocketAddress(port);
    }

    public void run(){
           try{
               Selector selector = Selector.open();//开启多路复用器
               ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();//开启通道
               serverSocketChannel.configureBlocking(false);//设置非阻塞模式
               serverSocketChannel.socket().bind(inetSocketAddress);//绑定端口
               serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);//设置状态为可连接
               log.info("serverSocket is open");
               while(true){
                   int nkeys = selector.select();
                   if(nkeys>0){
                       Set<SelectionKey> selectionKeys = selector.selectedKeys();
                       Iterator<SelectionKey> it = selectionKeys.iterator();
                       while(it.hasNext()){
                           SelectionKey key = it.next();
                           if(key.isValid()&&key.isAcceptable()){
                                log.info("server key is acceptable");
                               ServerSocketChannel server = (ServerSocketChannel) key.channel();
                               SocketChannel channel = server.accept();
                               channel.configureBlocking(false);
                               channel.write(ByteBuffer.wrap(new String("hello.myClinet!").getBytes()));
                               channel.register(selector,SelectionKey.OP_READ);
                           }else if(key.isValid()&&key.isConnectable()){
                               log.info("server key is connectable");
                               ServerSocketChannel server = (ServerSocketChannel) key.channel();
                               SocketChannel channel = server.accept();
                           }else if(key.isValid()&&key.isReadable()){
                               log.info("server key is readable");
                           }else if (key.isValid()&&key.isWritable()){
                               log.info("server key is writable");
                           }

                       }
                   }
               }
           }catch (Exception e){
               e.printStackTrace();
           }
    }

    public static void main(String[] args) {
        ServerChannerServce server = new ServerChannerServce(9081);
        server.run();
    }
}

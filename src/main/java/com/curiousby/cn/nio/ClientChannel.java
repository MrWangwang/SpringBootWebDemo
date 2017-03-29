package com.curiousby.cn.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

/**
 * Created by wanghp on 2017/3/29.
 */
public class ClientChannel {
    private Selector selector;

    public void initClient(String host,int port){
        try {
            SocketChannel channel = SocketChannel.open();
            channel.configureBlocking(false);
            this.selector = Selector.open();
            channel.connect(new InetSocketAddress(host,port));
            channel.register(selector, SelectionKey.OP_CONNECT);//注册连接事件
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void listen(){
        while(true){
            try {
                selector.select();
                Iterator it = this.selector.selectedKeys().iterator();
                while(it.hasNext()){
                    SelectionKey key = (SelectionKey) it.next();
                    it.remove();
                    if(key.isValid()&&key.isConnectable()){
                        SocketChannel channel = (SocketChannel) key.channel();
                        channel.configureBlocking(false);
                        channel.write(ByteBuffer.wrap(new String("hello.server").getBytes()));
                        channel.register(selector,SelectionKey.OP_READ);
                    }else if(key.isValid()){

                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 处理读取服务端发来的信息 的事件
     * @param key
     * @throws IOException
     */
    public void read(SelectionKey key) throws IOException{
        // 服务器可读取消息:得到事件发生的Socket通道
        SocketChannel channel = (SocketChannel) key.channel();
        // 创建读取的缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        channel.read(buffer);
        byte[] data = buffer.array();
        String msg = new String(data).trim();
        System.out.println("客户端收到信息："+msg);
//      ByteBuffer outBuffer = ByteBuffer.wrap(msg.getBytes());
//      channel.write(outBuffer);// 将消息回送给服务器端
    }

    /**
     * 启动客户端测试
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        ClientChannel client = new ClientChannel();
        client.initClient("localhost",9081);
        client.listen();
    }
}

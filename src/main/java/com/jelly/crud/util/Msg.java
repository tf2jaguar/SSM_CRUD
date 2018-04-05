package com.jelly.crud.util;

import java.util.HashMap;
import java.util.Map;

/**
 * 通用返回的类
 */
public class Msg {
    //状态码 100-成功   200-失败
    private int code;
    //提示信息
    private String msg;

    private Map<String, Object> datas = new HashMap<String, Object>();


    public static Msg success() {
        Msg result = new Msg();
        result.setCode(100);
        result.setMsg("处理成功");
        return result;
    }

    public static Msg fail() {
        Msg result = new Msg();
        result.setCode(200);
        result.setMsg("处理失败");
        return result;
    }

    public Msg add(String key, Object value) {
        this.getDatas().put(key, value);
        return this;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Map<String, Object> getDatas() {
        return datas;
    }

    public void setDatas(Map<String, Object> messag) {
        datas = datas;
    }
}

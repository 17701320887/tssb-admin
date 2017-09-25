package com.tssb.common.exception.classes;

import com.tssb.common.exception.BaseException;

/**
 * 我的班级异常
 * Created by wsp on 2015/6/12.
 */
public class ClassesException extends BaseException {
    public ClassesException() {
        super();
    }

    public ClassesException(String message) {
        super(message);
    }

    public ClassesException(String message,Throwable cause){
        super(message,cause);
    }
}

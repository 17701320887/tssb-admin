package com.tssb.common.exception.payorder;

import com.tssb.common.exception.BaseException;

/**
 * 订单异常类
 * Created by wangsongpeng on 2015/10/15.
 */
public class PayOrderException extends BaseException{
    public PayOrderException() {
        super();
    }

    public PayOrderException(String message) {
        super(message);
    }

    public PayOrderException(String message,Throwable cause){
        super(message,cause);
    }
}

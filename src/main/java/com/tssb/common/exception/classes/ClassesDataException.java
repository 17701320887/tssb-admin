package com.tssb.common.exception.classes;
import com.tssb.common.exception.BaseException;

/**\
 * 班级学习资料异常类
 * Created by wsp on 2015/6/16.
 */
public class ClassesDataException extends BaseException {
    public ClassesDataException() {
        super();
    }

    public ClassesDataException(String message) {
        super(message);
    }

    public ClassesDataException(String message,Throwable cause){
        super(message,cause);
    }
}

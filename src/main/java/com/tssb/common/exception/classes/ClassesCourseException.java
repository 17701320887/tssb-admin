package com.tssb.common.exception.classes;
import com.tssb.common.exception.BaseException;

/**
 * 我的班级我的课程异常类
 * Created by wsp.
 */
public class ClassesCourseException extends BaseException{
    public ClassesCourseException() {
        super();
    }

    public ClassesCourseException(String message) {
        super(message);
    }

    public ClassesCourseException(String message,Throwable cause){
        super(message,cause);
    }

}

package com.tssb.common.util;

import java.io.Serializable;

/**
 * Created by admin on 2017/4/21.
 */
public class Result implements Serializable {
    private static final long serialVersionUID = 1L;
    private boolean success;
    private String message;

    public Result() {
        success = true;
    }

    public Result(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Result [success=" + success + ", message=" + message + "]";
    }

}

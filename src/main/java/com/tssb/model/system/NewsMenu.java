package com.tssb.model.system;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;

/**
 * Created by admin on 2017/9/14.
 */
@SuppressWarnings("serial")
@Alias("NewsMenu")
public class NewsMenu extends BaseEntity {
    private Integer code;

    private String codeName;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }
}

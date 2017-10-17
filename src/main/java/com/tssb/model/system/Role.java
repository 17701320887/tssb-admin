package com.tssb.model.system;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;

/**
 * Created by admin on 2017/9/14.
 */
@SuppressWarnings("serial")
@Alias("Role")
public class Role extends BaseEntity {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

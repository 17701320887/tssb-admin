package com.tssb.model;

import org.apache.commons.lang.builder.CompareToBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.io.Serializable;

public abstract class BaseEntity implements Comparable<Object>, Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    public BaseEntity() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

    public int hashCode() {
        return this.id.hashCode();
    }

    public int compareTo(Object obj) {
        boolean compare = true;
        int compare1;
        if(obj == null) {
            compare1 = -1;
        } else if(this == obj) {
            compare1 = 0;
        } else if(!(obj instanceof BaseEntity)) {
            compare1 = -1;
        } else if(!this.getClass().equals(obj.getClass())) {
            compare1 = -1;
        } else {
            BaseEntity castObj = (BaseEntity)obj;
            CompareToBuilder builder = new CompareToBuilder();
            builder.append(this.getId(), castObj.getId());
            compare1 = builder.toComparison();
        }

        return compare1;
    }

    public boolean equals(Object obj) {
        boolean isEqual = false;
        if(obj == null) {
            isEqual = false;
        } else if(this == obj) {
            isEqual = true;
        } else if(!(obj instanceof BaseEntity)) {
            isEqual = false;
        } else if(!this.getClass().equals(obj.getClass())) {
            isEqual = false;
        } else {
            BaseEntity castObj = (BaseEntity)obj;
            EqualsBuilder builder = new EqualsBuilder();
            builder.append(this.getId(), castObj.getId());
            isEqual = builder.isEquals();
        }

        return isEqual;
    }
}

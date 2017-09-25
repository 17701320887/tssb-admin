package com.tssb.dao.api;

import java.io.Serializable;
import java.util.List;

/**
 * Created by wangsongpeng on 2015/11/4.
 */
public interface IBaseDao<T extends Serializable,PK extends Serializable> {
    void save(T t);

    void update(T t);

    void delete(PK id);

    void deleteByIds(PK[] ids);

    <T> List<T> search(T var1);

}

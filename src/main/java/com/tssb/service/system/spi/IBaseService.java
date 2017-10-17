package com.tssb.service.system.spi;

import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by wangsongpeng on 2015/11/4.
 */
@Service
public interface IBaseService<T extends Serializable,PK extends Serializable> {
    <T> T load(PK var1);

    <T> T find(PK var1);

    void save(T var1);

    void update(T var1);

    void delete(PK var1);

    void deleteByIds(PK[] var1);

    <T> T one(String var1);

    <T> T one(String var1, Object var2);

    Object one(Class var1, String var2);

    Object one(Class var1, String var2, Object var3);

    <T> List<T> list(String var1);

    <T> List<T> list(String var1, Object var2);

    List list(Class var1, String var2);

    List list(Class var1, String var2, Object var3);

    <T> List<T> search(T var1);
}

package com.tssb.service.system;
/**
 * Created by wangsongpeng on 2015/11/4.
 */

import com.tssb.dao.api.IBaseDao;
import com.tssb.service.system.spi.IBaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

public abstract class BaseService<T extends Serializable,PK extends Serializable> implements IBaseService<T,PK> {
    Logger logger = LoggerFactory.getLogger(BaseService.class);
    @Autowired
    protected IBaseDao<T, PK> iBaseDao;

    public BaseService() {
    }

    public <T> T load(PK id) {
        return this.iBaseDao.load(id);
    }

    public <T> T find(PK id) {
        return this.iBaseDao.find(id);
    }

    public void save(T t) {
        this.iBaseDao.save(t);
    }

    public void update(T t) {
        this.iBaseDao.update(t);
    }

    public void delete(PK id) {
        this.iBaseDao.delete(id);
    }

    public void deleteByIds(PK[] ids) {
        this.iBaseDao.deleteByIds(ids);
    }

    public <T> T one(String queryKey) {
        return this.iBaseDao.one(queryKey);
    }

    public <T> T one(String queryKey, Object param) {
        return this.iBaseDao.one(queryKey, param);
    }

    public Object one(Class clazz, String queryKey) {
        return this.iBaseDao.one(clazz, queryKey);
    }

    public Object one(Class clazz, String queryKey, Object param) {
        return this.iBaseDao.one(clazz, queryKey, param);
    }

    public <T> List<T> search(T t) {
        return this.iBaseDao.search(t);
    }

    public <T> List<T> list(String queryKey) {
        return this.iBaseDao.list(queryKey);
    }

    public List list(Class clazz, String queryKey) {
        return this.iBaseDao.list(clazz, queryKey);
    }

    public <T> List<T> list(String queryKey, Object param) {
        return this.iBaseDao.list(queryKey, param);
    }

    public List list(Class clazz, String queryKey, Object param) {
        return this.iBaseDao.list(clazz, queryKey, param);
    }
}

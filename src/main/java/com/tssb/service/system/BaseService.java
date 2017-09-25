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

    @Override
    public void save(T t) {
        this.iBaseDao.save(t);
    }

    @Override
    public void update(T t) {
        this.iBaseDao.update(t);
    }

    @Override
    public void delete(PK id) {
       this.iBaseDao.delete(id);
    }

    @Override
    public void deleteByIds(PK[] ids) {
       this.iBaseDao.deleteByIds(ids);
    }

}

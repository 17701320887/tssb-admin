package com.tssb.dao;

import com.tssb.dao.api.IBaseDao;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.logging.LogFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;

public abstract class BaseDao<T extends Serializable, PK extends Serializable> extends SqlSessionDaoSupport implements IBaseDao<T, PK> {
    private final String _FIND_BY_ID = "findById";
    private final String _SAVE = "save";
    private final String _UPDATE = "update";
    private final String _DELETE = "delete";
    private final String _DELETES = "deleteByIds";
    private final String _COUNT = "count";
    private final String _PAGE = "page";
    private final String _SEARCH = "search";
    private Class<T> clazz;

    protected BaseDao(Class<T> clazz) {
        this.clazz = clazz;
    }

    protected BaseDao() {
        this.clazz = (Class)((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    protected String getXmlKey(String queryKey) {
        return this.clazz.getName() + "." + queryKey;
    }

    protected String getXmlKey(Class clazz, String queryKey) {
        return clazz.getName() + "." + queryKey;
    }

    public <T> T load(PK id) {
        return this.getSqlSession().selectOne(this.getXmlKey("findById"), id);
    }

    public <T> T find(PK id) {
        return this.load(id);
    }

    public void save(T t) {
        this.getSqlSession().insert(this.getXmlKey("save"), t);
    }

    public void update(T t) {
        this.getSqlSession().update(this.getXmlKey("update"), t);
    }

    public void delete(PK id) {
        this.getSqlSession().delete(this.getXmlKey("delete"), id);
    }

    public void deleteByIds(PK[] ids) {
        this.getSqlSession().delete(this.getXmlKey("deleteByIds"), ids);
    }

    public <T> T one(String queryKey) {
        return this.getSqlSession().selectOne(this.getXmlKey(queryKey));
    }

    public <T> T one(String queryKey, Object param) {
        return this.getSqlSession().selectOne(this.getXmlKey(queryKey), param);
    }

    public Object one(Class clazz, String queryKey) {
        return this.getSqlSession().selectOne(this.getXmlKey(clazz, queryKey));
    }

    public Object one(Class clazz, String queryKey, Object param) {
        return this.getSqlSession().selectOne(this.getXmlKey(clazz, queryKey), param);
    }

    public <T> List<T> list(String queryKey) {
        return this.getSqlSession().selectList(this.getXmlKey(queryKey));
    }

    public <T> List<T> list(String queryKey, Object param) {
        return this.getSqlSession().selectList(this.getXmlKey(queryKey), param);
    }

    public List list(Class clazz, String queryKey) {
        return this.getSqlSession().selectList(this.getXmlKey(clazz, queryKey));
    }

    public List list(Class clazz, String queryKey, Object param) {
        return this.getSqlSession().selectList(this.getXmlKey(clazz, queryKey), param);
    }

    public <T> List<T> search(T t) {
        return this.getSqlSession().selectList(this.getXmlKey(this.clazz, "search"), t);
    }

    static {
        LogFactory.useSlf4jLogging();
    }
}

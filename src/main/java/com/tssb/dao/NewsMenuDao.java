package com.tssb.dao;

import com.tssb.dao.api.INewsMenuDao;
import com.tssb.model.system.NewsMenu;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Dao Implementation:NewsMenu
 * @author duia_builder
 * @date 2017-9-25
 */
@Repository
public class NewsMenuDao extends BaseDao<NewsMenu,Long> implements INewsMenuDao {

    @Override
    public List<NewsMenu> findAll() {
        return this.list("findAll");
    }
}

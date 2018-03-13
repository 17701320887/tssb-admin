package com.tssb.service.system;

import com.tssb.dao.api.INewsMenuDao;
import com.tssb.model.system.NewsMenu;
import com.tssb.service.system.spi.INewsMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation:Users
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class NewsMenuService extends BaseService<NewsMenu,Long> implements INewsMenuService {
    @Autowired
    private INewsMenuDao newsMenuDao;

    @Override
    public List<NewsMenu> findAll() {
        return newsMenuDao.findAll();
    }
}

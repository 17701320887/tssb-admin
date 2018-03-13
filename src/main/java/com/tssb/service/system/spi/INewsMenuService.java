package com.tssb.service.system.spi;

import com.tssb.model.system.NewsMenu;

import java.util.List;

/**
 * Service Interface:NewsMenu
 * @author duia_builder
 * @date 2017-9-25
 */
public interface INewsMenuService extends IBaseService<NewsMenu,Long> {
    List<NewsMenu> findAll();
}
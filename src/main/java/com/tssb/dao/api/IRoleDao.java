package com.tssb.dao.api;

import com.tssb.model.system.Role;

/**
 * Dao Interface:Commodity
 *
 * @author duia_builder
 * @date 2015-4-14
 */
public interface IRoleDao extends IBaseDao<Role, Long> {
    String findById(Long id);
}
package com.tssb.dao;

import com.tssb.dao.api.IRoleDao;
import com.tssb.model.system.Role;
import org.springframework.stereotype.Repository;

/**
 * Dao Implementation:Commodity
 *
 * @author duia_builder
 * @date 2015-4-14
 */
@Repository
public class RoleDao extends BaseDao<Role, Long> implements IRoleDao {
    @Override
    public String findById(Long id) {
        return this.one("findById",id);
    }
}


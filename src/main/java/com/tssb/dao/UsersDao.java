package com.tssb.dao;

import com.tssb.model.system.Users;
import org.springframework.stereotype.Repository;

import com.tssb.dao.api.IUsersDao;

import java.util.List;

/**
 * Dao Implementation:Users
 * @author duia_builder
 * @date 2017-9-25
 */
@Repository
public class UsersDao extends BaseDao<Users,Long> implements IUsersDao {
    @Override
    public Users findByName(String name) {
        return this.one("findByName",name);
    }

    @Override
    public List<Users> findAll() {
        return this.list("findAll");
    }
}

package com.tssb.dao.api;

import com.tssb.model.system.Users;

import java.util.List;

/**
 * Dao Interface:Users
 * @author duia_builder
 * @date 2017-9-25
 */
public interface IUsersDao extends IBaseDao<Users,Long> {
	Users findByName(String name);
	List<Users> findAll();
}
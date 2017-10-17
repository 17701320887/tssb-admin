package com.tssb.service.system.spi;

import com.tssb.model.system.Users;

import java.util.List;

/**
 * Service Interface:Users
 * @author duia_builder
 * @date 2017-9-25
 */
public interface IUsersService extends IBaseService<Users,Long> {
    Users findByName(String name);
    List<Users> findAll();
}
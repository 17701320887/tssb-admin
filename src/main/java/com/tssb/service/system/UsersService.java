package com.tssb.service.system;

import com.tssb.dao.api.IUsersDao;
import com.tssb.model.system.Users;
import com.tssb.service.system.spi.IUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service Implementation:Users
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class UsersService extends BaseService<Users,Long> implements IUsersService {
    @Autowired
    private IUsersDao usersDao;
    @Override
    public Users findByName(String name) {
        return usersDao.findByName(name);
    }
}

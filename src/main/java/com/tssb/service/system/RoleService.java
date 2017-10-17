package com.tssb.service.system;

import com.tssb.dao.api.IRoleDao;
import com.tssb.model.system.Role;
import com.tssb.service.system.spi.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends BaseService<Role,Long> implements IRoleService {

    @Autowired
    private IRoleDao roleDao;
    @Override
    public String findById(Long id) {
        return roleDao.findById(id);
    }
}

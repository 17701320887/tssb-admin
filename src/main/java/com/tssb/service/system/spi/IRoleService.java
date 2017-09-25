package com.tssb.service.system.spi;

import com.tssb.model.system.Role;

public interface IRoleService extends IBaseService<Role,Long> {
    String findById(Long id);
}
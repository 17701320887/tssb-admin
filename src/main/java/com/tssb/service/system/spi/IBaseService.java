package com.tssb.service.system.spi;

import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by wangsongpeng on 2015/11/4.
 */
@Service
public interface IBaseService<T extends Serializable,PK extends Serializable> {

    void save(T t);

    void update(T t);

    void delete(PK id);

    void deleteByIds(PK[] ids);
}

package com.tssb.dao;

import com.tssb.model.system.Audit;
import org.springframework.stereotype.Repository;
import com.tssb.dao.api.IAuditDao;

/**
 * Dao Implementation:Audit
 * @author duia_builder
 * @date 2017-9-25
 */
@Repository
public class AuditDao extends BaseDao<Audit,Long> implements IAuditDao {

}

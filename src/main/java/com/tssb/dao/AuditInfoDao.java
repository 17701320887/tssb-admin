package com.tssb.dao;

import com.tssb.model.system.AuditInfo;
import org.springframework.stereotype.Repository;
import com.tssb.dao.api.IAuditInfoDao;

/**
 * Dao Implementation:AuditInfo
 * @author duia_builder
 * @date 2017-9-25
 */
@Repository
public class AuditInfoDao extends BaseDao<AuditInfo,Long> implements IAuditInfoDao {

}

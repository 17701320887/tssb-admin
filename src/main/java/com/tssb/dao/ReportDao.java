package com.tssb.dao;

import com.tssb.model.system.Report;
import org.springframework.stereotype.Repository;
import com.tssb.dao.api.IReportDao;

/**
 * Dao Implementation:Report
 * @author duia_builder
 * @date 2017-9-25
 */
@Repository
public class ReportDao extends BaseDao<Report,Long> implements IReportDao {

}

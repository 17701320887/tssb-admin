package com.tssb.service.system;

import com.tssb.model.system.Report;
import com.tssb.service.system.spi.IReportService;
import org.springframework.stereotype.Service;

/**
 * Service Implementation:Report
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class ReportService extends BaseService<Report,Long> implements IReportService {
}

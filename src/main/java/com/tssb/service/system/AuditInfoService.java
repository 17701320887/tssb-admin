package com.tssb.service.system;

import com.tssb.model.system.AuditInfo;
import com.tssb.service.system.spi.IAuditInfoService;
import org.springframework.stereotype.Service;

/**
 * Service Implementation:AuditInfo
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class AuditInfoService extends BaseService<AuditInfo,Long> implements IAuditInfoService {
}

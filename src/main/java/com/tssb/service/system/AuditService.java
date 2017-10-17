package com.tssb.service.system;

import com.tssb.model.system.Audit;
import com.tssb.service.system.spi.IAuditService;
import org.springframework.stereotype.Service;

/**
 * Service Implementation:Audit
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class AuditService extends BaseService<Audit,Long> implements IAuditService {
}

package com.tssb.service.system;

import com.tssb.model.system.Matic;
import com.tssb.service.system.spi.IMaticService;
import org.springframework.stereotype.Service;

/**
 * Service Implementation:Matic
 * @author duia_builder
 * @date 2017-9-25
 */
@Service
public class MaticService extends BaseService<Matic,Long> implements IMaticService {
}

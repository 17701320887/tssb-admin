package com.tssb.common.realm;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.text.SimpleDateFormat;

/**
 * Created by dutianzhao on 2015/10/21.
 */
public class CustomObjectMapper extends ObjectMapper {

    public CustomObjectMapper() {
        super();
        // 允许单引号
        // this.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
        // 字段和值都加引号
        // this.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        // 数字也加引号
        // this.configure(JsonGenerator.Feature.WRITE_NUMBERS_AS_STRINGS, true);
        // this.configure(JsonGenerator.Feature.QUOTE_NON_NUMERIC_NUMBERS,
        // true);

        //this.configure(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY, true);
        setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    }
}

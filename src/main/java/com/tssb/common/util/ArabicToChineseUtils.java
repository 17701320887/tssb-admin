package com.tssb.common.util;

/**
 * 数字转大写
 * Created by dutianzhao on 2015/7/13.
 */
public class ArabicToChineseUtils {

    public final static String zero="零";
    public final static String[] units={"","十","百","千"};
    public final static String[] nums={"","一","二","三","四","五","六","七","八","九"};

    /**
     * 1000以内数字转换
     * @param num
     * @return
     */
    public static String convert(Integer num){
        StringBuilder builder=new StringBuilder();
        if(num<100){
            builder.append(convertTen(num,false));
        }else if(num>=100 && num<1000){
            int multiple=num/100;
            int remainder=num%100;
            builder.append(nums[multiple]);
            builder.append(units[2]);
            if(remainder>=10){
                builder.append(convertTen(remainder,true));
            }else if(remainder>0){
                builder.append(zero);
                builder.append(nums[remainder]);
            }
        }
        return builder.toString();
    }

    private final static String convertTen(Integer num,boolean flag){
        StringBuilder builder=new StringBuilder();
        if(num==null){
            num=0;
        }
        if(num==0){
            builder.append(zero);
        }else if(num>0 && num<100){
            int multiple=num/10;
            int remainder=num%10;
            if(multiple>0){
                if(flag){
                    builder.append(nums[multiple]);
                }else{
                    if(multiple>1){
                        builder.append(nums[multiple]);
                    }
                }
                builder.append(units[1]);
            }
            if(remainder>0){
                builder.append(nums[remainder]);
            }
        }
        return builder.toString();
    }
}

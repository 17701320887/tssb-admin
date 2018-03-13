package com.tssb.controller.system;

import com.google.common.collect.Maps;
import com.tssb.common.util.ImageUtil;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zhenghui on 2017/5/25.
 */
@RestController
@RequestMapping("/file")
public class FileController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /*@Value("${file.upload.server.path}")
    private String realPath;
    @Value("${file.upload.size.max.image}")
    private int imageFileMaxSize;
    @Value("${path.out.image-path}")
    private String imgPath;
    @Value("${file.upload.server.user.head.path}")
    private String userHeadPath;
    *//***
     * 上传图片,大小限制为5M
     *//*
    @RequestMapping(value="/uploadImg",produces = {"text/html;charset=UTF-8"})
    @ResponseBody
    public String uploadImg(MultipartFile imgFile, HttpServletRequest request){
        try {
            Map<String,Object> map=new HashMap<String, Object>();
            if(!ImageUtil.isImage(imgFile.getOriginalFilename())){
                map.put("success", 0);
                map.put("message", "图片格式非法!");
            }else{
                map=ImageUtil.uploadUserHeadImg(imgFile, request.getSession(),"/images/","","");
            }
            JSONObject json=JSONObject.fromObject(map);
            return json.toString();
        } catch (Exception e) {
            logger.error("个人中心-上传用户图像,异常信息e:{}", e);
            return null;
        }
    }

    *//**
     * 剪切图片
     *//*
    @RequestMapping(value="/cutImg")
    @ResponseBody
    public Map<String,Object> cutImg(String relativePath,Integer x,Integer y,Integer width,Integer height,HttpServletRequest request){
        Map<String,Object> map= null;
        try {
            map = new HashMap<String, Object>();
            String minPath=relativePath.substring(0,relativePath.lastIndexOf("."))+"new.jpg";
            File file=new File(realPath+relativePath);
            if(file.exists()){
                BufferedImage bi = ImageIO.read(file);
                int srcWidth = bi.getWidth(); // 源图宽度
                int srcHeight = bi.getHeight(); // 源图高度
                ImageUtil.cutAndScaleImgNew(realPath + relativePath, realPath +minPath, x, y, width, height, 100, 100);
                request.getSession().setAttribute("userHeadImgPath", realPath + minPath);
                //file.delete();
                map.put("webPath", imgPath+"/"+minPath);
                map.put("relativePath", minPath);

                map.put("success", 1);
                map.put("message", "上传成功!");
            }else{
                map.put("success", 0);
                map.put("message", "上传失败!");
            }
        } catch (Exception e) {
            logger.error("上传图片剪切失败", e);
            map.put("success", 0);
            map.put("message", "上传失败!");
        }
        return map;
    }*/
}

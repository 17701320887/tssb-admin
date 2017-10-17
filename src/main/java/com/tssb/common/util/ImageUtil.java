package com.tssb.common.util;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by dutianzhao on 2015/7/20.
 */
public class ImageUtil {

    private final static Logger logger = LoggerFactory.getLogger(ImageUtil.class);
    /**
     * 上传个人图像并重命名，图像大小不得超过5M
     */
    public static Map<String,Object> uploadUserHeadImg(MultipartFile mf,HttpSession session) {
        Map<String,Object> map=new HashMap<String, Object>();
        try {
            if(mf.getSize()>1024*1024*5){
                map.put("success", 0);
                map.put("message", "图片大小超出限制，最大为5M!");
                return map;
            }
            String oldPath=(String) session.getAttribute("userHeadImgPath");
            if(!StringUtils.isEmpty(oldPath)){
                File file=new File(oldPath);
                if(file.exists()){
                    file.delete();
                }
            }

            if(!mf.isEmpty()){
                Date currTime = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmssS", Locale.US);
                String catePath=DateUtils.dateToString(new Date(),"yyyyMMdd")+"/";
                String newFileName=new String(format.format(currTime).getBytes("UTF-8")) + mf.getOriginalFilename();

                File file=new File(ParamUtil.imageServiceRealPath + ParamUtil.userHeadPicturePath + catePath);
                if(!file.exists() && file.isDirectory()){
                    file.mkdirs();
                }
                /*修改头像地址开始*/
                String modifyFileName = DateUtils.currFullDay(DateUtils.FORMAT_THREE);
                modifyFileName = modifyFileName.replaceAll("-",""); //去除-
                modifyFileName += getRandom5();
                modifyFileName += newFileName.substring(newFileName.indexOf('.'),newFileName.length());
                /*修改头像地址结束*/
                String realPath=ParamUtil.imageServiceRealPath + ParamUtil.userHeadPicturePath + catePath + modifyFileName;
                FileUtils.copyInputStreamToFile(mf.getInputStream(), new File(realPath));
                //scaleNoWhite(new File(realPath),realPath,320,320);
                String relativePath= ParamUtil.userHeadPicturePath + catePath + modifyFileName;
                String webPath=ParamUtil.imageServicePath + ParamUtil.userHeadPicturePath + catePath +modifyFileName;
                map.put("success", 1);
                map.put("message", "上传成功!");
                map.put("relativePath", relativePath);
                map.put("webPath", webPath);

                session.setAttribute("userHeadImgPath", realPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", 0);
            map.put("message", "上传失败!");
        }
        return map;
    }

    /**
     * 检查图像后缀名
     * @param fileName
     * @return
     */
    public static boolean isImage(String fileName){
        fileName=fileName.toLowerCase();
        if(fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".bmp") || fileName.endsWith(".bmp")){
            return true;
        }
        return false;
    }

    /**
     * 图像切割(按指定起点坐标和宽高切割)
     * @param srcImageFile 源图像地址
     * @param result 切片后的图像地址
     * @param x 目标切片起点坐标X
     * @param y 目标切片起点坐标Y
     * @param width 目标切片宽度
     * @param height 目标切片高度
     * @param scaleW 缩放的宽度
     * @param scaleH 缩放的高度
     *
     */
    public static void cut(File srcImageFile, String result,
                                 int x, int y, int width, int height,int scaleW,int scaleH) {
        try {
            // 读取源图像
            BufferedImage bi = ImageIO.read(srcImageFile);
            int srcWidth = bi.getWidth(); // 源图宽度
            int srcHeight = bi.getHeight(); // 源图高度
            if (srcWidth > 0 && srcHeight > 0) {
//                Image image = bi.getScaledInstance(srcWidth, srcHeight,
//                        Image.SCALE_DEFAULT);
                Image image = scale(srcImageFile, scaleH, scaleW, true);
                // 四个参数分别为图像起点坐标和宽高
                // 即: CropImageFilter(int x,int y,int width,int height)
                ImageFilter cropFilter = new CropImageFilter(x, y, width, height);
                Image img = Toolkit.getDefaultToolkit().createImage(
                        new FilteredImageSource(image.getSource(),
                                cropFilter));
                BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                Graphics g = tag.getGraphics();
                g.drawImage(img, 0, 0, width, height, null); // 绘制切割后的图
                g.dispose();
                // 输出为文件
                ImageIO.write(tag, "JPEG", new File(result));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void cut(String srcImageFile, String result,int x, int y, int width, int height,int scaleW,int scaleH){
        cut(new File(srcImageFile),result,x,y,width,height,scaleW,scaleH);
    }

    /**
     * 缩放图像（按高度和宽度缩放）
     * @param srcFile 源图像文件
     * @param height 缩放后的高度
     * @param width 缩放后的宽度
     * @param bb 比例不对时是否需要补白：true为补白; false为不补白;
     */
    public static Image scale(File srcFile,int height, int width, boolean bb) {
        Image itemp = null;
        try {
            double ratio = 0.0; // 缩放比例
            BufferedImage bi = ImageIO.read(srcFile);
            itemp = bi.getScaledInstance(width, height, BufferedImage.SCALE_SMOOTH);
            // 计算比例
            if ((bi.getHeight() > height) || (bi.getWidth() > width)) {
                if (bi.getHeight() > bi.getWidth()) {
                    ratio = (new Integer(height)).doubleValue()
                            / bi.getHeight();
                } else {
                    ratio = (new Integer(width)).doubleValue() / bi.getWidth();
                }
                AffineTransformOp op = new AffineTransformOp(AffineTransform
                        .getScaleInstance(ratio, ratio), null);
                itemp = op.filter(bi, null);
            }
            if (bb) {//补白
                BufferedImage image = new BufferedImage(width, height,
                        BufferedImage.TYPE_INT_RGB);
                Graphics2D g = image.createGraphics();
                g.setColor(Color.white);
                g.fillRect(0, 0, width, height);
                if (width == itemp.getWidth(null))
                    g.drawImage(itemp, 0, (height - itemp.getHeight(null)) / 2,
                            itemp.getWidth(null), itemp.getHeight(null),
                            Color.white, null);
                else
                    g.drawImage(itemp, (width - itemp.getWidth(null)) / 2, 0,
                            itemp.getWidth(null), itemp.getHeight(null),
                            Color.white, null);
                g.dispose();
                itemp = image;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return itemp;
    }


    /**
     * 图片截取
     *
     * @param file 图片
     * @param newName 新名称
     * @param path 保存路径
     * @param x 坐标
     * @param y 坐标
     * @param width 原图宽
     * @param height 原图高
     * @return author:ranling 2013-03-06 18:02:50
     */
    public static File cutting(File file, String newName, String path, int x,
                               int y, int width, int height) {

        ImageOutputStream out = null;
        InputStream is = null;
        ImageInputStream iis = null;
        try {
            String endName = file.getName();
            endName = endName.substring(endName.lastIndexOf(".") + 1);
            Iterator<ImageReader> readers = ImageIO
                    .getImageReadersByFormatName(endName);
            ImageReader reader = (ImageReader) readers.next();
            is = new FileInputStream(file);
            iis = ImageIO.createImageInputStream(is);
            reader.setInput(iis, true);

            ImageReadParam param = reader.getDefaultReadParam();
            Rectangle rect = new Rectangle(x, y, width, height);
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            File newFile = new File(path);

            if (!newFile.exists())
                newFile.mkdirs();
            newFile = new File(path, newName);
            out = ImageIO
                    .createImageOutputStream(new FileOutputStream(newFile));
            ImageIO.write(bi, endName, out);
            file = newFile;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                iis.close();
                is.close();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
        return file;
    }

    public static  String uploadImg(MultipartFile mf, String realpath, String relativePath) {
        Date currTime = new Date();
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyyMMddhhmmssS",
                Locale.US);
        String fileLocal = null;
        if (!mf.isEmpty()) {
            String fileName = null;
            try {
                fileName = new String(formatter2.format(currTime).getBytes("utf-8"))
                        + mf.getOriginalFilename();
            } catch (UnsupportedEncodingException e1) {
                e1.printStackTrace();
            }
            try {
                FileUtils.copyInputStreamToFile(mf.getInputStream(), new File(
                        realpath + fileName));
                fileLocal = realpath + fileName + "#" + relativePath + fileName;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileLocal;
    }

    /**
     * 缩放图像（按高度和宽度缩放）且不填充空白部分
     * @param srcFile 源图像文件
     * @param result 缩放后图像文件
     * @param height 缩放后的高度
     * @param width 缩放后的宽度
     */
    public static void scaleNoWhite(File srcFile,String result,int height, int width) {
        try {
            Image itemp = null;
            double ratio = 0.0; // 缩放比例
            BufferedImage bi = ImageIO.read(srcFile);

            // 计算比例
            if ((bi.getHeight() > height) || (bi.getWidth() > width)) {
                if (bi.getHeight() > bi.getWidth()) {
                    ratio = (new Integer(height)).doubleValue()
                            / bi.getHeight();
                    width=(height*bi.getWidth())/bi.getHeight();
                } else {
                    ratio = (new Integer(width)).doubleValue() / bi.getWidth();
                    height=(width*bi.getHeight())/bi.getWidth();
                }
                itemp = bi.getScaledInstance(width, height, BufferedImage.SCALE_SMOOTH);
                AffineTransformOp op = new AffineTransformOp(AffineTransform
                        .getScaleInstance(ratio, ratio), null);
                itemp = op.filter(bi, null);
            }

            BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics g = tag.getGraphics();
            g.drawImage(itemp, 0, 0, width, height, null); // 绘制切割后的图
            g.dispose();
            // 输出为文件
            ImageIO.write(tag, "JPEG", new File(result));
        } catch (IOException e) {
            logger.error("个人图像上传缩放失败", e);
        }
    }

    /**
     * 剪切并缩放图片 2015-08-18 新版
     * @param srcPath
     * @param newPath
     * @param x
     * @param y
     * @param width
     * @param height
     * @param newWidth
     * @param newHeight
     */
    public static void cutAndScaleImgNew(String srcPath,String newPath,int x,int y,int width,int height,int newWidth,int newHeight){
        try {
            Thumbnails.of(srcPath).outputQuality(1.0F).sourceRegion(x, y, width, height).size(newWidth, newHeight).keepAspectRatio(false).toFile(newPath);
        } catch (IOException e) {
            logger.error("剪切并缩放图片失败",e);
        }
    }

    public static void cutImgNew(String srcPath,String newPath,int x,int y,int width,int height){
        try {
            Thumbnails.of(srcPath).outputQuality(1.0F).sourceRegion(x, y, width, height).keepAspectRatio(false).toFile(newPath);
        } catch (IOException e) {
            logger.error("剪切图片失败",e);
        }
    }

    public static void scaleImgNew(String srcPath,String newPath,int width,int height){
        try {
            Thumbnails.of(srcPath).outputQuality(1.0F).size(width, height).keepAspectRatio(false).toFile(newPath);
        } catch (IOException e) {
            logger.error("剪切图片失败",e);
        }
    }

    /**
     * 获取5位随机数字
     * @return
     */
    public static Long getRandom5(){
        return Math.round(Math.random() * 89999 + 10000);
    }
}

package com.tssb.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by dutianzhao on 2015/8/31.
 */
@Component
public class RedisCacheUtil {

    private final static Logger logger = LoggerFactory.getLogger(RedisCacheUtil.class);

    @Resource
    private RedisTemplate redisTemplate;

    private static String cacheName="cacheFast:";

    /**
     * 缓存内容：该课程下用户做过笔记的讲座ID
     * @param courseId 课程ID
     * @param userId 用户ID
     */
    public void deleteNoteLectureIds(Long courseId, Long userId) {
        //key video.course.note.lectureIds.{courseId}.{userId}
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(cacheName+"video.course.note.lectureIds.");
            if (userId != null && courseId != null) {
                builder.append(courseId).append(".").append(userId);
                redisTemplate.delete(builder.toString());
            } else if (courseId != null && userId == null) {
                builder.append(courseId).append(".*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            } else if (courseId == null && userId != null) {
                builder.append("*.").append(userId);
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }else{
                builder.append("*.*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }
        } catch (Exception e) {
            logger.error("redis cache error",e);
        }
    }

    /**
     * 缓存内容：用户该课程下已观看的讲座ID
     * @param courseId 课程ID
     * @param userId 用户ID
     */
    public void deleteViewLectureIds(Long courseId, Long userId) {
        //key video.course.userTakingHistory.lectureIds.{courseId}.{userId}
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(cacheName+"video.course.userTakingHistory.lectureIds.");
            if (userId != null && courseId != null) {
                builder.append(courseId).append(".").append(userId);
                redisTemplate.delete(builder.toString());
            } else if (courseId != null && userId == null) {
                builder.append(courseId).append(".*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            } else if (courseId == null && userId != null) {
                builder.append("*.").append(userId);
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }else{
                builder.append("*.*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }
        } catch (Exception e) {
            logger.error("redis cache error", e);
        }
    }

    /**
     * 缓存内容：该sku下该用户每个课程的最后观看时间
     * @param sku
     * @param userId
     */
    public void deleteVideoViewDate(Long sku, Long userId){
        //key video.course.viewDate.{sku}.{userId}
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(cacheName+"video.course.viewDate.");
            if(sku!=null && userId!=null){
                builder.append(sku).append(".").append(userId);
                redisTemplate.delete(builder.toString());
            }else if(sku!=null && userId==null){
                builder.append(sku).append(".*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }else if(sku==null && userId!=null){
                builder.append("*.").append(userId);
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }else{
                builder.append("*.*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }
        } catch (Exception e) {
            logger.error("redis cache error", e);
        }
    }

    /**
     * 缓存内容：该用户每个课程学习的讲座数
     * @param userId
     */
    public void deleteStudyProgress(Long userId){
        //key video.course.studyProgress.{userId}
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(cacheName+"video.course.studyProgress.");
            if(userId!=null){
                builder.append(userId);
                redisTemplate.delete(builder.toString());
            }else{
                builder.append("*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }
        } catch (Exception e) {
            logger.error("redis cache error", e);
        }
    }

    /**
     * 缓存内容：用户做过笔记的课程id
     * @param userId
     */
    public void deleteNoteCourseIds(Long userId){
        //key video.note.courseIds.{userId}
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(cacheName+"video.note.courseIds.");
            if(userId!=null){
                builder.append(userId);
                redisTemplate.delete(builder.toString());
            }else{
                builder.append("*");
                Set<String> keys = redisTemplate.keys(builder.toString());
                redisTemplate.delete(keys);
            }
        } catch (Exception e) {
            logger.error("redis cache error",e);
        }
    }

    public void setRedisTemplate(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
}

package com.cleveronion.knowgraph.common.controller;

import com.cleveronion.knowgraph.common.core.domain.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 文件上传控制器
 */
@Slf4j
@RestController
@RequestMapping("/upload")
public class UploadController {

    @Value("${file.upload.path:./uploads}")
    private String uploadPath;

    @Value("${file.upload.domain:http://localhost:8080}")
    private String domain;

    /**
     * 上传头像
     */
    @PostMapping("/avatar")
    public R<Map<String, String>> uploadAvatar(@RequestParam("avatar") MultipartFile file) {
        return uploadFile(file, "avatar");
    }

    /**
     * 通用文件上传
     */
    @PostMapping("/file")
    public R<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                            @RequestParam(value = "type", defaultValue = "image") String type) {
        try {
            // 验证文件
            if (file.isEmpty()) {
                return R.fail("文件不能为空");
            }

            // 验证文件类型
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                return R.fail("文件名不能为空");
            }

            String extension = getFileExtension(originalFilename);
            if (!isValidImageExtension(extension)) {
                return R.fail("只支持 jpg、jpeg、png、gif 格式的图片");
            }

            // 验证文件大小（2MB）
            if (file.getSize() > 2 * 1024 * 1024) {
                return R.fail("文件大小不能超过2MB");
            }

            // 创建上传目录
            String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            String typeDir = "avatar".equals(type) ? "avatars" : "images";
            String relativePath = typeDir + "/" + dateStr;
            Path uploadDir = Paths.get(uploadPath, relativePath);
            
            // 确保目录存在，如果不存在则创建
            try {
                Files.createDirectories(uploadDir);
                log.info("创建上传目录: {}", uploadDir.toAbsolutePath());
            } catch (IOException e) {
                log.error("创建上传目录失败: {}", uploadDir.toAbsolutePath(), e);
                return R.fail("创建上传目录失败: " + e.getMessage());
            }

            // 生成新文件名
            String newFilename = UUID.randomUUID().toString() + "." + extension;
            Path filePath = uploadDir.resolve(newFilename);

            // 保存文件
            file.transferTo(filePath.toFile());

            // 构建访问URL
            String url = domain + "/uploads/" + relativePath + "/" + newFilename;

            Map<String, String> result = new HashMap<>();
            result.put("url", url);
            result.put("filename", newFilename);
            result.put("originalName", originalFilename);
            result.put("size", String.valueOf(file.getSize()));

            log.info("文件上传成功: {}", url);
            return R.ok(result);

        } catch (IOException e) {
            log.error("文件上传失败", e);
            return R.fail("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 获取文件扩展名
     */
    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }

    /**
     * 验证是否为有效的图片扩展名
     */
    private boolean isValidImageExtension(String extension) {
        return "jpg".equals(extension) || "jpeg".equals(extension) || 
               "png".equals(extension) || "gif".equals(extension);
    }
}
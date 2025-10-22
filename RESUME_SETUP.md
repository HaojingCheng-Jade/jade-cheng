# 简历PDF设置指南

## 如何添加简历PDF文件

### 方法一：直接复制文件（推荐）

1. 将你的简历PDF文件重命名为以下名称之一：
   - `data-scientist-resume.pdf` (数据科学家简历)
   - `data-analyst-resume.pdf` (数据分析师简历)  
   - `ml-engineer-resume.pdf` (机器学习工程师简历)

2. 将PDF文件复制到 `resume/` 文件夹中

3. 确保文件名与HTML中的链接完全匹配

### 方法二：使用命令行

```bash
# 进入项目目录
cd /Users/haojingcheng/Desktop/jade-cheng-website

# 复制PDF文件到resume文件夹
cp /path/to/your/resume.pdf resume/data-scientist-resume.pdf
```

### 方法三：在线存储（可选）

如果你希望将PDF存储在云端，可以：

1. 上传PDF到Google Drive、Dropbox等云存储
2. 获取公开分享链接
3. 修改HTML中的链接地址

例如：
```html
<a href="https://drive.google.com/file/d/YOUR_FILE_ID/view" class="resume-link" target="_blank" download>
```

## 文件结构

```
jade-cheng-website/
├── resume/
│   ├── data-scientist-resume.pdf
│   ├── data-analyst-resume.pdf
│   └── ml-engineer-resume.pdf
├── index.html
├── styles.css
└── script.js
```

## 注意事项

- PDF文件名必须与HTML中的链接完全匹配
- 确保PDF文件大小合理（建议小于5MB）
- 测试所有链接是否正常工作
- 考虑为不同设备优化PDF显示

## 测试

1. 在浏览器中打开 `index.html`
2. 滚动到"联系方式"部分
3. 点击简历下载链接
4. 确认PDF能够正常下载和打开

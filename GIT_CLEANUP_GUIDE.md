# Git 历史敏感信息清理指南

## ⚠️ 重要警告

**此操作将永久修改 Git 历史记录！**  
执行前请确保：
- 已备份整个仓库
- 团队成员知晓此操作
- 所有分支已推送并同步

## 🎯 清理目标

需要从 Git 历史中移除的敏感信息：
- 硬编码的 `APP_ID: '3036081'`
- 硬编码的 `ENCRYPT_KEY: '5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841'`

## 📋 操作步骤

### 1. 安装 BFG Repo-Cleaner

```bash
# 下载 BFG Jar 文件
wget -O bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 或使用 curl
curl -L -o bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
```

### 2. 备份仓库

```bash
# 创建完整备份
git clone --mirror git@github.com:eagle-a/zhanming-blog-new.git backup-repo
```

### 3. 清理敏感信息

```bash
# 进入仓库目录
cd /path/to/zhanming-blog-new

# 清理硬编码的 APP_ID
java -jar bfg.jar --replace-text --find-string "3036081" .

# 清理硬编码的 ENCRYPT_KEY
java -jar bfg.jar --replace-text --find-string "5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841" .
```

### 4. 清理空提交

```bash
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### 5. 强制推送清理后的历史

```bash
git push origin --force --all
git push origin --force --tags
```

### 6. 验证清理结果

```bash
# 检查历史中是否还有敏感信息
git log -S "3036081" --source --all
git log -S "5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841" --source --all

# 应该返回空结果
```

## 🔧 替代方案（如果 BFG 不可用）

### 使用 git-filter-repo

```bash
# 安装 git-filter-repo
pip install git-filter-repo

# 创建替换脚本
cat > replace-secrets.py << 'EOF'
import re
from git_filter_repo import Blob

def blob_callback(blob: Blob):
    if blob.data:
        # 替换 APP_ID
        blob.data = blob.data.replace(b'3036081', b'REMOVED_APP_ID')
        # 替换 ENCRYPT_KEY  
        blob.data = blob.data.replace(b'5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841', b'REMOVED_ENCRYPT_KEY')

EOF

# 执行清理
git-filter-repo --blob-callback 'blob_callback(blob)'
```

## 📝 清理后操作

1. **通知团队成员**：需要重新克隆仓库
2. **更新 CI/CD**：确保流水线使用清理后的历史
3. **检查依赖**：确认没有工具依赖旧的提交哈希

## ⚡ 快速命令汇总

```bash
# 1. 下载 BFG
wget -O bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. 备份
git clone --mirror git@github.com:eagle-a/zhanming-blog-new.git backup-repo

# 3. 清理
java -jar bfg.jar --replace-text --find-string "3036081" .
java -jar bfg.jar --replace-text --find-string "5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841" .

# 4. 清理垃圾
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# 5. 强制推送
git push origin --force --all
git push origin --force --tags

# 6. 验证
git log -S "3036081" --source --all
git log -S "5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841" --source --all
```

## 🚨 注意事项

- 此操作不可逆，请谨慎执行
- 清理后所有协作者需要重新克隆
- 如果有 PR 或 fork，可能需要特殊处理
- 建议在测试仓库先练习操作流程

---

**执行完成后，请更新安全报告中的状态。**

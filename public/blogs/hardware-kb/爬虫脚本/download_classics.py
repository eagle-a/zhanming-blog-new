import os
import urllib.request
import ssl

# 忽略 SSL 证书验证（仅为防止部分网络环境下的证书报错）
ssl._create_default_https_context = ssl._create_unverified_context

# 使用相对路径，基于脚本所在目录向上查找项目根目录
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(script_dir))
download_dir = os.path.join(project_root, "hardware-kb", "经典PDF原厂手册")
os.makedirs(download_dir, exist_ok=True)

# 业界主流的、公认的“好东西”（原厂经典应用笔记、白皮书）
classic_docs = {
    # TI的运算放大器圣经（老版本，直接开放下载）
    "TI_OpAmps_For_Everyone.pdf": "https://www.ti.com/lit/an/slod006b/slod006b.pdf",
    
    # ADI 关于接地设计的封神之作
    "ADI_MT-031_Grounding.pdf": "https://www.analog.com/media/en/training-seminars/tutorials/MT-031.pdf",
    
    # ADI 关于去耦电容设计的经典指南
    "ADI_MT-086_Decoupling.pdf": "https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf",
}

print("开始为您下载业界主流的经典硬件参考文档...")
for filename, url in classic_docs.items():
    filepath = os.path.join(download_dir, filename)
    if not os.path.exists(filepath):
        try:
            print(f"正在下载 {filename}...")
            # 伪装User-Agent防屏蔽
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=30) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            print(f"[成功] -> {filepath}")
        except Exception as e:
            print(f"[失败] {filename}: {e}")
    else:
        print(f"[跳过] 文件已存在: {filepath}")

print("下载任务完成！请检查目录。")

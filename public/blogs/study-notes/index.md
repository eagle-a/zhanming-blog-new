# 学习笔记 - 湛明

**日期**: 2026-01-25

**标签**: 笔记

---

来自分类 [学习笔记](/category/67e8ea6ef6369e8d49adeba4)2026-01-25 16:47:31

[AI玩马里奥记录](/article/6975d8a3fef024d66874e5c6)

# AI玩马里奥记录 感谢up主详细的视频！φ(゜▽゜*)♪。记录一下使用强化学习玩马里奥时运行代码的全过程。 ## 安装依赖 ### 1. 创建并激活新环境 ```bash # 创建新环境（指定Python版本3.8.8） conda create -n RL_mario_for_learn python=3.8.8 # 注：网络异常时可关闭小猫加速器重试 # 激活新环境 conda activate RL_mario_for_learn # 查看已安装包（可选） conda list ``` ### 2. 降低依赖包版本（适配低版本gym和sb3） ```bash # 降低setuptools版本 pip install setuptools==65.5.0 # 降低wheel版本 pip install wheel==0.38.4 # 降低pip版本（解决玄学问题） python.exe -m pip install pip==20.2.4 ``` ### 3. 安装项目依赖包 ```bash # 进入项目文件夹（cd命令失败时用cd /d） cd /d F:\RL...

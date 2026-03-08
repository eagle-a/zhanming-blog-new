# AI玩马里奥记录

**日期**: 2026-03-08

**标签**: 笔记

---

感谢up主详细的视频！φ(゜▽゜*)♪。记录一下使用强化学习玩马里奥时运行代码的全过程。

## 安装依赖

### 1\. 创建并激活新环境
    
    
    # 创建新环境（指定Python版本3.8.8）
    conda create -n RL_mario_for_learn python=3.8.8
    # 注：网络异常时可关闭小猫加速器重试
    
    # 激活新环境
    conda activate RL_mario_for_learn
    
    # 查看已安装包（可选）
    conda list


### 2\. 降低依赖包版本（适配低版本gym和sb3）
    
    
    # 降低setuptools版本
    pip install setuptools==65.5.0
    
    # 降低wheel版本
    pip install wheel==0.38.4
    
    # 降低pip版本（解决玄学问题）
    python.exe -m pip install pip==20.2.4
    

### 3\. 安装项目依赖包
    
    
    # 进入项目文件夹（cd命令失败时用cd /d）
    cd /d F:\RL_SuperMario-main
    
    # 安装requirements.txt中的依赖
    pip install -r requirements.txt
    

#### 常见错误及解决（nes-py安装失败）

**错误原因** ：  
nes-py 底层依赖 fceux-lib，需要编译 C++ 代码，而Windows系统默认无C/C++编译器，报错关键行：  
`error: Microsoft Visual C++ 14.0 or greater is required.`

**解决方案** ：

         
         Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))


验证安装：`choco -v`（显示版本号则成功）

         
         choco install visualstudio2022buildtools --package-parameters "--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"

（安装耗时10-30分钟，完成后重启电脑）

         
         conda activate RL_mario_for_learn
         cd /d F:\RL_SuperMario-main
         pip install -r requirements.txt
         

1  
2  
3  


### 4\. 安装适配的PyTorch版本

#### 4.1 确认环境
    
    
    # 查看NVIDIA显卡CUDA版本（有NVIDIA显卡时）
    nvidia-smi
    # 无NVIDIA显卡则直接安装CPU版PyTorch
    

1  
2  
3  


#### 4.2 下载安装

  * 推荐镜像源：https://mirrors.aliyun.com/pytorch-wheels/cu117/
  * 验证安装：
        
        import torch 
        # 查看PyTorch版本 
        print(torch.__version__) 
        # 检查CUDA是否可用 
        print(torch.cuda.is_available())  
        # 查看CUDA版本 
        print(torch.version.cuda) 
        

1  
2  
3  
4  
5  
6  
7  


### 5\. 安装TensorBoard（可视化训练过程）
    
    
    pip install tensorboard
    

## 运行代码

项目链接：https://github.com/jusway/RL_SuperMario

### 1\. 准备项目环境

  1. 下载项目源码并解压
  2. 在PyCharm中打开项目
  3. 配置解释器：选择已创建的`RL_mario_for_learn` conda环境（右下角切换或通过`add new interpreter`添加）


### 2\. 测试与运行

  1. **测试马里奥运行** ：右键运行`test/test_mario.py`
  2. **测试预训练模型** ：右键运行`test_model.py`（默认加载`monitor_log/best_model/best_model.zip`，修改路径可测试自定义模型）
  3. **训练自定义模型** ：右键运行`train.py`（训练耗时较长，耐心等待）


### 3\. 实时观测训练过程
    
    
    # 启动TensorBoard（日志文件存于tensorboard_log文件夹）
    tensorboard --logdir=tensorboard_log
    

1  
2  


启动后访问链接：`http://localhost:6006/` 即可查看训练指标可视化结果。

### 总结

  1. 安装失败核心问题是Windows缺少C++编译环境，需安装Visual Studio构建工具解决nes-py编译问题；
  2. PyTorch需根据显卡CUDA版本适配，无GPU则安装CPU版；
  3. TensorBoard可实时监控训练过程，通过`tensorboard --logdir`命令启动即可访问可视化界面。
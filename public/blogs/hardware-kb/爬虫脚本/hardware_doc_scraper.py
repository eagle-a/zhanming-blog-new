import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

class HardwareDocScraper:
    def __init__(self, download_dir):
        self.download_dir = download_dir
        if not os.path.exists(self.download_dir):
            os.makedirs(self.download_dir)
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }

    def fetch_page_links(self, url, file_extension=".pdf"):
        """抓取目标网页上的指定后缀(默认PDF)的文件链接"""
        try:
            print(f"正在访问网页: {url}")
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            links = soup.find_all('a')
            
            pdf_links = []
            for link in links:
                href = link.get('href')
                if href and file_extension in href.lower():
                    full_url = urljoin(url, href)
                    pdf_links.append((link.text.strip(), full_url))
                    
            return list(set(pdf_links)) # 去重
        except Exception as e:
            print(f"获取网页 {url} 失败: {e}")
            return []

    def download_file(self, url, filename=None):
        """下载单个文件"""
        if not filename:
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename:
                filename = "document.pdf"
                
        # 移除非法字符
        safe_filename = "".join([c for c in filename if c.isalpha() or c.isdigit() or c in (' ', '.', '-', '_')]).rstrip()
        file_path = os.path.join(self.download_dir, safe_filename)
        
        if os.path.exists(file_path):
            print(f"文件已存在, 跳过: {safe_filename}")
            return
            
        try:
            print(f"正在下载: {safe_filename}  <-- {url}")
            response = requests.get(url, headers=self.headers, stream=True, timeout=15)
            response.raise_for_status()
            
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print(f"下载成功: {file_path}")
        except Exception as e:
            print(f"下载失败 {url}: {e}")

if __name__ == "__main__":
    # 使用示例
    # 假设需要从某个开源硬件知识库或应用笔记目录抓取
    target_url = "https://example-hardware-site.com/application-notes" 
    
    scraper = HardwareDocScraper(download_dir="downloads/instruments_docs")
    pdf_links = scraper.fetch_page_links(target_url, file_extension=".pdf")
    
    print(f"共找到 {len(pdf_links)} 个PDF文档链接")
    for name, link in pdf_links[:5]: # 为了安全起见这里只演示前5个
        print(f"发现文档: {name} -> {link}")
        # scraper.download_file(link, f"{name}.pdf" if name else None)

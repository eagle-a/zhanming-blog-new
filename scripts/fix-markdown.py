#!/usr/bin/env python3
"""
修复 markdown 文件中的孤立数字行问题
这些数字看起来像是代码块的行号，但被错误地放在了代码块外面
"""

import os
from pathlib import Path

def fix_markdown_file(filepath):
    """修复单个 markdown 文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    lines = content.split('\n')

    # 定义孤立的数字集合
    isolated_numbers = {'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                       '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'}

    new_lines = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 检查是否是孤立的数字行
        if stripped in isolated_numbers:
            # 检查这是否是一个数字块的开始（连续的孤立数字行）
            # 向前看：收集所有连续的孤立数字行
            number_block = []
            j = i
            while j < len(lines) and lines[j].strip() in isolated_numbers:
                number_block.append(lines[j])
                j += 1

            # 如果找到了一个数字块（至少一行）
            if number_block:
                # 检查数字块前后的上下文
                prev_idx = i - 1
                next_idx = j

                prev_is_empty_or_boundary = prev_idx < 0 or lines[prev_idx].strip() == ''
                next_is_empty_or_boundary = next_idx >= len(lines) or lines[next_idx].strip() == ''

                # 如果数字块前后都是空行（或边界），则删除整个数字块
                if prev_is_empty_or_boundary and next_is_empty_or_boundary:
                    # 跳过这些数字行（不添加到 new_lines）
                    i = j
                    continue

        new_lines.append(line)
        i += 1

    # 第二步：清理多余的空行（超过2个连续空行压缩为2个）
    final_lines = []
    empty_count = 0

    for line in new_lines:
        if line.strip() == '':
            empty_count += 1
            if empty_count <= 2:
                final_lines.append(line)
        else:
            empty_count = 0
            final_lines.append(line)

    # 移除文件末尾的多余空行
    while final_lines and final_lines[-1].strip() == '':
        final_lines.pop()

    new_content = '\n'.join(final_lines)

    # 如果内容有变化，写回文件
    if new_content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True

    return False

def main():
    blogs_dir = Path('C:/Users/zm/Desktop/project/zhanming-blog-new/public/blogs')

    fixed_count = 0
    for md_file in blogs_dir.rglob('*.md'):
        if fix_markdown_file(md_file):
            print(f"已修复: {md_file}")
            fixed_count += 1

    print(f"\n总共修复了 {fixed_count} 个文件")

if __name__ == '__main__':
    main()

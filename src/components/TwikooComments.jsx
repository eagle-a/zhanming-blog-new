// src/components/TwikooComments.jsx
'use client';
import { useEffect, useRef } from 'react';
import { useConfigStore } from '@/app/(home)/stores/config-store';
import { useLanguage } from '@/i18n/context';

export default function TwikooComments({ path }) {
  const containerRef = useRef(null);
  const { siteContent } = useConfigStore();
  const { language } = useLanguage();

  useEffect(() => {
    const envId = siteContent.twikoo?.envId;
    if (!envId || !containerRef.current) return;

    // 动态加载 Twikoo
    const loadTwikoo = async () => {
      try {
        const twikoo = await import('twikoo');
        const { init } = twikoo.default || twikoo;

        init({
          el: containerRef.current,
          envId: envId,
          path: path || window.location.pathname,
          lang: language === 'zh-CN' ? 'zh-CN' : language,
          // 可选配置
          region: siteContent.twikoo?.region || 'ap-guangzhou',
        });
      } catch (error) {
        console.error('Twikoo 加载失败:', error);
      }
    };

    loadTwikoo();

    return () => {
      // 清理 Twikoo 实例
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [path, language, siteContent.twikoo]);

  return (
    <div className="twikoo-comments">
      <div ref={containerRef} />
    </div>
  );
}

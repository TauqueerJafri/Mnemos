import { useEffect, useState } from 'react';
import { api } from '../config';
import type { ContentItem } from '../utils/contentConfig';

export function useContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContent() {
    try {
      const res = await api.get('/content');
      setContent(res.data.content);
    } catch (e) {
      console.error('Failed to fetch content', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, loading, refresh: fetchContent };
}

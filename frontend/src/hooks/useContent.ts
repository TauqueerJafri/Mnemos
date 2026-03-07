import { useEffect, useState } from 'react';
import { api, BACKEND_URL } from '../config';
import type { ContentItem } from '../utils/contentConfig';

export function useContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContent() {
    try {
      const res = await api.get(`${BACKEND_URL}/api/v1/content`);
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

  async function deleteContent(contentId: string) {
    try {
      await api.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId }
      });
      setContent(prev => prev.filter(item => item._id !== contentId));
    } catch (e) {
      console.error('Failed to delete content', e);
    }
  }

  return { content, loading, refresh: fetchContent, deleteContent };
}

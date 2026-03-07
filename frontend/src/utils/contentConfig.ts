// Content configuration for different content types
import { FileText, Youtube, Twitter, Link as LinkIcon } from 'lucide-react';

// Content type union
export type ContentType = 'tweets' | 'videos' | 'documents' | 'links';
export type ColorVariant = 'blueLight' | 'blue' | 'blueDeep';

// Maps content types to their icons, labels, and styles
export const typeConfig = {
  documents: {
    icon: FileText,
    label: 'Document',
    hoverColor: 'blueLight' as const,
    iconColor: 'group-hover:text-blue-300',
  },
  videos: {
    icon: Youtube,
    label: 'Video',
    hoverColor: 'blueDeep' as const,
    iconColor: 'group-hover:text-blue-500',
  },
  tweets: {
    icon: Twitter,
    label: 'Tweet',
    hoverColor: 'blue' as const,
    iconColor: 'group-hover:text-blue-400',
  },
  links: {
    icon: LinkIcon,
    label: 'Link',
    hoverColor: 'blue' as const,
    iconColor: 'group-hover:text-blue-400',
  },
};

// Derived array of content types used by AddContentModal.
export const CONTENT_TYPES = (Object.keys(typeConfig) as ContentType[]).map((key) => ({
  id: key,
  label: typeConfig[key].label,
  icon: typeConfig[key].icon,
}));

// Interface for content items returned from the backend
export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
  tags: string[];
  userId: String;
  createdAt: string;
}

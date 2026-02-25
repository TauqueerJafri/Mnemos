import { useState } from 'react';
import { Share2, X, Link as LinkIcon } from 'lucide-react';
import { Tag } from './Tag';
import { getYouTubeEmbedUrl } from '../../utils/youtube';
import { typeConfig, type ContentType } from '../../utils/contentConfig';

export interface CardProps {
  title: string;
  link: string;
  type: ContentType;
  tags?: string[];
  date?: string;
  onShare?: () => void;
  onDelete?: () => void;
}

export function Card({ title, link, type, tags = [], date, onShare, onDelete }: CardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const config = typeConfig[type] || typeConfig.links;
  const Icon = config.icon;
  const hoverColor = config.hoverColor;

  const hoverColors = {
    blueLight: "hover:border-blue-400/30 from-blue-300 to-blue-500",
    blue: "hover:border-blue-500/30 from-blue-400 to-blue-600",
    blueDeep: "hover:border-blue-600/30 from-blue-500 to-blue-700"
  };

  const embedUrl = type === 'videos' ? getYouTubeEmbedUrl(link) : link;

  return (
    <div 
      className={`group bg-[#111111] p-6 rounded-2xl border border-gray-800 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col ${hoverColors[hoverColor].split(' ')[0]}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${hoverColors[hoverColor].split(' ').slice(1).join(' ')} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-[#1a1a1a] rounded-lg text-gray-400 transition-colors ${config.iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-400">{config.label}</span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onShare && (
            <button onClick={onShare} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-colors">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-50 transition-colors">
        {title}
      </h3>

      {/* Content specific rendering based on type */}
      {type === 'videos' && (
        <div className="bg-[#1a1a1a] rounded-xl h-40 mb-6 flex items-center justify-center border border-gray-800/50 group-hover:border-blue-600/20 transition-colors relative overflow-hidden">
          {isVideoPlaying ? (
            <iframe 
              className="w-full h-full"
              src={`${embedUrl}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent" />
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors z-10 cursor-pointer"
              >
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-white border-b-[6px] border-b-transparent ml-1" />
              </button>
            </>
          )}
        </div>
      )}

      {type === 'tweets' && (
        <div className="relative mb-6">
          <div className="absolute -left-2 -top-2 text-4xl text-gray-800 font-serif">"</div>
          <p className="text-gray-300 leading-relaxed relative z-10 pl-4 border-l-2 border-gray-800 group-hover:border-blue-500/50 transition-colors line-clamp-4">
            <a href={link} target="_blank"  className="hover:text-blue-400 transition-colors break-all">
              {link}
            </a>
          </p>
        </div>
      )}

      {(type === 'documents' || type === 'links') && (
        <div className="mb-6">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2 break-all">
            <LinkIcon className="w-4 h-4 shrink-0" />
            <span className="line-clamp-2">{link}</span>
          </a>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} color={hoverColor}>#{tag}</Tag>
          ))}
        </div>
        {date && <p className="text-xs text-gray-600 shrink-0 ml-4">{date}</p>}
      </div>
    </div>
  );
}

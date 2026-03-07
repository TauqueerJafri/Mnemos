import { useState } from 'react';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface YoutubeEmbedProps {
  link: string;
}

export function YoutubeEmbed({ link }: YoutubeEmbedProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(link);

  return (
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
  );
}

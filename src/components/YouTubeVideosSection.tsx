
import React from 'react';
import { Youtube } from 'lucide-react';
import YouTubeVideoCard from './YouTubeVideoCard';

interface Video {
  title: string;
  description: string;
  videoUrl: string;
  author?: string;
}

interface YouTubeVideosSectionProps {
  title?: string;
  description?: string;
  videos: Video[];
  className?: string;
}

const YouTubeVideosSection: React.FC<YouTubeVideosSectionProps> = ({
  title = "Doporučená videa",
  description = "Vzdělávací obsah od předních odborníků",
  videos,
  className = ""
}) => {
  return (
    <div className={`animate-fade-in ${className}`}>
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg">
          <Youtube className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <YouTubeVideoCard
            key={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
            author={video.author}
          />
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideosSection;

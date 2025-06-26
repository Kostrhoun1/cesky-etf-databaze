
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Youtube } from 'lucide-react';

interface YouTubeVideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  author?: string;
}

const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({
  title,
  description,
  videoUrl,
  thumbnail,
  author
}) => {
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);
  const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all h-full">
      <div className="relative">
        {thumbnailUrl && (
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-red-600 text-white rounded-full p-3">
                <Youtube className="w-8 h-8" />
              </div>
            </div>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </CardTitle>
        {author && (
          <p className="text-sm text-gray-500">{author}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            Sledovat na YouTube
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default YouTubeVideoCard;

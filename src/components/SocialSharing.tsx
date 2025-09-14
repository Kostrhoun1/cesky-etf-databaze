import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface SocialSharingProps {
  url: string;
  title: string;
  description: string;
  className?: string;
  shareTitle?: string;
  shareText?: string;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ 
  url, 
  title, 
  description, 
  className = '',
  shareTitle = "Sdílejte článek",
  shareText = "Pomozte ostatním s investováním - sdílejte tento užitečný obsah"
}) => {
  const [copied, setCopied] = useState(false);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      copyToClipboard();
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {shareTitle}
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          {shareText}
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            <Linkedin className="w-4 h-4 text-blue-700" />
            LinkedIn
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('copy')}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Zkopírováno!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-600" />
                Kopírovat URL
              </>
            )}
          </Button>
        </div>
        
        {/* Metadata pro lepší sdílení */}
        <div className="mt-4 p-3 bg-white rounded-lg border text-sm">
          <div className="font-medium text-gray-900 mb-1">{title}</div>
          <div className="text-gray-600">{description}</div>
          <div className="text-blue-600 font-mono text-xs mt-2">{url}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialSharing;
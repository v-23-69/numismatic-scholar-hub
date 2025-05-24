import { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';

interface AvatarUploaderProps {
  avatarUrl?: string;
  onAvatarChange: (file: File, previewUrl: string) => void;
  isUploading: boolean;
  name?: string;
  email?: string;
}

const AvatarUploader = ({ 
  avatarUrl, 
  onAvatarChange, 
  isUploading,
  name,
  email 
}: AvatarUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setPreviewUrl(url);
      onAvatarChange(file, url);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="relative group">
      <Avatar className="h-32 w-32 border-4 border-royal/10">
        {previewUrl ? (
          <AvatarImage src={previewUrl} alt={name || 'User avatar'} />
        ) : (
          <AvatarFallback className="bg-royal text-white text-4xl">
            {getInitials()}
          </AvatarFallback>
        )}
      </Avatar>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute bottom-0 right-0 rounded-full bg-white shadow-md hover:bg-gray-50"
        onClick={handleClick}
        disabled={isUploading}
      >
        <Camera className="h-4 w-4" />
      </Button>
      
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
          <div className="w-8 h-8 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default AvatarUploader; 
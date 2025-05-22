
import React, { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  avatarUrl: string;
  onAvatarChange: (file: File, previewUrl: string) => void;
  isUploading?: boolean;
  name?: string;
  email?: string;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
  onAvatarChange,
  isUploading = false,
  name,
  email
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl || null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onAvatarChange(file, result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-white shadow-md">
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt={name || 'Profile'} />
          ) : (
            <AvatarFallback className="bg-royal text-white text-4xl">
              {name ? name.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <label 
          htmlFor="avatar-upload" 
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Camera className="h-6 w-6 mr-1" />
              <span className="text-sm">Change</span>
            </>
          )}
          <input 
            id="avatar-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarUploader;

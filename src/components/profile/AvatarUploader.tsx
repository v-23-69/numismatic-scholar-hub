<<<<<<< HEAD
import { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';

interface AvatarUploaderProps {
  avatarUrl?: string;
  onAvatarChange: (file: File, previewUrl: string) => void;
  isUploading: boolean;
=======

import React, { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  avatarUrl: string;
  onAvatarChange: (file: File, previewUrl: string) => void;
  isUploading?: boolean;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
  name?: string;
  email?: string;
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
    </div>
  );
};

<<<<<<< HEAD
export default AvatarUploader; 
=======
export default AvatarUploader;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c

import React from 'react';
import { Check } from 'lucide-react';
import { Label } from "@/components/ui/label";

interface ProfileThemeSelectorProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const ProfileThemeSelector: React.FC<ProfileThemeSelectorProps> = ({
  selectedColor,
  onChange
}) => {
  const themeColors = [
    { name: 'Royal Blue', value: '#0B2C5E' },  // royal
    { name: 'Gold', value: '#D4AF37' },        // gold
    { name: 'Burgundy', value: '#800020' },    // burgundy red
    { name: 'Emerald', value: '#046307' },     // emerald green
    { name: 'Purple', value: '#4B0082' },      // deep purple
    { name: 'Rust', value: '#B7410E' }         // rust
  ];
  
  return (
    <div className="space-y-4">
      <Label>Profile Theme Color</Label>
      <div className="flex flex-wrap gap-3">
        {themeColors.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`relative w-8 h-8 rounded-full transition-transform hover:scale-110 ${
              selectedColor === color.value ? 'ring-2 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          >
            {selectedColor === color.value && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
            )}
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500">Choose a color theme for your profile</p>
    </div>
  );
};

export default ProfileThemeSelector; 
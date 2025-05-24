<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProfileCompletionProps {
  profile: {
    full_name?: string;
    bio?: string;
    phone?: string;
    avatar_url?: string;
    theme_color?: string;
  };
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ profile }) => {
  // Calculate completion percentage based on filled profile fields
  const calculateCompletion = () => {
    const fields = [
      !!profile.full_name,
      !!profile.bio,
      !!profile.phone,
      !!profile.avatar_url,
      !!profile.theme_color
    ];
    
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gold/10 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-royal">Profile Completion</h3>
        <span className="text-lg font-bold text-royal">{completionPercentage}%</span>
      </div>
      
      <Progress value={completionPercentage} className="h-2 mb-4" />
      
      <div className="text-sm text-gray-600">
        {completionPercentage < 100 ? (
          <p>Complete your profile to enhance your NumismaticScholar experience!</p>
        ) : (
          <p>Great job! Your profile is complete.</p>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProfileCompletion; 
=======
export default ProfileCompletion;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c

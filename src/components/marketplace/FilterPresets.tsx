import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Plus, 
  Trash2, 
  Edit3, 
  Star,
  Clock,
  Crown,
  Coins
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { MarketplaceFilters } from '@/types/marketplace';

interface FilterPreset {
  id: string;
  name: string;
  filters: MarketplaceFilters;
  icon: string;
  createdAt: string;
  isFavorite: boolean;
}

interface FilterPresetsProps {
  currentFilters: MarketplaceFilters;
  onApplyPreset: (filters: MarketplaceFilters) => void;
}

const defaultPresets: FilterPreset[] = [
  {
    id: 'ancient-gold',
    name: 'Ancient Gold Coins',
    filters: {
      metal: 'Gold',
      dynasty: 'Ancient India',
      rarity: 'Rare',
      verified: true
    },
    icon: '👑',
    createdAt: '2024-01-01',
    isFavorite: true
  },
  {
    id: 'mughal-silver',
    name: 'Mughal Silver',
    filters: {
      metal: 'Silver',
      dynasty: 'Mughal India',
      condition: 'Good',
      verified: true
    },
    icon: '🏛️',
    createdAt: '2024-01-01',
    isFavorite: false
  },
  {
    id: 'british-india',
    name: 'British India Collection',
    filters: {
      dynasty: 'British India',
      minYear: 1858,
      maxYear: 1947,
      verified: true
    },
    icon: '🇬🇧',
    createdAt: '2024-01-01',
    isFavorite: false
  },
  {
    id: 'high-value',
    name: 'Premium Coins (₹50K+)',
    filters: {
      minValue: 50000,
      verified: true,
      rarity: 'Very Rare'
    },
    icon: '💎',
    createdAt: '2024-01-01',
    isFavorite: true
  }
];

export const FilterPresets = ({ currentFilters, onApplyPreset }: FilterPresetsProps) => {
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load presets from localStorage or use defaults
    const savedPresets = localStorage.getItem('coin-filter-presets');
    if (savedPresets) {
      try {
        const parsed = JSON.parse(savedPresets);
        setPresets([...defaultPresets, ...parsed]);
      } catch {
        setPresets(defaultPresets);
      }
    } else {
      setPresets(defaultPresets);
    }
  }, []);

  const savePresets = (newPresets: FilterPreset[]) => {
    const userPresets = newPresets.filter(p => !defaultPresets.find(dp => dp.id === p.id));
    localStorage.setItem('coin-filter-presets', JSON.stringify(userPresets));
    setPresets(newPresets);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Please enter a name",
        description: "Filter preset needs a name to be saved",
        variant: "destructive"
      });
      return;
    }

    const hasActiveFilters = Object.entries(currentFilters).some(([key, value]) => {
      if (['minValue', 'maxValue', 'minYear', 'maxYear'].includes(key)) {
        return typeof value === 'number' && !isNaN(value);
      }
      if (key === 'search' || key === 'sortBy') return false;
      return value !== undefined && value !== '' && value !== null;
    });

    if (!hasActiveFilters) {
      toast({
        title: "No filters to save",
        description: "Please apply some filters before saving a preset",
        variant: "destructive"
      });
      return;
    }

    const newPreset: FilterPreset = {
      id: `user-${Date.now()}`,
      name: presetName.trim(),
      filters: { ...currentFilters },
      icon: '⭐',
      createdAt: new Date().toISOString(),
      isFavorite: false
    };

    const updatedPresets = [...presets, newPreset];
    savePresets(updatedPresets);
    
    setPresetName('');
    setShowSaveDialog(false);
    
    toast({
      title: "Preset saved",
      description: `"${newPreset.name}" has been saved to your filter presets`,
      className: "bg-green-50 border-green-200 text-green-800"
    });
  };

  const handleDeletePreset = (presetId: string) => {
    if (defaultPresets.find(p => p.id === presetId)) {
      toast({
        title: "Cannot delete",
        description: "Default presets cannot be deleted",
        variant: "destructive"
      });
      return;
    }

    const updatedPresets = presets.filter(p => p.id !== presetId);
    savePresets(updatedPresets);
    
    toast({
      title: "Preset deleted",
      description: "Filter preset has been removed",
    });
  };

  const toggleFavorite = (presetId: string) => {
    const updatedPresets = presets.map(p => 
      p.id === presetId ? { ...p, isFavorite: !p.isFavorite } : p
    );
    savePresets(updatedPresets);
  };

  const getFilterSummary = (filters: MarketplaceFilters) => {
    const parts: string[] = [];
    if (filters.metal) parts.push(filters.metal);
    if (filters.dynasty) parts.push(filters.dynasty);
    if (filters.rarity) parts.push(filters.rarity);
    if (filters.condition) parts.push(filters.condition);
    if (filters.verified) parts.push('Verified');
    if (filters.minValue || filters.maxValue) {
      const min = filters.minValue ? `₹${filters.minValue.toLocaleString()}` : '';
      const max = filters.maxValue ? `₹${filters.maxValue.toLocaleString()}` : '';
      if (min && max) parts.push(`${min} - ${max}`);
      else if (min) parts.push(`From ${min}`);
      else if (max) parts.push(`Up to ${max}`);
    }
    return parts.slice(0, 3);
  };

  const favoritePresets = presets.filter(p => p.isFavorite);
  const otherPresets = presets.filter(p => !p.isFavorite);

  return (
    <Card className="border-royal/20 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-royal flex items-center">
            <Bookmark className="h-4 w-4 mr-2" />
            Quick Filters
          </h3>
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-royal border-royal/30 hover:bg-royal hover:text-white">
                <Plus className="h-3 w-3 mr-1" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Filter Preset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preset Name
                  </label>
                  <Input
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="e.g., My Favorite Coins"
                    className="border-royal/30 focus:border-royal focus:ring-royal/20"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePreset} className="bg-royal hover:bg-royal-light">
                    Save Preset
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Favorite Presets */}
        {favoritePresets.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Star className="h-3 w-3 text-gold mr-1" />
              <span className="text-xs font-medium text-gray-600">Favorites</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {favoritePresets.map((preset) => (
                <div
                  key={preset.id}
                  className="group relative p-3 bg-gradient-to-r from-gold/10 to-royal/10 border border-gold/20 rounded-lg cursor-pointer hover:from-gold/20 hover:to-royal/20 transition-all"
                  onClick={() => onApplyPreset(preset.filters)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-lg mr-2">{preset.icon}</span>
                        <span className="font-medium text-royal text-sm">{preset.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {getFilterSummary(preset.filters).map((filter, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-royal/30 text-royal">
                            {filter}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(preset.id);
                        }}
                        className="p-1 hover:bg-white/50 rounded"
                      >
                        <Star className="h-3 w-3 text-gold fill-current" />
                      </button>
                      {!defaultPresets.find(p => p.id === preset.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePreset(preset.id);
                          }}
                          className="p-1 hover:bg-white/50 rounded text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {otherPresets.map((preset) => (
            <div
              key={preset.id}
              className="group relative p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-royal/30 hover:bg-royal/5 transition-all"
              onClick={() => onApplyPreset(preset.filters)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-base mr-2">{preset.icon}</span>
                    <span className="font-medium text-royal text-sm">{preset.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getFilterSummary(preset.filters).map((filter, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(preset.id);
                    }}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <Star className="h-3 w-3 text-gray-400 hover:text-gold" />
                  </button>
                  {!defaultPresets.find(p => p.id === preset.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePreset(preset.id);
                      }}
                      className="p-1 hover:bg-white/50 rounded text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

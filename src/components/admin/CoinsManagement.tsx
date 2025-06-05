
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import supabase from '@/lib/supabaseClient';
import type { CoinListing } from '@/types/marketplace';

interface CoinsManagementProps {
  onStatsUpdate: () => void;
}

const CoinsManagement = ({ onStatsUpdate }: CoinsManagementProps) => {
  const { toast } = useToast();
  const [coins, setCoins] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCoin, setEditingCoin] = useState<CoinListing | null>(null);
  
  const [newCoin, setNewCoin] = useState({
    title: '',
    description: '',
    dynasty: '',
    ruler: '',
    mint_date: '',
    region: '',
    metal: '',
    condition: '',
    value: 0,
    rarity: 'Common' as const,
    stock_quantity: 1,
    images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80']
  });

  useEffect(() => {
    loadCoins();
  }, []);

  const loadCoins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('coin_listings')
        .select(`
          *,
          seller:profiles!seller_id(
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoins(data || []);
    } catch (error) {
      console.error('Error loading coins:', error);
      toast({
        title: "Error",
        description: "Failed to load coins",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoin = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('coin_listings')
        .insert({
          ...newCoin,
          seller_id: user.user.id,
          verified: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coin added successfully",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      setIsAddModalOpen(false);
      setNewCoin({
        title: '',
        description: '',
        dynasty: '',
        ruler: '',
        mint_date: '',
        region: '',
        metal: '',
        condition: '',
        value: 0,
        rarity: 'Common',
        stock_quantity: 1,
        images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80']
      });
      
      await loadCoins();
      onStatsUpdate();
    } catch (error) {
      console.error('Error adding coin:', error);
      toast({
        title: "Error",
        description: "Failed to add coin",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCoin = async (coinId: string) => {
    if (!confirm('Are you sure you want to delete this coin?')) return;

    try {
      const { error } = await supabase
        .from('coin_listings')
        .delete()
        .eq('id', coinId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coin deleted successfully",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      await loadCoins();
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting coin:', error);
      toast({
        title: "Error",
        description: "Failed to delete coin",
        variant: "destructive"
      });
    }
  };

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.dynasty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.ruler.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDynasty = !selectedDynasty || coin.dynasty === selectedDynasty;
    return matchesSearch && matchesDynasty;
  });

  const dynasties = [...new Set(coins.map(coin => coin.dynasty))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Coins Management</CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-royal hover:bg-royal-light text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Coin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Coin</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newCoin.title}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="dynasty">Dynasty</Label>
                  <Input
                    id="dynasty"
                    value={newCoin.dynasty}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, dynasty: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="ruler">Ruler</Label>
                  <Input
                    id="ruler"
                    value={newCoin.ruler}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, ruler: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="mint_date">Mint Date</Label>
                  <Input
                    id="mint_date"
                    value={newCoin.mint_date}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, mint_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={newCoin.region}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, region: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="metal">Metal</Label>
                  <Input
                    id="metal"
                    value={newCoin.metal}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, metal: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    value={newCoin.condition}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, condition: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="value">Price (₹)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCoin.value}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, value: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="rarity">Rarity</Label>
                  <Select value={newCoin.rarity} onValueChange={(value: any) => setNewCoin(prev => ({ ...prev, rarity: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Common">Common</SelectItem>
                      <SelectItem value="Uncommon">Uncommon</SelectItem>
                      <SelectItem value="Rare">Rare</SelectItem>
                      <SelectItem value="Very Rare">Very Rare</SelectItem>
                      <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newCoin.stock_quantity}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCoin.description}
                    onChange={(e) => setNewCoin(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCoin} className="bg-royal hover:bg-royal-light text-white">
                  Add Coin
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedDynasty} onValueChange={setSelectedDynasty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by Dynasty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Dynasties</SelectItem>
              {dynasties.map(dynasty => (
                <SelectItem key={dynasty} value={dynasty}>{dynasty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Coins Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Dynasty</TableHead>
                <TableHead>Ruler</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rarity</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell>
                    <img 
                      src={coin.images[0]} 
                      alt={coin.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{coin.title}</TableCell>
                  <TableCell>{coin.dynasty}</TableCell>
                  <TableCell>{coin.ruler}</TableCell>
                  <TableCell>₹{coin.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={coin.rarity === 'Extremely Rare' ? 'destructive' : 'secondary'}>
                      {coin.rarity}
                    </Badge>
                  </TableCell>
                  <TableCell>{coin.stock_quantity}</TableCell>
                  <TableCell>
                    <Badge variant={coin.verified ? 'default' : 'secondary'}>
                      {coin.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCoin(coin.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCoins.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No coins found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoinsManagement;

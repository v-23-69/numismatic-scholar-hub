
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Send, User, Bot, Clock, Shield, DollarSign, TrendingUp } from 'lucide-react';
import supabase from '@/lib/supabaseClient';

interface Message {
  id: string;
  verification_id: string;
  sender: 'user' | 'agent';
  message: string;
  created_at: string;
}

interface VerificationData {
  id: string;
  name: string;
  status: string;
  coin_count: number;
  total_amount: number;
  created_at: string;
}

const VerificationAgent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [verification, setVerification] = useState<VerificationData | null>(null);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const verificationId = searchParams.get('id');

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (!session?.user) {
        navigate('/authenticate');
        return;
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    if (!verificationId) {
      navigate('/verify-coins');
      return;
    }
    
    fetchVerificationData();
    fetchMessages();
    fetchCredits();
    
    // Subscribe to real-time messages
    const subscription = supabase
      .channel('agent_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'agent_messages',
          filter: `verification_id=eq.${verificationId}`
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [verificationId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchVerificationData = async () => {
    try {
      const { data, error } = await supabase
        .from('coin_verification')
        .select('*')
        .eq('id', verificationId)
        .single();
      
      if (error) throw error;
      setVerification(data);
    } catch (error) {
      console.error('Error fetching verification:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_messages')
        .select('*')
        .eq('verification_id', verificationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
      
      // Add initial agent messages if none exist
      if (!data || data.length === 0) {
        await addInitialMessages();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchCredits = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('verification_credits')
        .select('credits')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const totalCredits = data?.reduce((sum, record) => sum + record.credits, 0) || 0;
      setCredits(totalCredits);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const addInitialMessages = async () => {
    const initialMessages = [
      {
        verification_id: verificationId,
        sender: 'agent',
        message: `👋 Hello! I'm your coin verification expert. I've received your submission and I'm analyzing your coin(s) now.`
      },
      {
        verification_id: verificationId,
        sender: 'agent',
        message: `Based on my initial analysis, here are the findings:\n\n🔍 **Authentication**: Your coin appears to be genuine\n💰 **Market Value**: Estimated ₹150-200\n📅 **Year**: 1965\n🏭 **Metal**: Copper-Nickel alloy\n\nDo you have any specific questions about your coin?`
      }
    ];

    for (const msg of initialMessages) {
      await supabase.from('agent_messages').insert(msg);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    try {
      const { error } = await supabase
        .from('agent_messages')
        .insert({
          verification_id: verificationId,
          sender: 'user',
          message: newMessage.trim()
        });
      
      if (error) throw error;
      
      setNewMessage('');
      
      // Simulate agent response after a delay
      setTimeout(async () => {
        const responses = [
          "Thank you for your question. Let me analyze that for you...",
          "Based on the coin details you've provided, I can see that...",
          "That's a great question! Here's what I found...",
          "I'll need to examine this more closely. Give me a moment...",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        await supabase
          .from('agent_messages')
          .insert({
            verification_id: verificationId,
            sender: 'agent',
            message: randomResponse
          });
      }, 2000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!verification) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading verification details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-royal mb-2">
                  👋 Welcome to CoinGlobe Live Support
                </h1>
                <p className="text-gray-600 mb-4">
                  Our expert will now guide you about your coin verification.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Verification ID: {verification.id.slice(0, 8)}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Status: {verification.status}
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(verification.created_at).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
              {credits > 0 && (
                <Card className="mt-4 md:mt-0">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Free Verifications</p>
                      <p className="text-2xl font-bold text-green-600">{credits}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Verification Summary */}
            <div className="lg:col-span-1">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="text-royal">Verification Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Coins</span>
                    <span className="font-semibold">{verification.coin_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Amount Paid</span>
                    <span className="font-semibold">₹{verification.total_amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer</span>
                    <span className="font-semibold">{verification.name}</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-700 mb-3">Quick Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Authentic</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">₹150-200 value</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">Good condition</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="rounded-xl h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-royal">Live Chat with Expert</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {message.sender === 'agent' ? (
                              <Bot className="h-4 w-4 mr-2" />
                            ) : (
                              <User className="h-4 w-4 mr-2" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.sender === 'agent' ? 'Expert' : 'You'}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-grow rounded-xl"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerificationAgent;

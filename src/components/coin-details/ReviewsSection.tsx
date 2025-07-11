import { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/components/ui/use-toast";
import supabase from '@/lib/supabaseClient';

interface Review {
  id: string;
  user_id: string;
  coin_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string;
    avatar_url?: string;
  };
}

interface SupabaseReview {
  id: string;
  user_id: string;
  coin_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ReviewsSectionProps {
  coinId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ coinId }) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadReviews();
  }, [coinId]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('coin_reviews')
        .select(`
          id,
          user_id,
          coin_id,
          rating,
          comment,
          created_at,
          user:profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('coin_id', coinId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // First convert to unknown, then to SupabaseReview[]
      const typedData = (data as unknown) as SupabaseReview[];
      const formattedReviews = (typedData || []).map(review => ({
        id: review.id,
        user_id: review.user_id,
        coin_id: review.coin_id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        user: {
          full_name: review.user?.full_name || 'Anonymous',
          avatar_url: review.user?.avatar_url || undefined
        }
      }));

      setReviews(formattedReviews);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add a review",
        variant: "destructive"
      });
      return;
    }

    if (newRating === 0 || !newComment.trim()) {
      toast({
        title: "Please complete your review",
        description: "Both rating and comment are required",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('coin_reviews')
        .insert({
          coin_id: coinId,
          user_id: user.id,
          rating: newRating,
          comment: newComment.trim()
        });

      if (error) throw error;

      toast({
        title: "Review added",
        description: "Your review has been posted successfully",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      setNewRating(0);
      setNewComment('');
      loadReviews(); // Reload reviews
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating ? 'text-gold fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-royal">Reviews ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Review Form */}
        <div className="border-b pb-6">
          <h4 className="font-semibold mb-4">Add Your Review</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              {renderStars(newRating, true, setNewRating)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this coin..."
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleSubmitReview}
              disabled={submitting || newRating === 0 || !newComment.trim()}
              className="bg-royal hover:bg-royal-light text-white"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : null}
              Post Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No reviews yet. Be the first to review this coin!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    {review.user.avatar_url ? (
                      <AvatarImage src={review.user.avatar_url} alt={review.user.full_name} />
                    ) : (
                      <AvatarFallback className="bg-royal text-white">
                        {review.user.full_name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {review.user.full_name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;

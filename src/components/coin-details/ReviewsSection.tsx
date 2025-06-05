
import { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer_name: string;
  created_at: string;
}

interface ReviewsSectionProps {
  coinId: string;
}

const ReviewsSection = ({ coinId }: ReviewsSectionProps) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
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
          rating,
          comment,
          created_at,
          user:profiles(full_name)
        `)
        .eq('coin_id', coinId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedReviews = (data || []).map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        reviewer_name: review.user?.full_name || 'Anonymous',
        created_at: review.created_at
      }));

      setReviews(formattedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews ({reviews.length})</CardTitle>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-royal rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {review.reviewer_name.charAt(0)}
                    </div>
                    <span className="font-medium">{review.reviewer_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 ml-11">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;

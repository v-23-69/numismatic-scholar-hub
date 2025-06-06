
// Simulated payment service for CoinGlobe
export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending';
  message: string;
}

export class PaymentService {
  // Simulate UPI payment
  static async processUPIPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('Processing UPI Payment:', request);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 90% success rate
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        transactionId: `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'UPI',
        status: 'success',
        message: 'Payment successful! Amount debited from your account.'
      };
    } else {
      return {
        success: false,
        transactionId: '',
        paymentMethod: 'UPI',
        status: 'failed',
        message: 'Payment failed. Please try again or use a different payment method.'
      };
    }
  }

  // Simulate card payment
  static async processCardPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('Processing Card Payment:', request);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const success = Math.random() > 0.05; // 95% success rate for cards
    
    if (success) {
      return {
        success: true,
        transactionId: `CARD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'Credit/Debit Card',
        status: 'success',
        message: 'Payment processed successfully!'
      };
    } else {
      return {
        success: false,
        transactionId: '',
        paymentMethod: 'Credit/Debit Card',
        status: 'failed',
        message: 'Card payment declined. Please check your card details or try another card.'
      };
    }
  }

  // Simulate net banking
  static async processNetBanking(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('Processing Net Banking Payment:', request);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const success = Math.random() > 0.15; // 85% success rate
    
    if (success) {
      return {
        success: true,
        transactionId: `NB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'Net Banking',
        status: 'success',
        message: 'Net banking payment completed successfully!'
      };
    } else {
      return {
        success: false,
        transactionId: '',
        paymentMethod: 'Net Banking',
        status: 'failed',
        message: 'Net banking session expired. Please try again.'
      };
    }
  }

  // Generate UPI QR code data
  static generateUPIQR(amount: number, orderId: string): string {
    const upiId = 'coinglobe@paytm';
    const merchantName = 'CoinGlobe';
    
    // Standard UPI QR format
    return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tr=${orderId}&tn=CoinGlobe%20Order%20Payment`;
  }
}

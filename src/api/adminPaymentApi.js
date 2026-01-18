import { supabase } from '../client/supabaseClient';

// --- READ (Using the SQL View) ---

export const getFinancialRecords = async ({ filterStatus, search }) => {
  // Query the View we created to get joined data (Orders + Payments + Users)
  let query = supabase
    .from('admin_payment_view')
    .select('*')
    .order('order_date', { ascending: false });

  if (filterStatus && filterStatus !== 'All') {
    if (filterStatus === 'Unpaid') {
      // Unpaid means no payment record exists OR status is not succeeded
      query = query.or('payment_status.is.null,payment_status.neq.succeeded');
    } else {
      query = query.eq('payment_status', filterStatus.toLowerCase());
    }
  }

  if (search) {
    // Search by Order ID (Exact) or Email (Partial)
    query = query.or(`order_id.eq.${search},email.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// --- WRITE (Actions) ---

// 1. Record Manual Payment (Wire Transfer / Cash)
export const recordManualPayment = async (orderId, userId, amount) => {
  // Insert a new record into the 'payments' table
  const { data, error } = await supabase
    .from('payments')
    .insert([{
      order_id: orderId,
      user_id: userId,
      provider: 'manual', // Tagging as manual entry
      amount: amount,
      status: 'succeeded',
      provider_payment_id: `MAN-${Date.now()}-${Math.floor(Math.random()*1000)}` // Unique fake ID
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 2. Process Refund
// export const processRefund = async (orderId, paymentId) => {
//   // In a real app, call Stripe/PayPal API here first!
  
//   // Update the database record to reflect the refund
//   const { data, error } = await supabase
//     .from('payments')
//     .update({ status: 'refunded' })
//     .eq('id', paymentId)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

export const processRefund = async (orderId, paymentId, refundDetails) => {
  // refundDetails contains: { amount, reason, method, notes, bankDetails (if manual) }

  console.log("Processing Refund with Provider:", refundDetails);

  // 1. In a real app, this is where you'd trigger Stripe/PayPal
  // if (refundDetails.method === 'original_source') {
  //    await stripe.refunds.create({ ... })
  // }

  // 2. Update the specific Payment Record
  // We store the refund logic in 'metadata' so we don't need 10 new columns
  const { data, error } = await supabase
    .from('payments')
    .update({ 
      status: 'refunded',
      // Store the audit trail in a metadata column (assuming you have one, or just update the row)
      // If you don't have a metadata column, this line might be ignored by SQL, 
      // but usually production tables have a 'metadata' or 'details' jsonb column.
      provider_payment_id: refundDetails.method === 'manual_transfer' 
        ? `REF-${refundDetails.bankDetails?.reference || 'MANUAL'}` 
        : `REF-STRIPE-${Date.now()}`
    })
    .eq('id', paymentId)
    .select()
    .single();

  if (error) throw error;
  
  // 3. Log the action (Optional but recommended)
  await supabase.from('order_logs').insert([{
    order_id: orderId,
    action: 'REFUND_ISSUED',
    message: `Refund of $${refundDetails.amount} issued via ${refundDetails.method}. Reason: ${refundDetails.reason}`
  }]);

  return data;
};
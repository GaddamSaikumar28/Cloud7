import { supabase } from '../client/supabaseClient';

export const saveAddress = async (userId, addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .insert([{ user_id: userId, ...addressData }])
    .select();
  if (error) throw error;
  return data[0];
};

export const getUserAddresses = async (userId) => {
  const { data } = await supabase.from('addresses').select('*').eq('user_id', userId);
  return data || [];
};

export const createOrder = async (orderData, cartItems) => {
  // 1. Create the Order Header
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Create Order Items from Cart
  const itemsToInsert = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.id,
    variant_id: item.selectedSize.id, // Assuming SKU ID
    flavor_name: item.selectedFlavor.name,
    quantity: item.quantity,
    price_at_purchase: item.selectedSize.price
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);
  if (itemsError) throw itemsError;

  return order;
};
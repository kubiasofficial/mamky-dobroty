import emailjs from '@emailjs/browser';

export const sendOrderEmail = async (orderData, orderNumber, totalPrice, cartItems) => {
  try {
    const templateParams = {
      to_email: 'suslice1@seznam.cz',
      from_name: orderData.name,
      customer_phone: orderData.phone,
      customer_email: orderData.email || 'Nezadán',
      order_number: orderNumber,
      products: cartItems.map(item => 
        `${item.name} - ${item.quantity}x (${item.priceNum * item.quantity} Kč)`
      ).join('\n'),
      total_price: totalPrice,
      note: orderData.note || 'Žádná poznámka',
      order_date: new Date().toLocaleString('cs-CZ')
    };

    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID', 
      templateParams,
      'YOUR_PUBLIC_KEY'
    );

    console.log('✅ Email odeslán:', result.text);
    return { success: true };
  } catch (error) {
    console.error('❌ Email chyba:', error);
    return { success: false, error: error.text };
  }
};
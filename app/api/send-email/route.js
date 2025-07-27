import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderNumber, customer, cart, totalItems } = await request.json();

    // Zde byste normálně použili emailovou službu jako Nodemailer, SendGrid, atd.
    // Pro jednoduchost budeme posílat jen na Discord
    
    console.log('Email by byl odeslán na: suslice1@seznam.cz');
    console.log('Objednávka:', { orderNumber, customer, cart, totalItems });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Chyba při odesílání emailu:', error);
    return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 500 });
  }
}
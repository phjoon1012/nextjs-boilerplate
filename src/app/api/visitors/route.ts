import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { visitorId, userAgent, ip } = await request.json();
    
    if (!visitorId) {
      return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Check if this visitor has already been counted today
    const { data: existingVisit } = await supabase
      .from('visitor_tracking')
      .select('id')
      .eq('visitor_id', visitorId)
      .eq('visit_date', today)
      .single();

    if (!existingVisit) {
      // Insert new visit record
      const { error } = await supabase
        .from('visitor_tracking')
        .insert({
          visitor_id: visitorId,
          visit_date: today,
          user_agent: userAgent || null,
          ip_address: ip || null,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error inserting visitor record:', error);
        return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
      }
    }

    // Get today's unique visitor count
    const { data: todayVisitors, error: countError } = await supabase
      .from('visitor_tracking')
      .select('visitor_id', { count: 'exact' })
      .eq('visit_date', today);

    if (countError) {
      console.error('Error counting visitors:', countError);
      return NextResponse.json({ error: 'Failed to count visitors' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      uniqueVisitorsToday: todayVisitors?.length || 0,
      isNewVisitor: !existingVisit
    });

  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's unique visitor count
    const { data: todayVisitors, error } = await supabase
      .from('visitor_tracking')
      .select('visitor_id', { count: 'exact' })
      .eq('visit_date', today);

    if (error) {
      console.error('Error counting visitors:', error);
      return NextResponse.json({ error: 'Failed to count visitors' }, { status: 500 });
    }

    return NextResponse.json({ 
      uniqueVisitorsToday: todayVisitors?.length || 0
    });

  } catch (error) {
    console.error('Visitor count error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

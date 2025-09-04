-- Create visitor_tracking table for unique visitor counting
CREATE TABLE IF NOT EXISTS visitor_tracking (
  id SERIAL PRIMARY KEY,
  visitor_id VARCHAR(255) NOT NULL,
  visit_date DATE NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per visitor per day
  UNIQUE(visitor_id, visit_date)
);

-- Create index for faster queries on visit_date
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_visit_date ON visitor_tracking(visit_date);

-- Create index for faster queries on visitor_id
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_visitor_id ON visitor_tracking(visitor_id);

-- Optional: Create a view for daily visitor counts
CREATE OR REPLACE VIEW daily_visitor_counts AS
SELECT 
  visit_date,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(*) as total_visits
FROM visitor_tracking
GROUP BY visit_date
ORDER BY visit_date DESC;

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT ON visitor_tracking TO authenticated;
-- GRANT SELECT ON daily_visitor_counts TO authenticated;

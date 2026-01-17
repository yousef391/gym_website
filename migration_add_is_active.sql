-- Add is_active column to stores table
ALTER TABLE stores 
ADD COLUMN is_active BOOLEAN DEFAULT true;

-- Update RLS policies to only allow reading ACTIVE stores for public
-- (Optional: You might want to let public see inactive stores but show "Maintenance" page)

-- For now, we will handle the check in the frontend StoreContext.
-- If store.is_active is false, we show "Suspended" screen.

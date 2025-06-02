import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcrqvchlysfzbzlbaeiu.supabase.co';  // <-- URL inside quotes
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcnF2Y2hseXNmemJ6bGJhZWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4Njg0NDMsImV4cCI6MjA2NDQ0NDQ0M30.iBiaNyNMHIoiUF8FvIAM0GOUx8f84ZOj9EnLHGu5lUU';  // <-- Key inside quotes

export const supabase = createClient(supabaseUrl, supabaseKey);
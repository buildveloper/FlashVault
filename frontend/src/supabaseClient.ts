import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gayxijgndtkpjnbiokys.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheXhpamduZHRrcGpuYmlva3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NzM0NDQsImV4cCI6MjA2NzE0OTQ0NH0.BdTPoCCoyy0D0pnaIloLeQczAu0j0tSCKgZthURDqdo';

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssczfiqgnronmxopvpyw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY3pmaXFnbnJvbm14b3B2cHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTA0MzMsImV4cCI6MjAzODE2NjQzM30.MXkj7nwXXClxYyyC9nP6-KCCHUrji3NRGev4Dff7lfo'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
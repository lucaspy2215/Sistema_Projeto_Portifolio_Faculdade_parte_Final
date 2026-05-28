import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://gkuqdfmawhegryxmxesy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdXFkZm1hd2hlZ3J5eG14ZXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNDg4NjcsImV4cCI6MjA5NDcyNDg2N30.PyAprzhqfN16NV03BSGkoI-PcQgf18xuTO_p8zvEY84';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
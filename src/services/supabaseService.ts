import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
    private supabaseUrl: string;
    private supabaseKey: string;
    private supabase: SupabaseClient;

    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL || '';
        this.supabaseKey = process.env.SUPABASE_KEY || '';
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async signUp(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signUp({ email, password });
        return { data, error };
    }

    async login(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
        return { data, error };
    }

    async getUser() {
        const { data, error } = await this.supabase.auth.getUser();
        return { data, error };
    }

    async fetchUserData(userId: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        return { data, error };
    }

    async updateUserData(userId: string, updates: object) {
        const { data, error } = await this.supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        return { data, error };
    }
}

export default new SupabaseService();
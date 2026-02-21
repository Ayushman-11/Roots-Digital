/**
 * API Service
 * Thin wrapper around Supabase client for data operations
 */
import { supabase } from '../lib/supabase';

// Re-export supabase client for convenience
export { supabase };

// ── Lead types ──────────────────────────────────────────────────────────

export interface Lead {
    id?: string;
    name: string;
    email: string;
    business: string;
    services: string[];
    message: string;
    created_at?: string;
}

/**
 * Insert a new lead from the contact form
 */
export const insertLead = async (lead: Omit<Lead, 'id' | 'created_at'>): Promise<void> => {
    const { error } = await supabase.from('leads').insert(lead);

    if (error) {
        console.error('Supabase insertLead error:', error);
        throw error;
    }
};

/**
 * Fetch all leads (for authenticated dashboard use)
 */
export const fetchLeads = async (): Promise<Lead[]> => {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase fetchLeads error:', error);
        throw error;
    }

    return data ?? [];
};

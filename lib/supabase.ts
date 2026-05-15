import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveDeal(deal: Record<string, unknown>) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('deals')
    .upsert(deal)
    .select()
    .single();
  return { data, error };
}

export async function getDeals(analystId: string) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('analyst_id', analystId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getDeal(id: string) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function updateDeal(id: string, updates: Record<string, unknown>) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('deals')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function getThesisConfig(analystId: string) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('thesis_config')
    .select('*')
    .eq('analyst_id', analystId)
    .single();
  return { data, error };
}

export async function saveThesisConfig(config: Record<string, unknown>) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null };
  const { data, error } = await supabase
    .from('thesis_config')
    .upsert(config)
    .select()
    .single();
  return { data, error };
}

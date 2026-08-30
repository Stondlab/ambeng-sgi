import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Create .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// HELPERS - Tarefas
// ============================================

export async function getTasks() {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .order('ordem', { ascending: true })
  
  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  return data || []
}

export async function getTasksByStatus(status) {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('status', status)
    .order('ordem', { ascending: true })
  
  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  return data || []
}

export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from('tarefas')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating task:', error)
    return null
  }
  return data?.[0] || null
}

export async function createTask(task) {
  const { data, error } = await supabase
    .from('tarefas')
    .insert([task])
    .select()
  
  if (error) {
    console.error('Error creating task:', error)
    return null
  }
  return data?.[0] || null
}

// ============================================
// HELPERS - Empresas
// ============================================

export async function getCompanies() {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
  
  if (error) {
    console.error('Error fetching companies:', error)
    return []
  }
  return data || []
}

// ============================================
// HELPERS - Pessoas
// ============================================

export async function getPeople() {
  const { data, error } = await supabase
    .from('pessoas')
    .select('*')
  
  if (error) {
    console.error('Error fetching people:', error)
    return []
  }
  return data || []
}

// ============================================
// HELPERS - Obras
// ============================================

export async function getWorks() {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .eq('ativo', true)
  
  if (error) {
    console.error('Error fetching works:', error)
    return []
  }
  return data || []
}

// ============================================
// HELPERS - Dashboard Stats
// ============================================

export async function getDashboardStats() {
  // Tarefas por status
  const tasksNewResp = await supabase.from('tarefas').select('id').eq('status', 'novo')
  const tasksCriticalResp = await supabase.from('tarefas').select('id').eq('status', 'novo').eq('prioridade', 'critica')
  const tasksCompletedResp = await supabase.from('tarefas').select('id').eq('status', 'concluido')

  return {
    tasksNew: tasksNewResp.data?.length || 0,
    tasksCritical: tasksCriticalResp.data?.length || 0,
    tasksCompleted: tasksCompletedResp.data?.length || 0
  }
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

export function subscribeToTasks(callback) {
  const subscription = supabase
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'tarefas' },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()
  
  return () => subscription.unsubscribe()
}

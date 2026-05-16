import { createClient } from '@supabase/supabase-js'

const URL = 'https://ldgvqtexfaukbigimlro.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZ3ZxdGV4ZmF1a2JpZ2ltbHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDYxNzEsImV4cCI6MjA5NDUyMjE3MX0.oWheLqpRZU6a7_TD_bevlgKkTGnunNNgG_5tZeiqzTA'

export const supabase = createClient(URL, API_KEY)


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_Supabase_projectUrl
const supabaseKey = import.meta.env.VITE_Supabase_projectAPI

// export to be able to use in other files
export const supabase = createClient(supabaseUrl, supabaseKey)
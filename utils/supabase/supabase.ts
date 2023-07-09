import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './schema';

export const supabase = createClientComponentClient<Database>();

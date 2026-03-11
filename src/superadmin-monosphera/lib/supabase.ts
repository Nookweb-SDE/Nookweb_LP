/**
 * Mock Supabase — só front do Super Admin, sem backend.
 * Retorna dados vazios para a UI renderizar sem erros.
 */

const emptyPromise = Promise.resolve({ data: [] as unknown[], error: null });
const chain = {
  order: () => chain,
  limit: () => chain,
  eq: () => chain,
  single: () => Promise.resolve({ data: null, error: null }),
  then: (fn: (r: { data: unknown[]; error: null }) => unknown) => emptyPromise.then(fn),
  catch: (fn: (e: unknown) => unknown) => emptyPromise.catch(fn),
};

export const supabase = {
  from: (_table: string) => ({
    select: (_cols?: string | string[], opts?: { count?: string; head?: boolean }) => {
      if (opts?.head && opts?.count === 'exact')
        return Promise.resolve({ count: 0, error: null });
      return chain;
    },
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
};

export type Device = {
  id: string;
  device_id: string;
  model: string;
  battery_level: number;
  signal_strength: number;
  is_online: boolean;
  last_seen: string;
  latitude?: number;
  longitude?: number;
};

export type Alert = {
  id: string;
  device_id: string;
  type: 'geofence' | 'biometric_anomaly' | 'sim_swap' | 'panic_button';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  created_at: string;
};

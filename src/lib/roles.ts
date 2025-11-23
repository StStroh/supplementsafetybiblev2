export type Role = 'free' | 'pro' | 'premium';
export const isPaid = (r?: string | null) => r === 'pro' || r === 'premium';
export const roleName = (r?: string | null) => !r ? 'Free' : r.charAt(0).toUpperCase() + r.slice(1);

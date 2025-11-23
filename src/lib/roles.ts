export type UserRole = 'free' | 'pro' | 'premium';

export const isPaid = (role: string | undefined | null): boolean => {
  if (!role) return false;
  return role === 'pro' || role === 'premium';
};

export const getRoleName = (role: string | undefined | null): string => {
  switch (role) {
    case 'pro':
      return 'Pro';
    case 'premium':
      return 'Premium';
    case 'free':
    default:
      return 'Free';
  }
};

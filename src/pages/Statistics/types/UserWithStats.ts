import { User } from '@/types/User';

interface UserWithStats extends User, StatisticResponse {}

export type { UserWithStats };

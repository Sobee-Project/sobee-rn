import {
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
  SearchScreen,
  VoucherScreen,
} from '@/screens';
import {ApplicationStackParamList} from '@/types';
import {
  Bell,
  Compass,
  LucideIcon,
  Search,
  TicketPercent,
  UserRound,
} from 'lucide-react-native';
type BottomTab = {
  key: keyof ApplicationStackParamList;
  title: string;
  icon: LucideIcon;
  component: React.FC;
};

export const bottomTabsMock: BottomTab[] = [
  {
    key: 'Home',
    title: 'Explore',
    icon: Compass,
    component: HomeScreen,
  },
  {
    key: 'Voucher',
    title: 'Hot Deals',
    icon: TicketPercent,
    component: VoucherScreen,
  },
  {
    key: 'Search',
    title: 'Search',
    icon: Search,
    component: SearchScreen,
  },
  {
    key: 'Notifications',
    title: 'Notifications',
    icon: Bell,
    component: NotificationsScreen,
  },
  {
    key: 'Profile',
    title: 'Profile',
    icon: UserRound,
    component: ProfileScreen,
  },
];

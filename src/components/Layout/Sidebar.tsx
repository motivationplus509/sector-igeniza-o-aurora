
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users,
  DollarSign,
  Calendar,
  ClipboardCheck,
  BarChart3,
  Settings,
  Home,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home, roles: ['admin', 'encarregado', 'monitor'] },
    { id: 'employees', label: t('nav.employees'), icon: Users, roles: ['admin', 'encarregado'] },
    { id: 'wages', label: t('nav.wages'), icon: DollarSign, roles: ['admin', 'encarregado', 'monitor'] },
    { id: 'vacations', label: t('nav.vacations'), icon: Calendar, roles: ['admin', 'encarregado'] },
    { id: 'attendance', label: t('nav.attendance'), icon: ClipboardCheck, roles: ['admin', 'encarregado', 'monitor'] },
    { id: 'reports', label: t('nav.reports'), icon: BarChart3, roles: ['admin', 'encarregado'] },
    { id: 'settings', label: t('nav.settings'), icon: Settings, roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'monitor')
  );

  return (
    <div className="w-64 bg-white border-r border-border h-full">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                activeTab === item.id && 'aurora-gradient text-white'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  UserCog,
  Activity,
  MessageSquare,
  Bell,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
  { label: 'Patients', href: '/admin/patients', icon: Users },
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Analytics', href: '/admin/analytics', icon: Activity },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const doctorNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
  { label: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { label: 'Patients', href: '/doctor/patients', icon: Users },
  { label: 'Prescriptions', href: '/doctor/prescriptions', icon: FileText },
  { label: 'AI Assistant', href: '/doctor/ai-assistant', icon: MessageSquare },
];

const patientNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/patient', icon: LayoutDashboard },
  { label: 'Appointments', href: '/patient/appointments', icon: Calendar },
  { label: 'My Records', href: '/patient/records', icon: FileText },
  { label: 'Prescriptions', href: '/patient/prescriptions', icon: FileText },
  { label: 'AI Assistant', href: '/patient/ai-assistant', icon: MessageSquare },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user?.role === 'admin' 
    ? adminNavItems 
    : user?.role === 'doctor' 
    ? doctorNavItems 
    : patientNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'doctor': return 'Doctor';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary';
      case 'doctor': return 'bg-secondary';
      case 'patient': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Mode Banner */}
      <div className="bg-warning text-warning-foreground px-4 py-1.5 text-center text-sm font-medium">
        🎓 DEMO MODE - Hospital Information System Hackathon Prototype
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-lg">MediCare HIS</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emergency text-emergency-foreground text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New appointment request</DropdownMenuItem>
              <DropdownMenuItem>Lab results available</DropdownMenuItem>
              <DropdownMenuItem>Prescription reminder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "top-[52px] lg:top-0"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
              <div className="p-2 rounded-lg bg-sidebar-primary">
                <Activity className="h-6 w-6 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg">MediCare</h1>
                <p className="text-xs text-sidebar-foreground/70">Hospital Information System</p>
              </div>
            </div>

            {/* User Info */}
            <div className="px-4 py-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={cn("text-white", getRoleColor(user?.role || 'patient'))}>
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{user?.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{getRoleLabel(user?.role || 'patient')}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Desktop Header */}
          <header className="hidden lg:flex sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border px-6 py-3 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                {navItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emergency text-emergency-foreground text-xs flex items-center justify-center">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={cn("text-white text-xs", getRoleColor(user?.role || 'patient'))}>
                        {user ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

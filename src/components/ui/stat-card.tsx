import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'emergency';
  className?: string;
}

const variantStyles = {
  default: {
    container: 'bg-card border-border',
    icon: 'bg-muted text-muted-foreground',
    value: 'text-foreground',
  },
  primary: {
    container: 'bg-primary/5 border-primary/20',
    icon: 'bg-primary text-primary-foreground',
    value: 'text-primary',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20',
    icon: 'bg-secondary text-secondary-foreground',
    value: 'text-secondary',
  },
  success: {
    container: 'bg-success/10 border-success/20',
    icon: 'bg-success text-success-foreground',
    value: 'text-success',
  },
  warning: {
    container: 'bg-warning/10 border-warning/20',
    icon: 'bg-warning text-warning-foreground',
    value: 'text-warning',
  },
  emergency: {
    container: 'bg-emergency/10 border-emergency/20',
    icon: 'bg-emergency text-emergency-foreground',
    value: 'text-emergency',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:shadow-card-hover',
        styles.container,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-3xl font-bold font-display', styles.value)}>{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span className={trend.isPositive ? 'text-success' : 'text-destructive'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

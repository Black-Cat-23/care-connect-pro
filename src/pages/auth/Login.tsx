import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        // Navigate based on role (handled in AuthContext)
        const savedUser = localStorage.getItem('his_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          navigate(`/${user.role}`);
        }
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Try a demo account.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (email: string) => {
    setEmail(email);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.05)%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">MediCare HIS</h1>
              <p className="text-white/70 text-sm">Hospital Information System</p>
            </div>
          </div>

          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            Smart Healthcare<br />
            <span className="text-primary-foreground/80">Management System</span>
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-md">
            Streamline hospital operations, improve patient care, and leverage AI-powered insights for better healthcare outcomes.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <span>Real-time Analytics Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <span>AI-Powered Health Assistant</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <span>Electronic Health Records (EHR)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">MediCare HIS</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Demo Accounts */}
          <Card className="bg-accent/50 border-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Demo Accounts</CardTitle>
              <CardDescription className="text-xs">Click to auto-fill credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => quickLogin('admin@hospital.com')}
              >
                <span className="w-16 font-medium">Admin:</span>
                admin@hospital.com
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => quickLogin('dr.smith@hospital.com')}
              >
                <span className="w-16 font-medium">Doctor:</span>
                dr.smith@hospital.com
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => quickLogin('patient1@email.com')}
              >
                <span className="w-16 font-medium">Patient:</span>
                patient1@email.com
              </Button>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

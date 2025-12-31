import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { appointments, patients, prescriptions, doctors } from '@/lib/mockData';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Find doctor's data
  const currentDoctor = doctors.find(d => d.email === user?.email) || doctors[0];
  
  // Filter appointments for this doctor
  const doctorAppointments = appointments.filter(apt => apt.doctorName === currentDoctor.name);
  const todayAppointments = doctorAppointments.filter(apt => apt.date === '2024-12-31');
  const pendingAppointments = doctorAppointments.filter(apt => apt.status === 'pending');
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Good Morning, {currentDoctor.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {currentDoctor.specialization} • {currentDoctor.department}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              My Schedule
            </Button>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Appointments"
            value={todayAppointments.length}
            subtitle={`${completedToday} completed`}
            icon={Calendar}
            variant="primary"
          />
          <StatCard
            title="Pending Approvals"
            value={pendingAppointments.length}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Total Patients"
            value={patients.length}
            icon={Users}
            variant="secondary"
          />
          <StatCard
            title="Prescriptions Today"
            value={2}
            icon={FileText}
            variant="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for December 31, 2024</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((apt, index) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-card transition-all"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <p className="text-2xl font-bold text-primary">{apt.time}</p>
                        </div>
                        <div className="w-px h-12 bg-border" />
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {apt.patientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{apt.patientName}</p>
                          <p className="text-sm text-muted-foreground">{apt.symptoms || 'General checkup'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            apt.status === 'completed' ? 'default' :
                            apt.status === 'approved' ? 'secondary' : 'outline'
                          }
                        >
                          {apt.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {apt.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {apt.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>AI-powered suggestions for your patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-card border">
                <p className="text-sm font-medium mb-1">Patient: Michael Johnson</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Based on recent vitals, consider reviewing blood pressure medications.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  View Pre-Visit Summary
                </Button>
              </div>
              
              <div className="p-3 rounded-lg bg-card border">
                <p className="text-sm font-medium mb-1">Reminder</p>
                <p className="text-xs text-muted-foreground mb-2">
                  2 pending prescription renewals need your attention.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Review Prescriptions
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-accent border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">AI Assistant</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Get AI-powered insights for diagnosis support and medication information.
                </p>
                <Button size="sm" className="w-full gap-2">
                  <Sparkles className="h-3 w-3" />
                  Open AI Assistant
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                ⚕️ AI is for assistance only. Not a medical diagnosis.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Patients you've recently treated</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {patients.slice(0, 4).map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={patient.isEmergency ? 'bg-emergency text-emergency-foreground' : 'bg-primary/10 text-primary'}>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.gender === 'male' ? 'M' : 'F'} • {patient.bloodGroup}
                      </p>
                    </div>
                    {patient.isEmergency && (
                      <Badge variant="destructive" className="text-xs">Emergency</Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    View Records
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;

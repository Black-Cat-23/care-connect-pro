import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Users,
  Stethoscope,
  Calendar,
  AlertTriangle,
  Clock,
  ThumbsUp,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  dashboardStats,
  departmentStats,
  weeklyAppointments,
  appointments,
  doctors,
  patients,
} from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(210, 80%, 45%)', 'hsl(168, 60%, 40%)', 'hsl(200, 85%, 50%)', 'hsl(145, 65%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(0, 75%, 55%)'];

const AdminDashboard: React.FC = () => {
  const todayAppointments = appointments.filter(apt => apt.date === '2024-12-31');
  const emergencyPatients = patients.filter(p => p.isEmergency);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Hospital Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening at your hospital today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Schedule
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Doctor
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Patients"
            value={dashboardStats.totalPatients}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Total Doctors"
            value={dashboardStats.totalDoctors}
            icon={Stethoscope}
            variant="secondary"
          />
          <StatCard
            title="Today's Appointments"
            value={dashboardStats.appointmentsToday}
            icon={Calendar}
            variant="default"
          />
          <StatCard
            title="Emergency Cases"
            value={dashboardStats.emergencyCases}
            icon={AlertTriangle}
            variant="emergency"
          />
          <StatCard
            title="Avg Wait Time"
            value={`${dashboardStats.averageWaitTime} min`}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Satisfaction"
            value={`${dashboardStats.patientSatisfaction}%`}
            icon={ThumbsUp}
            variant="success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Appointments Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Appointments
              </CardTitle>
              <CardDescription>Appointment trends for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAppointments}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(210, 80%, 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-secondary" />
                Department Distribution
              </CardTitle>
              <CardDescription>Doctors per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="doctors"
                      nameKey="name"
                      label={({ name, doctors }) => `${name}: ${doctors}`}
                      labelLine={false}
                    >
                      {departmentStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>{todayAppointments.length} appointments scheduled</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.slice(0, 4).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {apt.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.doctorName} • {apt.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{apt.time}</p>
                      <Badge
                        variant={
                          apt.status === 'completed' ? 'default' :
                          apt.status === 'approved' ? 'secondary' :
                          apt.status === 'pending' ? 'outline' : 'destructive'
                        }
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Alerts */}
          <Card className="border-emergency/30 bg-emergency/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emergency">
                <AlertTriangle className="h-5 w-5" />
                Emergency Alerts
              </CardTitle>
              <CardDescription>Patients requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyPatients.length > 0 ? (
                  emergencyPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 rounded-lg bg-emergency/10 border border-emergency/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{patient.name}</p>
                        <Badge variant="destructive" className="animate-pulse">URGENT</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Blood Group: {patient.bloodGroup}
                      </p>
                      <Button size="sm" className="w-full mt-2 bg-emergency hover:bg-emergency/90">
                        View Details
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No emergency cases</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats - Doctors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Doctors</CardTitle>
              <CardDescription>Doctors currently available</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              Manage <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {doctors.slice(0, 4).map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{doctor.department}</Badge>
                    <span className="text-muted-foreground">⭐ {doctor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

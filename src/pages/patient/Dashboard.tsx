import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  Activity,
  Heart,
  Pill,
} from 'lucide-react';
import { appointments, prescriptions, doctors, patients } from '@/lib/mockData';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Find patient's data
  const currentPatient = patients.find(p => p.email === user?.email) || patients[0];
  
  // Filter appointments for this patient
  const patientAppointments = appointments.filter(apt => apt.patientName === currentPatient.name);
  const upcomingAppointments = patientAppointments.filter(apt => apt.status !== 'completed');
  const completedAppointments = patientAppointments.filter(apt => apt.status === 'completed');
  const patientPrescriptions = prescriptions.filter(p => p.patientId === currentPatient.id);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="rounded-xl gradient-primary p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Hello, {currentPatient.name.split(' ')[0]}!
              </h1>
              <p className="mt-1 text-white/80">
                Welcome back to MediCare. How are you feeling today?
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
              <Link to="/patient/ai-assistant">
                <Button className="gap-2 bg-white text-primary hover:bg-white/90">
                  <MessageSquare className="h-4 w-4" />
                  AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Health Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{currentPatient.bloodGroup}</p>
            <p className="text-xs text-muted-foreground">Blood Group</p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-secondary">{upcomingAppointments.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming Visits</p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-2">
              <Pill className="h-6 w-6 text-info" />
            </div>
            <p className="text-2xl font-bold text-info">{patientPrescriptions.length}</p>
            <p className="text-xs text-muted-foreground">Prescriptions</p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Activity className="h-6 w-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">{completedAppointments.length}</p>
            <p className="text-xs text-muted-foreground">Past Visits</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Book New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => {
                    const doctor = doctors.find(d => d.name === apt.doctorName);
                    return (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-card transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center p-3 rounded-lg bg-primary/10">
                            <p className="text-xs text-muted-foreground">
                              {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                            </p>
                            <p className="text-xl font-bold text-primary">
                              {new Date(apt.date).getDate()}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold">{apt.doctorName}</p>
                            <p className="text-sm text-muted-foreground">
                              {doctor?.specialization} • {apt.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={apt.status === 'approved' ? 'secondary' : 'outline'}
                          >
                            {apt.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="mb-4">No upcoming appointments</p>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Book an Appointment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Health Assistant */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Health Assistant
              </CardTitle>
              <CardDescription>Get instant health guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-card border">
                <p className="text-sm font-medium mb-2">How can I help you today?</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                    💊 Ask about my medications
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                    🩺 Describe my symptoms
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                    📋 Understand my reports
                  </Button>
                </div>
              </div>

              <Link to="/patient/ai-assistant" className="block">
                <Button className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Open Chat Assistant
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                ⚕️ AI provides information only. Consult a doctor for diagnosis.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Prescriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Prescriptions</CardTitle>
              <CardDescription>Your medications and treatments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {patientPrescriptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="p-4 rounded-lg border bg-card hover:shadow-card transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{prescription.diagnosis}</p>
                        <p className="text-sm text-muted-foreground">
                          {prescription.doctorName} • {prescription.date}
                        </p>
                      </div>
                      <Badge variant="outline">{prescription.medications.length} meds</Badge>
                    </div>
                    <div className="space-y-2">
                      {prescription.medications.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Pill className="h-4 w-4 text-primary" />
                          <span>{med.name} - {med.dosage}</span>
                        </div>
                      ))}
                      {prescription.medications.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{prescription.medications.length - 2} more medications
                        </p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No prescriptions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;

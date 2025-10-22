import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Bed, Calendar, DollarSign, TrendingUp, Users, Activity } from 'lucide-react';
import { mockDashboardStats, mockAppointments, mockPayments } from '../data/mockData';
import { Badge } from '../components/ui/Badge';

export function Dashboard() {
  const stats = mockDashboardStats;
  const occupancyRate = ((stats.occupiedBeds / stats.totalBeds) * 100).toFixed(1);

  const statsCards = [
    {
      title: 'Total Beds',
      value: stats.totalBeds,
      icon: Bed,
      color: 'bg-[#2C7BE5]',
      subtitle: `${occupancyRate}% occupied`
    },
    {
      title: 'Available Beds',
      value: stats.availableBeds,
      icon: Activity,
      color: 'bg-[#00C896]',
      subtitle: `${stats.occupiedBeds} occupied`
    },
    {
      title: 'Today\'s Appointments',
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'bg-[#7B68EE]',
      subtitle: 'Scheduled'
    },
    {
      title: 'Revenue Today',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-[#FFB74D]',
      subtitle: `${stats.pendingPayments} pending`
    }
  ];

  const getAppointmentStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success' as const;
      case 'in-progress':
        return 'info' as const;
      case 'confirmed':
        return 'warning' as const;
      case 'scheduled':
        return 'neutral' as const;
      default:
        return 'neutral' as const;
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success' as const;
      case 'pending':
        return 'warning' as const;
      case 'failed':
        return 'error' as const;
      default:
        return 'neutral' as const;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Dashboard</h2>
        <p className="text-[#718096]">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardBody className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#718096] mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-[#2D3748] mb-1">{stat.value}</p>
                    <p className="text-xs text-[#718096]">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2D3748] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2C7BE5]" />
                Today's Appointments
              </h3>
              <Badge variant="info" size="sm">{mockAppointments.length} total</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#2D3748]">{appointment.patientName}</p>
                    <Badge variant={getAppointmentStatusVariant(appointment.status)} size="sm">
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#718096]">{appointment.doctorName} • {appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#2D3748]">{appointment.time}</p>
                  <p className="text-xs text-[#718096]">Queue #{appointment.queueNumber}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2D3748] flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#00C896]" />
                Recent Payments
              </h3>
              <Badge variant="success" size="sm">₹{stats.revenue.toLocaleString()}</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {mockPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#2D3748]">{payment.patientName}</p>
                    <Badge variant={getPaymentStatusVariant(payment.status)} size="sm">
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#718096]">{payment.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2D3748]">₹{payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-[#718096]">{payment.method}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#2D3748] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#7B68EE]" />
            Bed Occupancy Overview
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#718096]">Occupancy Rate</span>
              <span className="font-semibold text-[#2D3748]">{occupancyRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#2C7BE5] h-full rounded-full transition-all"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-[#00C896] bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold text-[#00C896]">{stats.availableBeds}</p>
                <p className="text-xs text-[#718096] mt-1">Available</p>
              </div>
              <div className="text-center p-3 bg-[#E63946] bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold text-[#E63946]">{stats.occupiedBeds}</p>
                <p className="text-xs text-[#718096] mt-1">Occupied</p>
              </div>
              <div className="text-center p-3 bg-[#FFB74D] bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold text-[#FFB74D]">2</p>
                <p className="text-xs text-[#718096] mt-1">Cleaning</p>
              </div>
              <div className="text-center p-3 bg-[#7B68EE] bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold text-[#7B68EE]">1</p>
                <p className="text-xs text-[#718096] mt-1">Reserved</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

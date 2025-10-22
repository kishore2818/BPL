

// // import { useState } from 'react';
// // import { Card, CardBody, CardHeader } from '../components/ui/Card';
// // import { Button } from '../components/ui/Button';
// // import { Select } from '../components/ui/Select';
// // import { Badge } from '../components/ui/Badge';
// // import { Input } from '../components/ui/Input';
// // import { Textarea } from '../components/ui/Textarea';
// // import {
// //   Calendar,
// //   Clock,
// //   Plus,
// //   Filter,
// //   ChevronLeft,
// //   ChevronRight,
// //   User,
// //   Stethoscope,
// //   CheckCircle,
// //   XCircle,
// //   AlertCircle,
// //   Phone,
// //   Mail,
// //   MapPin,
// //   X
// // } from 'lucide-react';
// // import { mockAppointments } from '../data/mockData';
// // import { AppointmentStatus, Appointment } from '../types';

// // interface NewAppointmentForm {
// //   patientName: string;
// //   phoneNumber: string;
// //   email: string;
// //   purpose: string;
// //   doctorName: string;
// //   date: string;
// //   time: string;
// //   type: string;
// //   notes: string;
// // }

// // export function Appointments() {
// //   const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
// //   const [selectedStatus, setSelectedStatus] = useState<string>('all');
// //   const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
// //   const [showNewAppointment, setShowNewAppointment] = useState<boolean>(false);
// //   const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>({
// //     patientName: '',
// //     phoneNumber: '',
// //     email: '',
// //     purpose: '',
// //     doctorName: '',
// //     date: new Date().toISOString().split('T')[0],
// //     time: '',
// //     type: 'consultation',
// //     notes: ''
// //   });

// //   const filteredAppointments = mockAppointments.filter(appointment => {
// //     const matchesDate = appointment.date === selectedDate;
// //     const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
// //     return matchesDate && matchesStatus;
// //   });

// //   const getStatusVariant = (status: AppointmentStatus) => {
// //     const variants: Record<AppointmentStatus, 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
// //       'completed': 'success',
// //       'in-progress': 'info',
// //       'confirmed': 'warning',
// //       'scheduled': 'neutral',
// //       'cancelled': 'error'
// //     };
// //     return variants[status];
// //   };

// //   const getStatusIcon = (status: AppointmentStatus) => {
// //     const icons: Record<AppointmentStatus, any> = {
// //       'completed': CheckCircle,
// //       'in-progress': AlertCircle,
// //       'confirmed': Clock,
// //       'scheduled': Calendar,
// //       'cancelled': XCircle
// //     };
// //     return icons[status];
// //   };

// //   const stats = {
// //     total: filteredAppointments.length,
// //     completed: filteredAppointments.filter(a => a.status === 'completed').length,
// //     inProgress: filteredAppointments.filter(a => a.status === 'in-progress').length,
// //     scheduled: filteredAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length
// //   };

// //   const timeSlots = [
// //     '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
// //     '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
// //     '16:00', '16:30', '17:00', '17:30'
// //   ];

// //   const doctors = Array.from(new Set(mockAppointments.map(a => a.doctorName)));
  
// //   const appointmentTypes = [
// //     'Consultation',
// //     'Follow-up',
// //     'Check-up',
// //     'Emergency',
// //     'Surgery',
// //     'Therapy',
// //     'Vaccination',
// //     'Test/Scan'
// //   ];

// //   const handleInputChange = (field: keyof NewAppointmentForm, value: string) => {
// //     setNewAppointment(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   const handleCreateAppointment = () => {
// //     // Validate required fields
// //     if (!newAppointment.patientName || !newAppointment.phoneNumber || !newAppointment.purpose || !newAppointment.doctorName || !newAppointment.time) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }

// //     // Create new appointment object
// //     const appointment: Appointment = {
// //       id: `app-${Date.now()}`,
// //       patientName: newAppointment.patientName,
// //       doctorName: newAppointment.doctorName,
// //       date: newAppointment.date,
// //       time: newAppointment.time,
// //       type: newAppointment.type as any,
// //       status: 'scheduled',
// //       duration: 30,
// //       queueNumber: Math.floor(Math.random() * 50) + 1,
// //       notes: newAppointment.notes,
// //       phone: newAppointment.phoneNumber,
// //       email: newAppointment.email,
// //       purpose: newAppointment.purpose
// //     };

// //     // In a real app, you would make an API call here
// //     console.log('New appointment:', appointment);
    
// //     // Reset form and close modal
// //     setNewAppointment({
// //       patientName: '',
// //       phoneNumber: '',
// //       email: '',
// //       purpose: '',
// //       doctorName: '',
// //       date: new Date().toISOString().split('T')[0],
// //       time: '',
// //       type: 'consultation',
// //       notes: ''
// //     });
// //     setShowNewAppointment(false);
    
// //     alert('Appointment created successfully!');
// //   };

// //   const resetForm = () => {
// //     setNewAppointment({
// //       patientName: '',
// //       phoneNumber: '',
// //       email: '',
// //       purpose: '',
// //       doctorName: '',
// //       date: new Date().toISOString().split('T')[0],
// //       time: '',
// //       type: 'consultation',
// //       notes: ''
// //     });
// //     setShowNewAppointment(false);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* New Appointment Modal */}
// //       {showNewAppointment && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <CardHeader className="flex flex-row items-center justify-between">
// //               <div>
// //                 <h3 className="text-xl font-bold text-[#2D3748]">New Appointment</h3>
// //                 <p className="text-sm text-[#718096]">Book a new appointment for a patient</p>
// //               </div>
// //               <Button variant="ghost" size="sm" onClick={resetForm}>
// //                 <X className="w-5 h-5" />
// //               </Button>
// //             </CardHeader>
// //             <CardBody className="space-y-4">
// //               {/* Patient Information */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Patient Name *
// //                   </label>
// //                   <Input
// //                     value={newAppointment.patientName}
// //                     onChange={(e) => handleInputChange('patientName', e.target.value)}
// //                     placeholder="Enter patient full name"
// //                     icon={User}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Phone Number *
// //                   </label>
// //                   <Input
// //                     value={newAppointment.phoneNumber}
// //                     onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
// //                     placeholder="Enter phone number"
// //                     icon={Phone}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Email Address
// //                   </label>
// //                   <Input
// //                     value={newAppointment.email}
// //                     onChange={(e) => handleInputChange('email', e.target.value)}
// //                     placeholder="Enter email address"
// //                     type="email"
// //                     icon={Mail}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Appointment Purpose *
// //                   </label>
// //                   <Input
// //                     value={newAppointment.purpose}
// //                     onChange={(e) => handleInputChange('purpose', e.target.value)}
// //                     placeholder="Reason for appointment"
// //                     icon={Stethoscope}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Appointment Details */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Doctor *
// //                   </label>
// //                   <Select
// //                     value={newAppointment.doctorName}
// //                     onChange={(e) => handleInputChange('doctorName', e.target.value)}
// //                     options={[
// //                       { value: '', label: 'Select a doctor' },
// //                       ...doctors.map(doctor => ({ value: doctor, label: doctor }))
// //                     ]}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Appointment Type
// //                   </label>
// //                   <Select
// //                     value={newAppointment.type}
// //                     onChange={(e) => handleInputChange('type', e.target.value)}
// //                     options={appointmentTypes.map(type => ({ 
// //                       value: type.toLowerCase(), 
// //                       label: type 
// //                     }))}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Date *
// //                   </label>
// //                   <Input
// //                     type="date"
// //                     value={newAppointment.date}
// //                     onChange={(e) => handleInputChange('date', e.target.value)}
// //                     icon={Calendar}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                     Time *
// //                   </label>
// //                   <Select
// //                     value={newAppointment.time}
// //                     onChange={(e) => handleInputChange('time', e.target.value)}
// //                     options={[
// //                       { value: '', label: 'Select time' },
// //                       ...timeSlots.map(time => ({ value: time, label: time }))
// //                     ]}
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#2D3748] mb-1">
// //                   Additional Notes
// //                 </label>
// //                 <Textarea
// //                   value={newAppointment.notes}
// //                   onChange={(e) => handleInputChange('notes', e.target.value)}
// //                   placeholder="Any additional information, symptoms, or special requirements..."
// //                   rows={3}
// //                 />
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex gap-3 pt-4 border-t border-gray-200">
// //                 <Button variant="primary" onClick={handleCreateAppointment} className="flex-1">
// //                   <CheckCircle className="w-4 h-4 mr-2" />
// //                   Create Appointment
// //                 </Button>
// //                 <Button variant="ghost" onClick={resetForm}>
// //                   Cancel
// //                 </Button>
// //               </div>
// //             </CardBody>
// //           </Card>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Appointments</h2>
// //           <p className="text-[#718096]">Manage patient appointments and schedules</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <Button
// //             variant={viewMode === 'list' ? 'primary' : 'ghost'}
// //             onClick={() => setViewMode('list')}
// //           >
// //             List View
// //           </Button>
// //           <Button
// //             variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
// //             onClick={() => setViewMode('calendar')}
// //           >
// //             Calendar View
// //           </Button>
// //           <Button 
// //             icon={Plus} 
// //             onClick={() => setShowNewAppointment(true)}
// //           >
// //             New Appointment
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <Card className="bg-gradient-to-br from-[#2C7BE5] to-[#0E5CAD]">
// //           <CardBody>
// //             <Calendar className="w-8 h-8 text-white mb-2" />
// //             <p className="text-3xl font-bold text-white">{stats.total}</p>
// //             <p className="text-sm text-white text-opacity-90">Total Today</p>
// //           </CardBody>
// //         </Card>
// //         <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
// //           <CardBody>
// //             <CheckCircle className="w-8 h-8 text-white mb-2" />
// //             <p className="text-3xl font-bold text-white">{stats.completed}</p>
// //             <p className="text-sm text-white text-opacity-90">Completed</p>
// //           </CardBody>
// //         </Card>
// //         <Card className="bg-gradient-to-br from-[#7B68EE] to-[#6A57D9]">
// //           <CardBody>
// //             <AlertCircle className="w-8 h-8 text-white mb-2" />
// //             <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
// //             <p className="text-sm text-white text-opacity-90">In Progress</p>
// //           </CardBody>
// //         </Card>
// //         <Card className="bg-gradient-to-br from-[#FFB74D] to-[#FFA726]">
// //           <CardBody>
// //             <Clock className="w-8 h-8 text-white mb-2" />
// //             <p className="text-3xl font-bold text-white">{stats.scheduled}</p>
// //             <p className="text-sm text-white text-opacity-90">Scheduled</p>
// //           </CardBody>
// //         </Card>
// //       </div>

// //       {/* Filters */}
// //       <Card>
// //         <CardBody>
// //           <div className="flex flex-col md:flex-row gap-4 items-center">
// //             <div className="flex items-center gap-2">
// //               <Button size="sm" variant="ghost">
// //                 <ChevronLeft className="w-4 h-4" />
// //               </Button>
// //               <input
// //                 type="date"
// //                 value={selectedDate}
// //                 onChange={(e) => setSelectedDate(e.target.value)}
// //                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent"
// //               />
// //               <Button size="sm" variant="ghost">
// //                 <ChevronRight className="w-4 h-4" />
// //               </Button>
// //             </div>
// //             <Select
// //               value={selectedStatus}
// //               onChange={(e) => setSelectedStatus(e.target.value)}
// //               options={[
// //                 { value: 'all', label: 'All Status' },
// //                 { value: 'scheduled', label: 'Scheduled' },
// //                 { value: 'confirmed', label: 'Confirmed' },
// //                 { value: 'in-progress', label: 'In Progress' },
// //                 { value: 'completed', label: 'Completed' },
// //                 { value: 'cancelled', label: 'Cancelled' }
// //               ]}
// //               className="w-full md:w-48"
// //             />
// //             <Button variant="ghost" icon={Filter}>More Filters</Button>
// //           </div>
// //         </CardBody>
// //       </Card>

// //       {/* Appointments List */}
// //       {viewMode === 'list' ? (
// //         <div className="space-y-4">
// //           {filteredAppointments.map((appointment) => {
// //             const StatusIcon = getStatusIcon(appointment.status);
// //             return (
// //               <Card key={appointment.id} hover>
// //                 <CardBody>
// //                   <div className="flex items-center gap-4">
// //                     <div className="bg-[#E8F0FE] p-4 rounded-lg">
// //                       <Clock className="w-8 h-8 text-[#2C7BE5]" />
// //                     </div>
// //                     <div className="flex-1">
// //                       <div className="flex items-start justify-between mb-2">
// //                         <div>
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <h3 className="text-lg font-semibold text-[#2D3748]">{appointment.patientName}</h3>
// //                             <Badge variant={getStatusVariant(appointment.status)} size="sm">
// //                               <StatusIcon className="w-3 h-3 mr-1" />
// //                               {appointment.status}
// //                             </Badge>
// //                           </div>
// //                           <p className="text-sm text-[#718096]">{appointment.type}</p>
// //                         </div>
// //                         <div className="text-right">
// //                           <p className="text-xl font-bold text-[#2D3748]">{appointment.time}</p>
// //                           <p className="text-sm text-[#718096]">{appointment.duration} min</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-6 text-sm">
// //                         <div className="flex items-center gap-2 text-[#718096]">
// //                           <Stethoscope className="w-4 h-4" />
// //                           <span>{appointment.doctorName}</span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-[#718096]">
// //                           <User className="w-4 h-4" />
// //                           <span>Queue #{appointment.queueNumber}</span>
// //                         </div>
// //                       </div>
// //                       {appointment.notes && (
// //                         <p className="text-sm text-[#718096] mt-2 italic">{appointment.notes}</p>
// //                       )}
// //                       <div className="flex gap-2 mt-3">
// //                         {appointment.status === 'scheduled' && (
// //                           <>
// //                             <Button size="sm" variant="success">Confirm</Button>
// //                             <Button size="sm" variant="ghost">Reschedule</Button>
// //                             <Button size="sm" variant="error">Cancel</Button>
// //                           </>
// //                         )}
// //                         {appointment.status === 'confirmed' && (
// //                           <>
// //                             <Button size="sm" variant="primary">Start</Button>
// //                             <Button size="sm" variant="ghost">Reschedule</Button>
// //                           </>
// //                         )}
// //                         {appointment.status === 'in-progress' && (
// //                           <Button size="sm" variant="success">Complete</Button>
// //                         )}
// //                         {appointment.status === 'completed' && (
// //                           <Button size="sm" variant="ghost">View Details</Button>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </CardBody>
// //               </Card>
// //             );
// //           })}

// //           {filteredAppointments.length === 0 && (
// //             <Card>
// //               <CardBody className="text-center py-12">
// //                 <Calendar className="w-12 h-12 text-[#718096] mx-auto mb-3" />
// //                 <h3 className="text-lg font-medium text-[#2D3748] mb-1">No appointments found</h3>
// //                 <p className="text-[#718096]">No appointments scheduled for this date</p>
// //               </CardBody>
// //             </Card>
// //           )}
// //         </div>
// //       ) : (
// //         <Card>
// //           <CardBody>
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50 border-b border-gray-200">
// //                   <tr>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider sticky left-0 bg-gray-50">
// //                       Time
// //                     </th>
// //                     {doctors.map((doctor) => (
// //                       <th key={doctor} className="px-4 py-3 text-center text-xs font-medium text-[#718096] uppercase tracking-wider min-w-[200px]">
// //                         {doctor}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {timeSlots.map((time) => (
// //                     <tr key={time} className="hover:bg-gray-50">
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#2D3748] sticky left-0 bg-white">
// //                         {time}
// //                       </td>
// //                       {doctors.map((doctor) => {
// //                         const appointment = filteredAppointments.find(
// //                           a => a.time === time && a.doctorName === doctor
// //                         );
// //                         return (
// //                           <td key={`${time}-${doctor}`} className="px-2 py-2">
// //                             {appointment ? (
// //                               <div className={`p-2 rounded-lg border-l-4 ${
// //                                 appointment.status === 'completed' ? 'border-[#00C896] bg-[#00C896] bg-opacity-10' :
// //                                 appointment.status === 'in-progress' ? 'border-[#7B68EE] bg-[#7B68EE] bg-opacity-10' :
// //                                 appointment.status === 'confirmed' ? 'border-[#FFB74D] bg-[#FFB74D] bg-opacity-10' :
// //                                 'border-gray-300 bg-gray-50'
// //                               }`}>
// //                                 <p className="text-sm font-medium text-[#2D3748] truncate">{appointment.patientName}</p>
// //                                 <p className="text-xs text-[#718096] truncate">{appointment.type}</p>
// //                                 <Badge variant={getStatusVariant(appointment.status)} size="sm" className="mt-1">
// //                                   {appointment.status}
// //                                 </Badge>
// //                               </div>
// //                             ) : (
// //                               <button 
// //                                 className="w-full p-3 border border-dashed border-gray-300 rounded-lg hover:border-[#2C7BE5] hover:bg-[#E8F0FE] transition-colors"
// //                                 onClick={() => {
// //                                   setShowNewAppointment(true);
// //                                   setNewAppointment(prev => ({
// //                                     ...prev,
// //                                     doctorName: doctor,
// //                                     time: time,
// //                                     date: selectedDate
// //                                   }));
// //                                 }}
// //                               >
// //                                 <Plus className="w-4 h-4 text-[#718096] mx-auto" />
// //                               </button>
// //                             )}
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </CardBody>
// //         </Card>
// //       )}
// //     </div>
// //   );
// // }






// import { useState, useEffect, ChangeEvent } from 'react';
// import { Card, CardBody, CardHeader } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { Select } from '../components/ui/Select';
// import { Badge } from '../components/ui/Badge';
// import { Input } from '../components/ui/Input';
// import { Textarea } from '../components/ui/Textarea';
// import {
//   Calendar,
//   Clock,
//   Plus,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Stethoscope,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Phone,
//   Mail,
//   X,
//   Loader
// } from 'lucide-react';
// import { AppointmentStatus, Appointment } from '../types';

// interface NewAppointmentForm {
//   patientName: string;
//   phoneNumber: string;
//   email: string;
//   purpose: string;
//   doctorName: string;
//   date: string;
//   time: string;
//   type: string;
//   notes: string;
// }

// export function Appointments() {
//   const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
//   const [selectedStatus, setSelectedStatus] = useState<string>('all');
//   const [showNewAppointment, setShowNewAppointment] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>({
//     patientName: '',
//     phoneNumber: '',
//     email: '',
//     purpose: '',
//     doctorName: '',
//     date: new Date().toISOString().split('T')[0],
//     time: '',
//     type: 'consultation',
//     notes: ''
//   });

//   // Fetch appointments from server
//   const fetchAppointments = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:5000/appointments');
//       if (response.ok) {
//         const data = await response.json();
//         setAppointments(data);
//       } else {
//         console.error('Failed to fetch appointments');
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load appointments on component mount and when selectedDate changes
//   useEffect(() => {
//     fetchAppointments();
//   }, [selectedDate]);

//   const filteredAppointments = appointments.filter(appointment => {
//     const matchesDate = appointment.date === selectedDate;
//     const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
//     return matchesDate && matchesStatus;
//   });

//   const getStatusVariant = (status: AppointmentStatus) => {
//     const variants: Record<AppointmentStatus, 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
//       'completed': 'success',
//       'in-progress': 'info',
//       'confirmed': 'warning',
//       'scheduled': 'neutral',
//       'cancelled': 'error'
//     };
//     return variants[status];
//   };

//   const getStatusIcon = (status: AppointmentStatus) => {
//     const icons: Record<AppointmentStatus, any> = {
//       'completed': CheckCircle,
//       'in-progress': AlertCircle,
//       'confirmed': Clock,
//       'scheduled': Calendar,
//       'cancelled': XCircle
//     };
//     return icons[status];
//   };

//   const stats = {
//     total: filteredAppointments.length,
//     completed: filteredAppointments.filter(a => a.status === 'completed').length,
//     inProgress: filteredAppointments.filter(a => a.status === 'in-progress').length,
//     scheduled: filteredAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length
//   };

//   const timeSlots = [
//     '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
//     '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
//     '16:00', '16:30', '17:00', '17:30'
//   ];

//   const doctors = Array.from(new Set(appointments.map(a => a.doctorName)));
  
//   const appointmentTypes = [
//     'Consultation',
//     'Follow-up',
//     'Check-up',
//     'Emergency',
//     'Surgery',
//     'Therapy',
//     'Vaccination',
//     'Test/Scan'
//   ];

//   const handleInputChange = (field: keyof NewAppointmentForm, value: string) => {
//     setNewAppointment(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSelectChange = (field: keyof NewAppointmentForm) => (e: ChangeEvent<HTMLSelectElement>) => {
//     handleInputChange(field, e.target.value);
//   };

//   const handleCreateAppointment = async () => {
//     // Validate required fields
//     if (!newAppointment.patientName || !newAppointment.phoneNumber || !newAppointment.purpose || !newAppointment.doctorName || !newAppointment.time) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/appointments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           patientName: newAppointment.patientName,
//           doctorName: newAppointment.doctorName,
//           date: newAppointment.date,
//           time: newAppointment.time,
//           type: newAppointment.type,
//           status: 'scheduled',
//           duration: 30,
//           notes: newAppointment.notes,
//           phone: newAppointment.phoneNumber,
//           email: newAppointment.email,
//           purpose: newAppointment.purpose
//         }),
//       });

//       if (response.ok) {
//         // Refresh appointments list
//         await fetchAppointments();
        
//         // Reset form and close modal
//         setNewAppointment({
//           patientName: '',
//           phoneNumber: '',
//           email: '',
//           purpose: '',
//           doctorName: '',
//           date: new Date().toISOString().split('T')[0],
//           time: '',
//           type: 'consultation',
//           notes: ''
//         });
//         setShowNewAppointment(false);
        
//         alert('Appointment created successfully!');
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to create appointment: ${errorData.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error creating appointment:', error);
//       alert('Failed to create appointment. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setNewAppointment({
//       patientName: '',
//       phoneNumber: '',
//       email: '',
//       purpose: '',
//       doctorName: '',
//       date: new Date().toISOString().split('T')[0],
//       time: '',
//       type: 'consultation',
//       notes: ''
//     });
//     setShowNewAppointment(false);
//   };

//   const handleStatusUpdate = async (appointmentId: string, newStatus: AppointmentStatus) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/appointments/${appointmentId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (response.ok) {
//         await fetchAppointments();
//       } else {
//         alert('Failed to update appointment status');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       alert('Failed to update appointment status');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Select options with proper unique keys
//   const doctorOptions = [
//     { value: '', label: 'Select a doctor' },
//     ...doctors.map(doctor => ({ 
//       value: doctor, 
//       label: doctor 
//     }))
//   ];

//   const appointmentTypeOptions = appointmentTypes.map(type => ({ 
//     value: type.toLowerCase(), 
//     label: type 
//   }));

//   const timeSlotOptions = [
//     { value: '', label: 'Select time' },
//     ...timeSlots.map(time => ({ 
//       value: time, 
//       label: time 
//     }))
//   ];

//   const statusFilterOptions = [
//     { value: 'all', label: 'All Status' },
//     { value: 'scheduled', label: 'Scheduled' },
//     { value: 'confirmed', label: 'Confirmed' },
//     { value: 'in-progress', label: 'In Progress' },
//     { value: 'completed', label: 'Completed' },
//     { value: 'cancelled', label: 'Cancelled' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* New Appointment Modal */}
//       {showNewAppointment && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4">
//               <div>
//                 <h3 className="text-xl font-bold text-[#2D3748]">Schedule New Appointment</h3>
//                 <p className="text-sm text-[#718096]">Enter patient details to book an appointment</p>
//               </div>
//               <Button variant="ghost" size="sm" onClick={resetForm} disabled={isLoading}>
//                 <X className="w-5 h-5" />
//               </Button>
//             </CardHeader>
//             <CardBody className="space-y-4 pt-4">
//               {/* Patient Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                     Patient Name *
//                   </label>
//                   <Input
//                     value={newAppointment.patientName}
//                     onChange={(e) => handleInputChange('patientName', e.target.value)}
//                     placeholder="Enter patient full name"
//                     icon={User}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                     Phone Number *
//                   </label>
//                   <Input
//                     value={newAppointment.phoneNumber}
//                     onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                     placeholder="Enter phone number"
//                     icon={Phone}
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                     Email Address
//                   </label>
//                   <Input
//                     value={newAppointment.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     placeholder="Enter email address"
//                     type="email"
//                     icon={Mail}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                     Appointment Purpose *
//                   </label>
//                   <Input
//                     value={newAppointment.purpose}
//                     onChange={(e) => handleInputChange('purpose', e.target.value)}
//                     placeholder="Reason for appointment"
//                     icon={Stethoscope}
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               {/* Appointment Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Select
//                   label="Doctor *"
//                   value={newAppointment.doctorName}
//                   onChange={handleSelectChange('doctorName')}
//                   options={doctorOptions}
//                   placeholder="Select a doctor"
//                   required
//                   disabled={isLoading}
//                 />
//                 <Select
//                   label="Appointment Type"
//                   value={newAppointment.type}
//                   onChange={handleSelectChange('type')}
//                   options={appointmentTypeOptions}
//                   placeholder="Select type"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                     Date *
//                   </label>
//                   <Input
//                     type="date"
//                     value={newAppointment.date}
//                     onChange={(e) => handleInputChange('date', e.target.value)}
//                     icon={Calendar}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <Select
//                   label="Time *"
//                   value={newAppointment.time}
//                   onChange={handleSelectChange('time')}
//                   options={timeSlotOptions}
//                   placeholder="Select time"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#2D3748] mb-1">
//                   Additional Notes
//                 </label>
//                 <Textarea
//                   value={newAppointment.notes}
//                   onChange={(e) => handleInputChange('notes', e.target.value)}
//                   placeholder="Any additional information, symptoms, or special requirements..."
//                   rows={3}
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4 border-t border-gray-200">
//                 <Button 
//                   variant="primary" 
//                   onClick={handleCreateAppointment} 
//                   className="flex-1"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <Loader className="w-4 h-4 mr-2 animate-spin" />
//                   ) : (
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                   )}
//                   {isLoading ? 'Creating...' : 'Create Appointment'}
//                 </Button>
//                 <Button variant="ghost" onClick={resetForm} disabled={isLoading}>
//                   Cancel
//                 </Button>
//               </div>
//             </CardBody>
//           </Card>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Appointment Management</h2>
//           <p className="text-[#718096]">Schedule and manage patient appointments efficiently</p>
//         </div>
//         <Button 
//           icon={Plus} 
//           onClick={() => setShowNewAppointment(true)}
//           disabled={isLoading}
//         >
//           New Appointment
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-br from-[#2C7BE5] to-[#0E5CAD]">
//           <CardBody className="p-4">
//             <div className="flex items-center">
//               <Calendar className="w-8 h-8 text-white mr-3" />
//               <div>
//                 <p className="text-3xl font-bold text-white">{stats.total}</p>
//                 <p className="text-sm text-white text-opacity-90">Total Today</p>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//         <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
//           <CardBody className="p-4">
//             <div className="flex items-center">
//               <CheckCircle className="w-8 h-8 text-white mr-3" />
//               <div>
//                 <p className="text-3xl font-bold text-white">{stats.completed}</p>
//                 <p className="text-sm text-white text-opacity-90">Completed</p>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//         <Card className="bg-gradient-to-br from-[#7B68EE] to-[#6A57D9]">
//           <CardBody className="p-4">
//             <div className="flex items-center">
//               <AlertCircle className="w-8 h-8 text-white mr-3" />
//               <div>
//                 <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
//                 <p className="text-sm text-white text-opacity-90">In Progress</p>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//         <Card className="bg-gradient-to-br from-[#FFB74D] to-[#FFA726]">
//           <CardBody className="p-4">
//             <div className="flex items-center">
//               <Clock className="w-8 h-8 text-white mr-3" />
//               <div>
//                 <p className="text-3xl font-bold text-white">{stats.scheduled}</p>
//                 <p className="text-sm text-white text-opacity-90">Scheduled</p>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardBody className="p-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-[#2D3748]">View Date:</span>
//               <div className="flex items-center gap-2">
//                 <Button 
//                   size="sm" 
//                   variant="ghost" 
//                   onClick={() => {
//                     const prevDay = new Date(selectedDate);
//                     prevDay.setDate(prevDay.getDate() - 1);
//                     setSelectedDate(prevDay.toISOString().split('T')[0]);
//                   }}
//                   disabled={isLoading}
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </Button>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent"
//                   disabled={isLoading}
//                 />
//                 <Button 
//                   size="sm" 
//                   variant="ghost"
//                   onClick={() => {
//                     const nextDay = new Date(selectedDate);
//                     nextDay.setDate(nextDay.getDate() + 1);
//                     setSelectedDate(nextDay.toISOString().split('T')[0]);
//                   }}
//                   disabled={isLoading}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 options={statusFilterOptions}
//                 className="w-48"
//                 disabled={isLoading}
//               />
//               <Button variant="ghost" icon={Filter} disabled={isLoading}>
//                 Filters
//               </Button>
//             </div>
//           </div>
//         </CardBody>
//       </Card>

//       {/* Appointments List */}
//       <div className="space-y-4">
//         {isLoading ? (
//           <Card>
//             <CardBody className="text-center py-12">
//               <Loader className="w-8 h-8 text-[#2C7BE5] animate-spin mx-auto mb-3" />
//               <p className="text-[#718096]">Loading appointments...</p>
//             </CardBody>
//           </Card>
//         ) : filteredAppointments.length > 0 ? (
//           filteredAppointments.map((appointment) => {
//             const StatusIcon = getStatusIcon(appointment.status);
//             return (
//               <Card key={appointment.id} hover className="border-l-4 border-l-[#2C7BE5]">
//                 <CardBody className="p-4">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-[#E8F0FE] p-3 rounded-lg">
//                       <Clock className="w-6 h-6 text-[#2C7BE5]" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="text-lg font-semibold text-[#2D3748]">{appointment.patientName}</h3>
//                             <Badge variant={getStatusVariant(appointment.status)} size="sm">
//                               <StatusIcon className="w-3 h-3 mr-1" />
//                               {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                             </Badge>
//                           </div>
//                           <p className="text-sm text-[#718096] capitalize">{appointment.type}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-xl font-bold text-[#2D3748]">{appointment.time}</p>
//                           <p className="text-sm text-[#718096]">{appointment.duration} minutes</p>
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//                         <div className="flex items-center gap-2 text-sm text-[#718096]">
//                           <Stethoscope className="w-4 h-4" />
//                           <span>Dr. {appointment.doctorName}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-[#718096]">
//                           <Phone className="w-4 h-4" />
//                           <span>{appointment.phone_number}</span>
//                         </div>
//                         {appointment.email && (
//                           <div className="flex items-center gap-2 text-sm text-[#718096]">
//                             <Mail className="w-4 h-4" />
//                             <span>{appointment.email}</span>
//                           </div>
//                         )}
//                       </div>

//                       {appointment.notes && (
//                         <div className="bg-gray-50 rounded-lg p-3 mb-3">
//                           <p className="text-sm text-[#718096] italic">{appointment.notes}</p>
//                         </div>
//                       )}

//                       <div className="flex gap-2 pt-3 border-t border-gray-200">
//                         {appointment.status === 'scheduled' && (
//                           <>
//                             <Button 
//                               size="sm" 
//                               variant="success"
//                               onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
//                               disabled={isLoading}
//                             >
//                               Confirm
//                             </Button>
//                             <Button size="sm" variant="ghost" disabled={isLoading}>
//                               Reschedule
//                             </Button>
//                             <Button 
//                               size="sm" 
//                               variant="error"
//                               onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
//                               disabled={isLoading}
//                             >
//                               Cancel
//                             </Button>
//                           </>
//                         )}
//                         {appointment.status === 'confirmed' && (
//                           <>
//                             <Button 
//                               size="sm" 
//                               variant="primary"
//                               onClick={() => handleStatusUpdate(appointment.id, 'in-progress')}
//                               disabled={isLoading}
//                             >
//                               Start Appointment
//                             </Button>
//                             <Button size="sm" variant="ghost" disabled={isLoading}>
//                               Reschedule
//                             </Button>
//                           </>
//                         )}
//                         {appointment.status === 'in-progress' && (
//                           <Button 
//                             size="sm" 
//                             variant="success"
//                             onClick={() => handleStatusUpdate(appointment.id, 'completed')}
//                             disabled={isLoading}
//                           >
//                             Complete Appointment
//                           </Button>
//                         )}
//                         {appointment.status === 'completed' && (
//                           <Button size="sm" variant="ghost" disabled={isLoading}>
//                             View Details
//                           </Button>
//                         )}
//                         {appointment.status === 'cancelled' && (
//                           <Button size="sm" variant="ghost" disabled={isLoading}>
//                             View Details
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             );
//           })
//         ) : (
//           <Card>
//             <CardBody className="text-center py-12">
//               <Calendar className="w-12 h-12 text-[#718096] mx-auto mb-3" />
//               <h3 className="text-lg font-medium text-[#2D3748] mb-1">No appointments scheduled</h3>
//               <p className="text-[#718096] mb-4">No appointments found for {selectedDate}</p>
//               <Button 
//                 icon={Plus} 
//                 onClick={() => setShowNewAppointment(true)}
//                 disabled={isLoading}
//               >
//                 Schedule First Appointment
//               </Button>
//             </CardBody>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }






import { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  X,
  Loader
} from 'lucide-react';
import { AppointmentStatus, Appointment } from '../types';

interface NewAppointmentForm {
  patientName: string;
  phoneNumber: string;
  email: string;
  purpose: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  notes: string;
}

export function Appointments() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showNewAppointment, setShowNewAppointment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>({
    patientName: '',
    phoneNumber: '',
    email: '',
    purpose: '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: 'consultation',
    notes: ''
  });

  // Fetch appointments from server
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load appointments on component mount and when selectedDate changes
  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    return matchesDate && matchesStatus;
  });

  const getStatusVariant = (status: AppointmentStatus) => {
    const variants: Record<AppointmentStatus, 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
      'completed': 'success',
      'in-progress': 'info',
      'confirmed': 'warning',
      'scheduled': 'neutral',
      'cancelled': 'error'
    };
    return variants[status];
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    const icons: Record<AppointmentStatus, any> = {
      'completed': CheckCircle,
      'in-progress': AlertCircle,
      'confirmed': Clock,
      'scheduled': Calendar,
      'cancelled': XCircle
    };
    return icons[status];
  };

  const stats = {
    total: filteredAppointments.length,
    completed: filteredAppointments.filter(a => a.status === 'completed').length,
    inProgress: filteredAppointments.filter(a => a.status === 'in-progress').length,
    scheduled: filteredAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const doctors = Array.from(new Set(appointments.map(a => a.doctorName)));
  
  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Check-up',
    'Emergency',
    'Surgery',
    'Therapy',
    'Vaccination',
    'Test/Scan'
  ];

  const handleInputChange = (field: keyof NewAppointmentForm, value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof NewAppointmentForm) => (e: ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(field, e.target.value);
  };

  const handleCreateAppointment = async () => {
    // Validate required fields
    if (!newAppointment.patientName || !newAppointment.phoneNumber || !newAppointment.purpose || !newAppointment.doctorName || !newAppointment.time) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName: newAppointment.patientName,
          doctorName: newAppointment.doctorName,
          date: newAppointment.date,
          time: newAppointment.time,
          type: newAppointment.type,
          status: 'scheduled',
          duration: 30,
          notes: newAppointment.notes,
          phoneNumber: newAppointment.phoneNumber, // ✅ FIXED: was 'phone'
          email: newAppointment.email,
          purpose: newAppointment.purpose
        }),
      });

      if (response.ok) {
        // Refresh appointments list
        await fetchAppointments();
        
        // Reset form and close modal
        setNewAppointment({
          patientName: '',
          phoneNumber: '',
          email: '',
          purpose: '',
          doctorName: '',
          date: new Date().toISOString().split('T')[0],
          time: '',
          type: 'consultation',
          notes: ''
        });
        setShowNewAppointment(false);
        
        alert('Appointment created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to create appointment: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewAppointment({
      patientName: '',
      phoneNumber: '',
      email: '',
      purpose: '',
      doctorName: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      type: 'consultation',
      notes: ''
    });
    setShowNewAppointment(false);
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: AppointmentStatus) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchAppointments();
      } else {
        alert('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status');
    } finally {
      setIsLoading(false);
    }
  };

  // Select options with proper unique keys
  const doctorOptions = [
    { value: '', label: 'Select a doctor' },
    ...doctors.map(doctor => ({ 
      value: doctor, 
      label: doctor 
    }))
  ];

  const appointmentTypeOptions = appointmentTypes.map(type => ({ 
    value: type.toLowerCase(), 
    label: type 
  }));

  const timeSlotOptions = [
    { value: '', label: 'Select time' },
    ...timeSlots.map(time => ({ 
      value: time, 
      label: time 
    }))
  ];

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="space-y-6">
      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#2D3748]">Schedule New Appointment</h3>
                <p className="text-sm text-[#718096]">Enter patient details to book an appointment</p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetForm} disabled={isLoading}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardBody className="space-y-4 pt-4">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-1">
                    Patient Name *
                  </label>
                  <Input
                    value={newAppointment.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    placeholder="Enter patient full name"
                    icon={User}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-1">
                    Phone Number *
                  </label>
                  <Input
                    value={newAppointment.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    icon={Phone}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-1">
                    Email Address
                  </label>
                  <Input
                    value={newAppointment.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    type="email"
                    icon={Mail}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-1">
                    Appointment Purpose *
                  </label>
                  <Input
                    value={newAppointment.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    placeholder="Reason for appointment"
                    icon={Stethoscope}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Doctor *"
                  value={newAppointment.doctorName}
                  onChange={handleSelectChange('doctorName')}
                  options={doctorOptions}
                  placeholder="Select a doctor"
                  required
                  disabled={isLoading}
                />
                <Select
                  label="Appointment Type"
                  value={newAppointment.type}
                  onChange={handleSelectChange('type')}
                  options={appointmentTypeOptions}
                  placeholder="Select type"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-1">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    icon={Calendar}
                    disabled={isLoading}
                  />
                </div>
                <Select
                  label="Time *"
                  value={newAppointment.time}
                  onChange={handleSelectChange('time')}
                  options={timeSlotOptions}
                  placeholder="Select time"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-1">
                  Additional Notes
                </label>
                <Textarea
                  value={newAppointment.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information, symptoms, or special requirements..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="primary" 
                  onClick={handleCreateAppointment} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Creating...' : 'Create Appointment'}
                </Button>
                <Button variant="ghost" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Appointment Management</h2>
          <p className="text-[#718096]">Schedule and manage patient appointments efficiently</p>
        </div>
        <Button 
          icon={Plus} 
          onClick={() => setShowNewAppointment(true)}
          disabled={isLoading}
        >
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[#2C7BE5] to-[#0E5CAD]">
          <CardBody className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-white mr-3" />
              <div>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
                <p className="text-sm text-white text-opacity-90">Total Today</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
          <CardBody className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-white mr-3" />
              <div>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
                <p className="text-sm text-white text-opacity-90">Completed</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#7B68EE] to-[#6A57D9]">
          <CardBody className="p-4">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-white mr-3" />
              <div>
                <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                <p className="text-sm text-white text-opacity-90">In Progress</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#FFB74D] to-[#FFA726]">
          <CardBody className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-white mr-3" />
              <div>
                <p className="text-3xl font-bold text-white">{stats.scheduled}</p>
                <p className="text-sm text-white text-opacity-90">Scheduled</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#2D3748]">View Date:</span>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    const prevDay = new Date(selectedDate);
                    prevDay.setDate(prevDay.getDate() - 1);
                    setSelectedDate(prevDay.toISOString().split('T')[0]);
                  }}
                  disabled={isLoading}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent"
                  disabled={isLoading}
                />
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => {
                    const nextDay = new Date(selectedDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setSelectedDate(nextDay.toISOString().split('T')[0]);
                  }}
                  disabled={isLoading}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={statusFilterOptions}
                className="w-48"
                disabled={isLoading}
              />
              <Button variant="ghost" icon={Filter} disabled={isLoading}>
                Filters
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardBody className="text-center py-12">
              <Loader className="w-8 h-8 text-[#2C7BE5] animate-spin mx-auto mb-3" />
              <p className="text-[#718096]">Loading appointments...</p>
            </CardBody>
          </Card>
        ) : filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => {
            const StatusIcon = getStatusIcon(appointment.status);
            return (
              <Card key={appointment.id} hover className="border-l-4 border-l-[#2C7BE5]">
                <CardBody className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#E8F0FE] p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-[#2C7BE5]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-[#2D3748]">{appointment.patientName}</h3>
                            <Badge variant={getStatusVariant(appointment.status)} size="sm">
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#718096] capitalize">{appointment.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#2D3748]">{appointment.time}</p>
                          <p className="text-sm text-[#718096]">{appointment.duration} minutes</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-[#718096]">
                          <Stethoscope className="w-4 h-4" />
                          <span>Dr. {appointment.doctorName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#718096]">
                          <Phone className="w-4 h-4" />
                          <span>{appointment.phoneNumber}</span> {/* ✅ FIXED: was phone_number */}
                        </div>
                        {appointment.email && (
                          <div className="flex items-center gap-2 text-sm text-[#718096]">
                            <Mail className="w-4 h-4" />
                            <span>{appointment.email}</span>
                          </div>
                        )}
                      </div>

                      {appointment.notes && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-[#718096] italic">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        {appointment.status === 'scheduled' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="success"
                              onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                              disabled={isLoading}
                            >
                              Confirm
                            </Button>
                            <Button size="sm" variant="ghost" disabled={isLoading}>
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              variant="error"
                              onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                              disabled={isLoading}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="primary"
                              onClick={() => handleStatusUpdate(appointment.id, 'in-progress')}
                              disabled={isLoading}
                            >
                              Start Appointment
                            </Button>
                            <Button size="sm" variant="ghost" disabled={isLoading}>
                              Reschedule
                            </Button>
                          </>
                        )}
                        {appointment.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            variant="success"
                            onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                            disabled={isLoading}
                          >
                            Complete Appointment
                          </Button>
                        )}
                        {appointment.status === 'completed' && (
                          <Button size="sm" variant="ghost" disabled={isLoading}>
                            View Details
                          </Button>
                        )}
                        {appointment.status === 'cancelled' && (
                          <Button size="sm" variant="ghost" disabled={isLoading}>
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <Calendar className="w-12 h-12 text-[#718096] mx-auto mb-3" />
              <h3 className="text-lg font-medium text-[#2D3748] mb-1">No appointments scheduled</h3>
              <p className="text-[#718096] mb-4">No appointments found for {selectedDate}</p>
              <Button 
                icon={Plus} 
                onClick={() => setShowNewAppointment(true)}
                disabled={isLoading}
              >
                Schedule First Appointment
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
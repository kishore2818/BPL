import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Bed, Filter, User, Calendar, ArrowRight } from 'lucide-react';
import { mockBeds } from '../data/mockData';
import { BedStatus } from '../types';

export function BedManagement() {
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const wards = Array.from(new Set(mockBeds.map(b => b.ward)));

  const filteredBeds = mockBeds.filter(bed => {
    const matchesWard = selectedWard === 'all' || bed.ward === selectedWard;
    const matchesStatus = selectedStatus === 'all' || bed.status === selectedStatus;
    return matchesWard && matchesStatus;
  });

  const getStatusColor = (status: BedStatus) => {
    const colors: Record<BedStatus, string> = {
      'available': 'bg-[#00C896]',
      'occupied': 'bg-[#E63946]',
      'cleaning': 'bg-[#FFB74D]',
      'reserved': 'bg-[#7B68EE]'
    };
    return colors[status];
  };

  const getStatusVariant = (status: BedStatus) => {
    const variants: Record<BedStatus, 'success' | 'error' | 'warning' | 'info'> = {
      'available': 'success',
      'occupied': 'error',
      'cleaning': 'warning',
      'reserved': 'info'
    };
    return variants[status];
  };

  const stats = {
    total: mockBeds.length,
    available: mockBeds.filter(b => b.status === 'available').length,
    occupied: mockBeds.filter(b => b.status === 'occupied').length,
    cleaning: mockBeds.filter(b => b.status === 'cleaning').length,
    reserved: mockBeds.filter(b => b.status === 'reserved').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Bed Management</h2>
          <p className="text-[#718096]">Monitor and manage hospital bed availability</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-[#2C7BE5] to-[#0E5CAD]">
          <CardBody>
            <Bed className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-white text-opacity-90">Total Beds</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
          <CardBody>
            <Bed className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{stats.available}</p>
            <p className="text-sm text-white text-opacity-90">Available</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#E63946] to-[#DC2F3C]">
          <CardBody>
            <Bed className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{stats.occupied}</p>
            <p className="text-sm text-white text-opacity-90">Occupied</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#FFB74D] to-[#FFA726]">
          <CardBody>
            <Bed className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{stats.cleaning}</p>
            <p className="text-sm text-white text-opacity-90">Cleaning</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#7B68EE] to-[#6A57D9]">
          <CardBody>
            <Bed className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{stats.reserved}</p>
            <p className="text-sm text-white text-opacity-90">Reserved</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              options={[
                { value: 'all', label: 'All Wards' },
                ...wards.map(ward => ({ value: ward, label: ward }))
              ]}
              className="w-full md:w-64"
            />
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'available', label: 'Available' },
                { value: 'occupied', label: 'Occupied' },
                { value: 'cleaning', label: 'Cleaning' },
                { value: 'reserved', label: 'Reserved' }
              ]}
              className="w-full md:w-64"
            />
            <Button variant="ghost" icon={Filter}>More Filters</Button>
          </div>
        </CardBody>
      </Card>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBeds.map((bed) => (
            <Card key={bed.id} hover className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${getStatusColor(bed.status)}`} />
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#2D3748] mb-1">{bed.bedNumber}</h3>
                    <p className="text-sm text-[#718096]">{bed.ward}</p>
                  </div>
                  <Badge variant={getStatusVariant(bed.status)} size="sm">
                    {bed.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#718096]">
                    <Bed className="w-4 h-4" />
                    <span>{bed.bedType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#718096]">
                    <span>Floor {bed.floor}</span>
                    <span>•</span>
                    <span>Room {bed.room}</span>
                  </div>
                </div>

                {bed.status === 'occupied' && bed.patientName && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-[#718096]" />
                      <span className="font-medium text-[#2D3748]">{bed.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#718096]">
                      <Calendar className="w-3 h-3" />
                      <span>Admitted: {bed.admissionDate}</span>
                    </div>
                  </div>
                )}

                {bed.status === 'cleaning' && bed.lastCleaned && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#718096]">
                    Last cleaned: {new Date(bed.lastCleaned).toLocaleString()}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  {bed.status === 'occupied' && (
                    <Button size="sm" className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Transfer
                    </Button>
                  )}
                  {bed.status === 'available' && (
                    <Button variant="success" size="sm" className="flex-1">
                      Assign Patient
                    </Button>
                  )}
                  {bed.status === 'cleaning' && (
                    <Button variant="warning" size="sm" className="flex-1">
                      Mark Clean
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Bed Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Ward
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#718096] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBeds.map((bed) => (
                    <tr key={bed.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-[#2D3748]">{bed.bedNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#718096]">
                        {bed.ward}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#718096]">
                        Floor {bed.floor}, Room {bed.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#718096]">
                        {bed.bedType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(bed.status)} size="sm">
                          {bed.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {bed.patientName ? (
                          <div>
                            <p className="font-medium text-[#2D3748]">{bed.patientName}</p>
                            <p className="text-xs text-[#718096]">Since {bed.admissionDate}</p>
                          </div>
                        ) : (
                          <span className="text-[#718096]">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button size="sm" variant="ghost">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

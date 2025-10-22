import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Plus, Search, Filter, Edit, Trash2, DollarSign, Download, Upload } from 'lucide-react';
import { mockCharges } from '../data/mockData';

export function HospitalCharges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = Array.from(new Set(mockCharges.map(c => c.category)));
  const filteredCharges = mockCharges.filter(charge => {
    const matchesSearch = charge.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charge.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || charge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Consultation': 'bg-[#2C7BE5]',
      'Laboratory': 'bg-[#00C896]',
      'Radiology': 'bg-[#7B68EE]',
      'Surgery': 'bg-[#E63946]'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Hospital Charges</h2>
          <p className="text-[#718096]">Manage service rates and pricing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" icon={Download}>Export</Button>
          <Button variant="ghost" icon={Upload}>Import</Button>
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Service</Button>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#718096]" />
              <input
                type="text"
                placeholder="Search by service name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  ...categories.map(cat => ({ value: cat, label: cat }))
                ]}
                className="w-48"
              />
              <Button variant="ghost" icon={Filter}>Filters</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {categories.map(category => {
          const categoryCharges = filteredCharges.filter(c => c.category === category);
          if (categoryCharges.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${getCategoryColor(category)} p-2 rounded-lg`}>
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2D3748]">{category}</h3>
                      <p className="text-sm text-[#718096]">{categoryCharges.length} services</p>
                    </div>
                  </div>
                  <Badge variant="neutral">{categoryCharges.length}</Badge>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-t border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Service Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Service Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-[#718096] uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categoryCharges.map((charge) => (
                        <tr key={charge.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono text-sm text-[#2D3748]">{charge.code}</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-[#2D3748]">{charge.serviceName}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-[#718096] max-w-xs truncate">{charge.description}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="font-semibold text-[#2D3748]">₹{charge.rate.toLocaleString()}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={charge.active ? 'success' : 'neutral'} size="sm">
                              {charge.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-[#2C7BE5] hover:bg-[#E8F0FE] rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-[#E63946] hover:bg-[#E63946] hover:bg-opacity-10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filteredCharges.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <DollarSign className="w-12 h-12 text-[#718096] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#2D3748] mb-1">No charges found</h3>
            <p className="text-[#718096]">Try adjusting your search or filter criteria</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

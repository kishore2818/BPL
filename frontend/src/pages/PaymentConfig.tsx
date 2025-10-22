import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  CreditCard,
  Wallet,
  Shield,
  Smartphone,
  Plus,
  Settings,
  TrendingUp,
  DollarSign,
  Receipt,
  Filter
} from 'lucide-react';
import { mockPaymentMethods, mockPayments } from '../data/mockData';

export function PaymentConfig() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const getPaymentIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      'wallet': Wallet,
      'credit-card': CreditCard,
      'shield': Shield,
      'smartphone': Smartphone
    };
    return icons[iconName] || CreditCard;
  };

  const todayPayments = mockPayments.length;
  const todayRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length;
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Payment Configuration</h2>
          <p className="text-[#718096]">Manage payment methods and transaction settings</p>
        </div>
        <Button icon={Plus}>Add Payment Method</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#2C7BE5] to-[#0E5CAD]">
          <CardBody>
            <DollarSign className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">₹{todayRevenue.toLocaleString()}</p>
            <p className="text-sm text-white text-opacity-90">Today's Revenue</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
          <CardBody>
            <Receipt className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{todayPayments}</p>
            <p className="text-sm text-white text-opacity-90">Total Transactions</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#00C896] to-[#00B080]">
          <CardBody>
            <TrendingUp className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{completedPayments}</p>
            <p className="text-sm text-white text-opacity-90">Completed</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-[#FFB74D] to-[#FFA726]">
          <CardBody>
            <Receipt className="w-8 h-8 text-white mb-2" />
            <p className="text-3xl font-bold text-white">{pendingPayments}</p>
            <p className="text-sm text-white text-opacity-90">Pending</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-[#2D3748]">Payment Methods</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {mockPaymentMethods.map((method) => {
                const Icon = getPaymentIcon(method.icon);
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedMethod === method.id
                        ? 'border-[#2C7BE5] bg-[#E8F0FE]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-[#2C7BE5] p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2D3748]">{method.name}</h4>
                        <p className="text-sm text-[#718096] capitalize">{method.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={method.active ? 'success' : 'neutral'} size="sm">
                        {method.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-[#718096]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          {selectedMethod && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#2D3748]">Method Settings</h3>
                  <Button size="sm" icon={Settings}>Configure</Button>
                </div>
              </CardHeader>
              <CardBody>
                {(() => {
                  const method = mockPaymentMethods.find(m => m.id === selectedMethod);
                  if (!method) return null;

                  const Icon = getPaymentIcon(method.icon);
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                        <div className="bg-[#2C7BE5] p-3 rounded-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#2D3748]">{method.name}</h4>
                          <p className="text-sm text-[#718096] capitalize">Type: {method.type}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[#718096]">Status</span>
                          <Badge variant={method.active ? 'success' : 'neutral'}>
                            {method.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-[#718096]">Method ID</span>
                          <span className="font-mono text-sm text-[#2D3748]">{method.id}</span>
                        </div>
                        {method.config.gateway && (
                          <div className="flex justify-between items-center py-2">
                            <span className="text-[#718096]">Gateway</span>
                            <span className="font-medium text-[#2D3748] capitalize">{method.config.gateway}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button size="sm" variant="primary" className="flex-1">
                          {method.active ? 'Disable' : 'Enable'}
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1">
                          Test Connection
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardBody>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#2D3748]">Recent Transactions</h3>
                <Button size="sm" variant="ghost" icon={Filter}>Filter</Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              {mockPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#2D3748]">{payment.patientName}</span>
                      <Badge variant={getPaymentStatusVariant(payment.status)} size="sm">
                        {payment.status}
                      </Badge>
                    </div>
                    <span className="font-bold text-[#2D3748]">₹{payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#718096]">
                    <span>{payment.method}</span>
                    <span>{payment.reference}</span>
                  </div>
                  <p className="text-xs text-[#718096] mt-1">{payment.description}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-[#2D3748]">Payment Statistics</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#718096]">Success Rate</span>
                    <span className="font-semibold text-[#2D3748]">
                      {((completedPayments / todayPayments) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00C896] h-2 rounded-full"
                      style={{ width: `${(completedPayments / todayPayments) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center p-3 bg-[#E8F0FE] rounded-lg">
                    <p className="text-2xl font-bold text-[#2C7BE5]">{completedPayments}</p>
                    <p className="text-xs text-[#718096] mt-1">Completed</p>
                  </div>
                  <div className="text-center p-3 bg-[#FFB74D] bg-opacity-10 rounded-lg">
                    <p className="text-2xl font-bold text-[#B87E33]">{pendingPayments}</p>
                    <p className="text-xs text-[#718096] mt-1">Pending</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

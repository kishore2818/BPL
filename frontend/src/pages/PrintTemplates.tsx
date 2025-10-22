import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { FileText, Plus, Search, Edit, Copy, Trash2, Eye, Download } from 'lucide-react';
import { mockTemplates } from '../data/mockData';

export function PrintTemplates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const categories = Array.from(new Set(mockTemplates.map(t => t.category)));

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Clinical': 'bg-[#2C7BE5]',
      'Billing': 'bg-[#00C896]',
      'Laboratory': 'bg-[#7B68EE]',
      'Administrative': 'bg-[#FFB74D]'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-1">Print Templates</h2>
          <p className="text-[#718096]">Manage document templates for various purposes</p>
        </div>
        <Button icon={Plus}>Create Template</Button>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#718096]" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent"
              />
            </div>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categories.map(cat => ({ value: cat, label: cat }))
              ]}
              className="w-48"
            />
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              hover
              onClick={() => setSelectedTemplate(template.id)}
              className={selectedTemplate === template.id ? 'ring-2 ring-[#2C7BE5]' : ''}
            >
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className={`${getCategoryColor(template.category)} p-3 rounded-lg flex-shrink-0`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#2D3748] mb-1">{template.name}</h3>
                        <p className="text-sm text-[#718096]">{template.description}</p>
                      </div>
                      <Badge variant={template.active ? 'success' : 'neutral'} size="sm">
                        {template.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#718096] mb-3">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Category:</span> {template.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Version:</span> {template.version}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.variables.slice(0, 3).map((variable) => (
                        <span
                          key={variable}
                          className="px-2 py-0.5 bg-[#E8F0FE] text-[#2C7BE5] text-xs rounded font-mono"
                        >
                          {`{{${variable}}}`}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-[#718096] text-xs rounded">
                          +{template.variables.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" icon={Eye}>Preview</Button>
                      <Button size="sm" variant="ghost" icon={Edit}>Edit</Button>
                      <Button size="sm" variant="ghost" icon={Copy}>Duplicate</Button>
                      <Button size="sm" variant="ghost" icon={Download}>Download</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <Card>
              <CardBody className="text-center py-12">
                <FileText className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <h3 className="text-lg font-medium text-[#2D3748] mb-1">No templates found</h3>
                <p className="text-[#718096]">Try adjusting your search criteria</p>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="lg:sticky lg:top-6 h-fit">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#2D3748]">Template Preview</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" icon={Edit}>Edit</Button>
                    <Button size="sm" variant="ghost" icon={Trash2}>Delete</Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {(() => {
                  const template = mockTemplates.find(t => t.id === selectedTemplate);
                  if (!template) return null;

                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-[#718096] mb-2">Template Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#718096]">Name:</span>
                            <span className="font-medium text-[#2D3748]">{template.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#718096]">Category:</span>
                            <span className="font-medium text-[#2D3748]">{template.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#718096]">Version:</span>
                            <span className="font-medium text-[#2D3748]">{template.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#718096]">Status:</span>
                            <Badge variant={template.active ? 'success' : 'neutral'} size="sm">
                              {template.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-[#718096] mb-2">Available Variables</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.variables.map((variable) => (
                            <span
                              key={variable}
                              className="px-2 py-1 bg-[#E8F0FE] text-[#2C7BE5] text-xs rounded font-mono"
                            >
                              {`{{${variable}}}`}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-[#718096] mb-2">Template Content</h4>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <pre className="text-xs text-[#2D3748] font-mono whitespace-pre-wrap break-words">
                            {template.content}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-[#718096] mb-2">Preview Output</h4>
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-inner">
                          <div className="prose prose-sm max-w-none">
                            <h1 className="text-xl font-bold text-[#2D3748] mb-4">Sample Hospital</h1>
                            <p className="text-[#718096]">Patient: John Doe</p>
                            <p className="text-[#718096]">Doctor: Dr. Smith</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <FileText className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <h3 className="text-lg font-medium text-[#2D3748] mb-1">Select a template</h3>
                <p className="text-[#718096]">Choose a template to view details and preview</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

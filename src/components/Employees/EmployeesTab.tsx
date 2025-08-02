import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Employee } from '@/types';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EditEmployeeDialog } from './EditEmployeeDialog';

export function EmployeesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'João Silva Santos',
      position: 'Engenheiro Civil',
      cpf: '123.456.789-00',
      phone: '+55 49 99999-1234',
      isActive: true,
      hireDate: new Date('2023-01-15'),
      zone: 'Zona A',
      supervisor: 'Carlos Mendes'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      position: 'Técnica em Segurança',
      cpf: '987.654.321-00',
      phone: '+55 49 98888-5678',
      isActive: true,
      hireDate: new Date('2022-08-20'),
      zone: 'Zona B',
      supervisor: 'Ana Costa'
    },
    {
      id: '3',
      name: 'Pedro Rodrigues',
      position: 'Operador de Máquinas',
      cpf: '456.789.123-00',
      phone: '+55 49 97777-9012',
      isActive: false,
      hireDate: new Date('2021-11-10'),
      zone: 'Zona A',
      supervisor: 'Carlos Mendes'
    },
    {
      id: '4',
      name: 'Ana Costa Silva',
      position: 'Supervisora de Produção',
      cpf: '789.123.456-00',
      phone: '+55 49 96666-3456',
      isActive: true,
      hireDate: new Date('2020-03-05'),
      zone: 'Zona C',
      supervisor: 'Diretoria'
    },
    {
      id: '5',
      name: 'Carlos Mendes',
      position: 'Coordenador de Engenharia',
      cpf: '321.654.987-00',
      phone: '+55 49 95555-7890',
      isActive: true,
      hireDate: new Date('2019-06-12'),
      zone: 'Zona A',
      supervisor: 'Diretoria'
    }
  ]);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.cpf.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Funcionários</h2>
          <p className="text-muted-foreground">
            Gerencie os {employees.length} funcionários do setor de engenharia
          </p>
        </div>
        <Button className="aurora-gradient" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Funcionário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
          <CardDescription>
            Pesquise e gerencie informações dos funcionários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por nome, cargo ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>CPF: {employee.cpf}</span>
                      <span>Zona: {employee.zone}</span>
                      <span>Tel: {employee.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                    {employee.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      if (confirm(`Deseja excluir o funcionário ${employee.name}?`)) {
                        setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum funcionário encontrado com os critérios de pesquisa.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddEmployeeDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
      
      <EditEmployeeDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        employee={selectedEmployee}
        onSubmit={(updatedEmployee) => {
          setEmployees(prev => prev.map(emp => 
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          ));
        }}
      />
    </div>
  );
}

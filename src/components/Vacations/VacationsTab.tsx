
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { AddVacationDialog } from './AddVacationDialog';
import type { Vacation, Employee } from '@/types';

// Mock data pou vakans yo
const mockVacations: Vacation[] = [
  {
    id: '1',
    employeeId: '1',
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-07-29'),
    status: 'approved',
    requestedBy: 'João Silva',
    approvedBy: 'Admin',
    notes: 'Férias anuais'
  },
  {
    id: '2',
    employeeId: '2',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-15'),
    status: 'pending',
    requestedBy: 'Maria Santos',
    notes: 'Férias de verão'
  }
];

// Mock data pou anplwaye yo
const mockEmployees: Employee[] = [
  { id: '1', name: 'João Silva', position: 'Engenheiro', cpf: '123.456.789-00', phone: '(11) 99999-9999', isActive: true, hireDate: new Date('2023-01-15') },
  { id: '2', name: 'Maria Santos', position: 'Técnica', cpf: '987.654.321-00', phone: '(11) 88888-8888', isActive: true, hireDate: new Date('2023-03-20') }
];

export function VacationsTab() {
  const [vacations, setVacations] = useState<Vacation[]>(mockVacations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { toast } = useToast();

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee?.name || 'Funcionário não encontrado';
  };

  const getStatusBadge = (status: Vacation['status']) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      approved: { label: 'Aprovado', variant: 'default' as const },
      rejected: { label: 'Rejeitado', variant: 'destructive' as const }
    };
    
    return statusConfig[status];
  };

  const filteredVacations = vacations.filter(vacation => 
    statusFilter === 'all' || vacation.status === statusFilter
  );

  const handleApprove = (vacationId: string) => {
    setVacations(prev => prev.map(vacation => 
      vacation.id === vacationId 
        ? { ...vacation, status: 'approved' as const, approvedBy: 'Admin' }
        : vacation
    ));
    toast({
      title: 'Férias aprovadas',
      description: 'A solicitação de férias foi aprovada com sucesso.',
    });
  };

  const handleReject = (vacationId: string) => {
    setVacations(prev => prev.map(vacation => 
      vacation.id === vacationId 
        ? { ...vacation, status: 'rejected' as const, approvedBy: 'Admin' }
        : vacation
    ));
    toast({
      title: 'Férias rejeitadas',
      description: 'A solicitação de férias foi rejeitada.',
      variant: 'destructive',
    });
  };

  const handleAddVacation = (newVacation: Omit<Vacation, 'id'>) => {
    const vacation: Vacation = {
      ...newVacation,
      id: Date.now().toString(),
    };
    setVacations(prev => [...prev, vacation]);
    toast({
      title: 'Férias solicitadas',
      description: 'Nova solicitação de férias foi criada.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Gestão de Férias</h1>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {vacations.filter(v => v.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vacations.filter(v => v.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {vacations.filter(v => v.status === 'rejected').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Solicitações de Férias</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="approved">Aprovadas</option>
                <option value="rejected">Rejeitadas</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Fim</TableHead>
                <TableHead>Dias</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVacations.map((vacation) => {
                const days = Math.ceil((vacation.endDate.getTime() - vacation.startDate.getTime()) / (1000 * 60 * 60 * 24));
                const statusConfig = getStatusBadge(vacation.status);
                
                return (
                  <TableRow key={vacation.id}>
                    <TableCell className="font-medium">
                      {getEmployeeName(vacation.employeeId)}
                    </TableCell>
                    <TableCell>{vacation.startDate.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{vacation.endDate.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{days} dias</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{vacation.notes || '-'}</TableCell>
                    <TableCell>
                      {vacation.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(vacation.id)}
                          >
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(vacation.id)}
                          >
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddVacationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddVacation}
        employees={mockEmployees}
      />
    </div>
  );
}

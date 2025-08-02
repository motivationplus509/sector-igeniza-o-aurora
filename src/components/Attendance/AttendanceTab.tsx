
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AttendanceDialog } from './AttendanceDialog';
import { Plus, Clock, Users, UserCheck, UserX } from 'lucide-react';
import { Attendance } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function AttendanceTab() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dados de exemplo
  const [attendanceRecords] = useState<Attendance[]>([
    {
      id: '1',
      employeeId: '1',
      date: new Date('2024-06-10'),
      status: 'present',
      checkIn: new Date('2024-06-10T08:00:00'),
      checkOut: new Date('2024-06-10T17:00:00'),
      recordedBy: user?.id || '1'
    },
    {
      id: '2',
      employeeId: '2',
      date: new Date('2024-06-10'),
      status: 'late',
      checkIn: new Date('2024-06-10T08:30:00'),
      checkOut: new Date('2024-06-10T17:00:00'),
      notes: 'Atraso por transporte',
      recordedBy: user?.id || '1'
    },
    {
      id: '3',
      employeeId: '3',
      date: new Date('2024-06-10'),
      status: 'absent',
      notes: 'Falta justificada',
      recordedBy: user?.id || '1'
    }
  ]);

  const [employees] = useState([
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Costa' },
    { id: '4', name: 'Ana Oliveira' },
    { id: '5', name: 'Carlos Lima' }
  ]);

  const getEmployeeName = (employeeId: string) => {
    return employees.find(emp => emp.id === employeeId)?.name || 'Funcionário';
  };

  const getStatusBadge = (status: Attendance['status']) => {
    const statusMap = {
      present: { label: 'Presente', variant: 'default' as const },
      absent: { label: 'Ausente', variant: 'destructive' as const },
      late: { label: 'Atrasado', variant: 'secondary' as const }
    };
    
    const config = statusMap[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const employeeName = getEmployeeName(record.employeeId).toLowerCase();
    const matchesSearch = employeeName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayStats = {
    total: employees.length,
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Controle de Presença</h2>
          <p className="text-muted-foreground">
            Gerencie a presença diária dos funcionários
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="aurora-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Presença
        </Button>
      </div>

      {/* Estatísticas do dia */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presentes</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayStats.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{todayStats.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{todayStats.late}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Presença</CardTitle>
          <CardDescription>
            Lista dos registros de presença de hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="present">Presente</SelectItem>
                <SelectItem value="absent">Ausente</SelectItem>
                <SelectItem value="late">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {getEmployeeName(record.employeeId)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell>
                    {record.checkIn ? record.checkIn.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : '-'}
                  </TableCell>
                  <TableCell>
                    {record.checkOut ? record.checkOut.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : '-'}
                  </TableCell>
                  <TableCell>
                    {record.notes || '-'}
                  </TableCell>
                </TableRow>
              ))}
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum registro encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AttendanceDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        employees={employees}
      />
    </div>
  );
}

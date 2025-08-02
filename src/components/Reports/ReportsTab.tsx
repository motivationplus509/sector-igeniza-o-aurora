
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, TrendingUp, Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  name: string;
  type: 'employees' | 'attendance' | 'wages' | 'vacations';
  generatedAt: Date;
  data: any;
}

export function ReportsTab() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data para demonstração
  const employeeStats = {
    total: 25,
    active: 23,
    onVacation: 2,
    departments: [
      { name: 'Engenharia', count: 12 },
      { name: 'Administração', count: 8 },
      { name: 'Operações', count: 5 }
    ]
  };

  const attendanceData = [
    { month: 'Jan', present: 92, absent: 8 },
    { month: 'Fev', present: 88, absent: 12 },
    { month: 'Mar', present: 95, absent: 5 },
    { month: 'Abr', present: 91, absent: 9 },
    { month: 'Mai', present: 94, absent: 6 },
    { month: 'Jun', present: 89, absent: 11 }
  ];

  const wageData = [
    { month: 'Jan', total: 45000 },
    { month: 'Fev', total: 47000 },
    { month: 'Mar', total: 48500 },
    { month: 'Abr', total: 46800 },
    { month: 'Mai', total: 49200 },
    { month: 'Jun', total: 50100 }
  ];

  const vacationStatus = [
    { name: 'Pendente', value: 8, color: '#f59e0b' },
    { name: 'Aprovadas', value: 15, color: '#10b981' },
    { name: 'Rejeitadas', value: 3, color: '#ef4444' }
  ];

  const recentReports: Report[] = [
    {
      id: '1',
      name: 'Relatório Mensal de Presença',
      type: 'attendance',
      generatedAt: new Date('2024-06-01'),
      data: attendanceData
    },
    {
      id: '2',
      name: 'Relatório de Funcionários Ativos',
      type: 'employees',
      generatedAt: new Date('2024-06-02'),
      data: employeeStats
    },
    {
      id: '3',
      name: 'Relatório de Pagamentos',
      type: 'wages',
      generatedAt: new Date('2024-06-03'),
      data: wageData
    }
  ];

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Relatório gerado!",
      description: `Relatório de ${reportType} foi gerado com sucesso.`,
    });
  };

  const handleExportReport = (format: string) => {
    toast({
      title: "Exportando relatório...",
      description: `Relatório será exportado em formato ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize e exporte relatórios detalhados do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => handleExportReport('pdf')}
            className="aurora-gradient"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {employeeStats.active} ativos, {employeeStats.onVacation} em férias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagamentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 50.100</div>
            <p className="text-xs text-muted-foreground">
              +1.8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Férias Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Aguardando aprovação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Presença */}
        <Card>
          <CardHeader>
            <CardTitle>Presença por Mês</CardTitle>
            <CardDescription>
              Comparação entre presença e ausência dos funcionários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                present: { label: "Presente", color: "#10b981" },
                absent: { label: "Ausente", color: "#ef4444" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="present" fill="#10b981" />
                  <Bar dataKey="absent" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução dos Pagamentos</CardTitle>
            <CardDescription>
              Total de pagamentos realizados por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: { label: "Total", color: "#3b82f6" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Status de Férias */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Férias</CardTitle>
            <CardDescription>
              Distribuição das solicitações de férias por status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pending: { label: "Pendente", color: "#f59e0b" },
                approved: { label: "Aprovadas", color: "#10b981" },
                rejected: { label: "Rejeitadas", color: "#ef4444" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vacationStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {vacationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Departamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionários por Departamento</CardTitle>
            <CardDescription>
              Distribuição de funcionários nos departamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeStats.departments.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(dept.count / employeeStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{dept.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geração de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Gerar Relatórios</CardTitle>
          <CardDescription>
            Crie relatórios personalizados para diferentes áreas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleGenerateReport('funcionários')}
            >
              <Users className="h-6 w-6 mb-2" />
              Relatório de Funcionários
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleGenerateReport('presença')}
            >
              <Clock className="h-6 w-6 mb-2" />
              Relatório de Presença
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleGenerateReport('pagamentos')}
            >
              <DollarSign className="h-6 w-6 mb-2" />
              Relatório de Pagamentos
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleGenerateReport('férias')}
            >
              <Calendar className="h-6 w-6 mb-2" />
              Relatório de Férias
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Histórico dos relatórios gerados recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Relatório</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data de Geração</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {report.type === 'employees' && 'Funcionários'}
                      {report.type === 'attendance' && 'Presença'}
                      {report.type === 'wages' && 'Pagamentos'}
                      {report.type === 'vacations' && 'Férias'}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.generatedAt.toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExportReport('pdf')}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExportReport('excel')}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Excel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

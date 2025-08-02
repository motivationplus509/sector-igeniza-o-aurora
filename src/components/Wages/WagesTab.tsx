import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, Download, Edit, Trash2 } from 'lucide-react';
import { RegisterWageDialog } from './RegisterWageDialog';
import { EditWageDialog } from './EditWageDialog';
import { useToast } from '@/hooks/use-toast';

export function WagesTab() {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWage, setSelectedWage] = useState<any>(null);
  const { toast } = useToast();

  const [todayWages, setTodayWages] = useState([
    { id: '1', employee: 'João Silva Santos', amount: 180, hours: 8, overtime: 0 },
    { id: '2', employee: 'Maria Oliveira', amount: 165, hours: 8, overtime: 0 },
    { id: '3', employee: 'Pedro Rodrigues', amount: 220, hours: 8, overtime: 4 },
    { id: '4', employee: 'Ana Costa Silva', amount: 250, hours: 8, overtime: 2 },
    { id: '5', employee: 'Carlos Mendes', amount: 300, hours: 8, overtime: 0 },
  ]);

  const totalToday = todayWages.reduce((sum, wage) => sum + wage.amount, 0);

  const handleExport = () => {
    toast({
      title: "Exportação Iniciada",
      description: "Os dados estão sendo preparados para download...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Salários Diários</h2>
          <p className="text-muted-foreground">
            Gerencie os pagamentos diários dos funcionários
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="aurora-gradient" onClick={() => setIsRegisterDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Pagamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalToday.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {todayWages.length} funcionários pagos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayWages.reduce((sum, w) => sum + w.overtime, 0)}h
            </div>
            <p className="text-xs text-muted-foreground">
              Total de horas extras hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Diária</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {Math.round(totalToday / todayWages.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Por funcionário
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pagamentos de Hoje</CardTitle>
          <CardDescription>
            Registros de salários do dia {new Date().toLocaleDateString('pt-BR')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayWages.map((wage) => (
              <div
                key={wage.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {wage.employee.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{wage.employee}</h3>
                    <p className="text-sm text-muted-foreground">
                      {wage.hours}h trabalhadas
                      {wage.overtime > 0 && ` + ${wage.overtime}h extras`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      R$ {wage.amount}
                    </div>
                    {wage.overtime > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Hora Extra
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedWage(wage);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        if (confirm(`Deseja excluir o pagamento de ${wage.employee}?`)) {
                          setTodayWages(prev => prev.filter(w => w.id !== wage.id));
                          toast({
                            title: "Pagamento excluído",
                            description: `Pagamento de ${wage.employee} foi removido.`,
                            variant: "destructive"
                          });
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RegisterWageDialog 
        open={isRegisterDialogOpen} 
        onOpenChange={setIsRegisterDialogOpen} 
      />
      
      <EditWageDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        wage={selectedWage}
        onSubmit={(updatedWage) => {
          setTodayWages(prev => prev.map(w => 
            w.id === updatedWage.id ? updatedWage : w
          ));
        }}
      />
    </div>
  );
}

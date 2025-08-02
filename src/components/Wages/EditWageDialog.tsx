import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Wage {
  id: string;
  employee: string;
  amount: number;
  hours: number;
  overtime: number;
}

interface EditWageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wage: Wage | null;
  onSubmit: (wage: Wage) => void;
}

export function EditWageDialog({ open, onOpenChange, wage, onSubmit }: EditWageDialogProps) {
  const [employee, setEmployee] = useState('');
  const [amount, setAmount] = useState('');
  const [hours, setHours] = useState('');
  const [overtime, setOvertime] = useState('');
  const { toast } = useToast();

  const employees = [
    'João Silva Santos',
    'Maria Oliveira', 
    'Pedro Rodrigues',
    'Ana Costa Silva',
    'Carlos Mendes'
  ];

  useEffect(() => {
    if (wage) {
      setEmployee(wage.employee);
      setAmount(wage.amount.toString());
      setHours(wage.hours.toString());
      setOvertime(wage.overtime.toString());
    } else {
      setEmployee('');
      setAmount('');
      setHours('');
      setOvertime('');
    }
  }, [wage, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employee || !amount || !hours) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!wage) return;

    const updatedWage: Wage = {
      ...wage,
      employee,
      amount: parseFloat(amount),
      hours: parseInt(hours),
      overtime: parseInt(overtime) || 0
    };

    onSubmit(updatedWage);
    onOpenChange(false);
    
    toast({
      title: "Salário atualizado!",
      description: `Pagamento de ${employee} foi atualizado com sucesso.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Pagamento</DialogTitle>
          <DialogDescription>
            Atualize as informações do pagamento diário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="employee">Funcionário</Label>
              <Select value={employee} onValueChange={setEmployee} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="180.00"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="hours">Horas Trabalhadas</Label>
                <Input
                  id="hours"
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="8"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="overtime">Horas Extras</Label>
              <Input
                id="overtime"
                type="number"
                value={overtime}
                onChange={(e) => setOvertime(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
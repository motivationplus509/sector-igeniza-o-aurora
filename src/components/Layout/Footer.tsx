
export function Footer() {
  return (
    <footer className="bg-white border-t border-border px-6 py-4 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          © 2024 Aurora Alimentos - Setor de Higienização. Todos os direitos reservados.
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Versão 1.0.0</span>
          <span>•</span>
          <span>Sistema de Gestão de Funcionários</span>
          <span>•</span>
          <span>Desenvolvido por Robensonn Pierre</span>
        </div>
      </div>
    </footer>
  );
}

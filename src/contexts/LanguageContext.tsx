import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    'header.title': 'Aurora Alimentos',
    'header.subtitle': 'Setor de Higienização',
    'header.logout': 'Sair',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Funcionários',
    'nav.wages': 'Salários Diários',
    'nav.vacations': 'Férias',
    'nav.attendance': 'Presença',
    'nav.reports': 'Relatórios',
    'nav.settings': 'Configurações',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.subtitle': 'Gerencie configurações e preferências do sistema',
    'settings.profile': 'Perfil',
    'settings.security': 'Segurança',
    'settings.notifications': 'Notificações',
    'settings.appearance': 'Aparência',
    'settings.data': 'Dados',
    'settings.profile.info': 'Informações do Perfil',
    'settings.profile.info.desc': 'Atualize suas informações de perfil e foto',
    'settings.profile.fullname': 'Nome Completo',
    'settings.profile.phone': 'Telefone',
    'settings.profile.birthdate': 'Data de Nascimento',
    'settings.profile.department': 'Departamento',
    'settings.profile.emergencycontact': 'Contato de Emergência',
    'settings.profile.bio': 'Descrição',
    'settings.profile.bio.placeholder': 'Fale sobre você e seu trabalho...',
    'settings.profile.save': 'Salvar Alterações',
    'settings.role.permissions': 'Função e Permissões',
    'settings.role.permissions.desc': 'Visualize as permissões e responsabilidades da sua função',
    'settings.role.current': 'Função Atual',
    'settings.role.admin': 'Administrador',
    'settings.role.manager': 'Responsável/Chefe',
    'settings.role.monitor': 'Monitor',
    'settings.role.permissions.list': 'Permissões',
    'settings.account.stats': 'Estatísticas da Conta',
    'settings.account.stats.desc': 'Visualize a atividade e informações da sua conta',
    'settings.account.logins': 'Conexões',
    'settings.account.reports': 'Relatórios',
    'settings.account.employees': 'Funcionários',
    'settings.account.created': 'Conta criada:',
    'settings.account.lastactivity': 'Última atividade:',
    'settings.password.change': 'Alterar Senha',
    'settings.password.change.desc': 'Atualize sua senha para maior segurança',
    'settings.password.current': 'Senha Atual',
    'settings.password.new': 'Nova Senha',
    'settings.password.confirm': 'Confirmar Senha',
    'settings.password.change.button': 'Alterar Senha',
    
    // Login
    'login.title': 'Aurora Alimentos',
    'login.subtitle': 'Sistema de Gestão de Funcionários - Setor de Higienização',
    'login.username': 'Usuário',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'login.loading': 'Entrando...',
    'login.error': 'Usuário ou senha inválidos',
    'login.demo': 'Usuários Demo:',
    'login.admin': 'Admin',
    'login.manager': 'Encarregado',
    'login.monitor': 'Monitor',
    
    // Common
    'common.add': 'Adicionar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.actions': 'Ações',
    'common.name': 'Nome',
    'common.email': 'Email',
    'common.phone': 'Telefone',
    'common.position': 'Cargo',
    'common.department': 'Departamento',
    'common.date': 'Data',
    'common.status': 'Status',
    'common.total': 'Total',
    'common.language': 'Idioma'
  },
  en: {
    // Header
    'header.title': 'Aurora Foods',
    'header.subtitle': 'Sanitation Department',
    'header.logout': 'Logout',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Employees',
    'nav.wages': 'Daily Wages',
    'nav.vacations': 'Vacations',
    'nav.attendance': 'Attendance',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage system settings and preferences',
    'settings.profile': 'Profile',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.data': 'Data',
    
    // Login
    'login.title': 'Aurora Foods',
    'login.subtitle': 'Employee Management System - Sanitation Department',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.loading': 'Logging in...',
    'login.error': 'Invalid username or password',
    'login.demo': 'Demo Users:',
    'login.admin': 'Admin',
    'login.manager': 'Manager',
    'login.monitor': 'Monitor',
    
    // Common
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.position': 'Position',
    'common.department': 'Department',
    'common.date': 'Date',
    'common.status': 'Status',
    'common.total': 'Total',
    'common.language': 'Language'
  },
  es: {
    // Header
    'header.title': 'Aurora Alimentos',
    'header.subtitle': 'Departamento de Higienización',
    'header.logout': 'Cerrar Sesión',
    
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.employees': 'Empleados',
    'nav.wages': 'Salarios Diarios',
    'nav.vacations': 'Vacaciones',
    'nav.attendance': 'Asistencia',
    'nav.reports': 'Informes',
    'nav.settings': 'Configuración',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.subtitle': 'Gestionar configuración y preferencias del sistema',
    'settings.profile': 'Perfil',
    'settings.security': 'Seguridad',
    'settings.notifications': 'Notificaciones',
    'settings.appearance': 'Apariencia',
    'settings.data': 'Datos',
    
    // Login
    'login.title': 'Aurora Alimentos',
    'login.subtitle': 'Sistema de Gestión de Empleados - Departamento de Higienización',
    'login.username': 'Usuario',
    'login.password': 'Contraseña',
    'login.button': 'Ingresar',
    'login.loading': 'Ingresando...',
    'login.error': 'Usuario o contraseña inválidos',
    'login.demo': 'Usuarios Demo:',
    'login.admin': 'Admin',
    'login.manager': 'Encargado',
    'login.monitor': 'Monitor',
    
    // Common
    'common.add': 'Agregar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.actions': 'Acciones',
    'common.name': 'Nombre',
    'common.email': 'Email',
    'common.phone': 'Teléfono',
    'common.position': 'Cargo',
    'common.department': 'Departamento',
    'common.date': 'Fecha',
    'common.status': 'Estado',
    'common.total': 'Total',
    'common.language': 'Idioma'
  },
  fr: {
    // Header
    'header.title': 'Aurora Aliments',
    'header.subtitle': 'Département d\'Hygiénisation',
    'header.logout': 'Déconnexion',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.employees': 'Employés',
    'nav.wages': 'Salaires quotidiens',
    'nav.vacations': 'Vacances',
    'nav.attendance': 'Présence',
    'nav.reports': 'Rapports',
    'nav.settings': 'Paramètres',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Gérer les paramètres et préférences du système',
    'settings.profile': 'Profil',
    'settings.security': 'Sécurité',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Apparence',
    'settings.data': 'Données',
    
    // Login
    'login.title': 'Aurora Aliments',
    'login.subtitle': 'Système de Gestion des Employés - Département d\'Hygiénisation',
    'login.username': 'Utilisateur',
    'login.password': 'Mot de passe',
    'login.button': 'Se connecter',
    'login.loading': 'Connexion...',
    'login.error': 'Nom d\'utilisateur ou mot de passe invalide',
    'login.demo': 'Utilisateurs Demo:',
    'login.admin': 'Admin',
    'login.manager': 'Responsable',
    'login.monitor': 'Moniteur',
    
    // Common
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.actions': 'Actions',
    'common.name': 'Nom',
    'common.email': 'Email',
    'common.phone': 'Téléphone',
    'common.position': 'Poste',
    'common.department': 'Département',
    'common.date': 'Date',
    'common.status': 'Statut',
    'common.total': 'Total',
    'common.language': 'Langue'
  },
  ht: {
    // Header
    'header.title': 'Aurora Manje',
    'header.subtitle': 'Depo Pwòpte',
    'header.logout': 'Soti',
    
    // Navigation
    'nav.dashboard': 'Tablo Bò',
    'nav.employees': 'Anplwaye yo',
    'nav.wages': 'Salè Chak Jou',
    'nav.vacations': 'Vakans',
    'nav.attendance': 'Prezans',
    'nav.reports': 'Rapò yo',
    'nav.settings': 'Konfigirasyon',
    
    // Settings
    'settings.title': 'Konfigirasyon',
    'settings.subtitle': 'Jere paramèt ak preferans sistèm nan',
    'settings.profile': 'Pwofil',
    'settings.security': 'Sekirite',
    'settings.notifications': 'Notifikasyon',
    'settings.appearance': 'Aparans',
    'settings.data': 'Done',
    
    // Login
    'login.title': 'Aurora Manje',
    'login.subtitle': 'Sistèm Jesyon Anplwaye yo - Depo Pwòpte',
    'login.username': 'Non itilizatè',
    'login.password': 'Modpas',
    'login.button': 'Antre',
    'login.loading': 'Y ap antre...',
    'login.error': 'Non itilizatè oswa modpas ki pa bon',
    'login.demo': 'Itilizatè Demo yo:',
    'login.admin': 'Admin',
    'login.manager': 'Chèf',
    'login.monitor': 'Monitè',
    
    // Common
    'common.add': 'Ajoute',
    'common.edit': 'Modifye',
    'common.delete': 'Efase',
    'common.save': 'Sove',
    'common.cancel': 'Anile',
    'common.search': 'Chèche',
    'common.filter': 'Filtre',
    'common.actions': 'Aksyon',
    'common.name': 'Non',
    'common.email': 'Imèl',
    'common.phone': 'Telefòn',
    'common.position': 'Pòs',
    'common.department': 'Depo',
    'common.date': 'Dat',
    'common.status': 'Eta',
    'common.total': 'Total',
    'common.language': 'Lang'
  },
  zh: {
    // Header
    'header.title': '奥罗拉食品',
    'header.subtitle': '卫生部',
    'header.logout': '退出',
    
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.employees': '员工',
    'nav.wages': '日工资',
    'nav.vacations': '假期',
    'nav.attendance': '考勤',
    'nav.reports': '报告',
    'nav.settings': '设置',
    
    // Settings
    'settings.title': '设置',
    'settings.subtitle': '管理系统设置和偏好',
    'settings.profile': '档案',
    'settings.security': '安全',
    'settings.notifications': '通知',
    'settings.appearance': '外观',
    'settings.data': '数据',
    
    // Login
    'login.title': '奥罗拉食品',
    'login.subtitle': '员工管理系统 - 卫生部',
    'login.username': '用户名',
    'login.password': '密码',
    'login.button': '登录',
    'login.loading': '登录中...',
    'login.error': '用户名或密码无效',
    'login.demo': '演示用户：',
    'login.admin': '管理员',
    'login.manager': '主管',
    'login.monitor': '监控员',
    
    // Common
    'common.add': '添加',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.actions': '操作',
    'common.name': '姓名',
    'common.email': '邮箱',
    'common.phone': '电话',
    'common.position': '职位',
    'common.department': '部门',
    'common.date': '日期',
    'common.status': '状态',
    'common.total': '总计',
    'common.language': '语言'
  },
  de: {
    // Header
    'header.title': 'Aurora Lebensmittel',
    'header.subtitle': 'Hygienisierung Abteilung',
    'header.logout': 'Abmelden',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Mitarbeiter',
    'nav.wages': 'Tageslöhne',
    'nav.vacations': 'Urlaub',
    'nav.attendance': 'Anwesenheit',
    'nav.reports': 'Berichte',
    'nav.settings': 'Einstellungen',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.subtitle': 'Systemeinstellungen und Präferenzen verwalten',
    'settings.profile': 'Profil',
    'settings.security': 'Sicherheit',
    'settings.notifications': 'Benachrichtigungen',
    'settings.appearance': 'Erscheinungsbild',
    'settings.data': 'Daten',
    
    // Login
    'login.title': 'Aurora Lebensmittel',
    'login.subtitle': 'Mitarbeiterverwaltungssystem - Hygienisierung Abteilung',
    'login.username': 'Benutzername',
    'login.password': 'Passwort',
    'login.button': 'Anmelden',
    'login.loading': 'Anmeldung...',
    'login.error': 'Ungültiger Benutzername oder Passwort',
    'login.demo': 'Demo-Benutzer:',
    'login.admin': 'Admin',
    'login.manager': 'Manager',
    'login.monitor': 'Monitor',
    
    // Common
    'common.add': 'Hinzufügen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.actions': 'Aktionen',
    'common.name': 'Name',
    'common.email': 'E-Mail',
    'common.phone': 'Telefon',
    'common.position': 'Position',
    'common.department': 'Abteilung',
    'common.date': 'Datum',
    'common.status': 'Status',
    'common.total': 'Gesamt',
    'common.language': 'Sprache'
  }
};

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('pt');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  // Initialize language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { languages };

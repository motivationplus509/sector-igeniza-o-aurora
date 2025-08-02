import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Calendar,
  Clock,
  Users,
  Activity,
  Lock,
  Key,
  Settings,
  Award,
} from 'lucide-react';

export function SettingsTab() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: user?.role === 'admin' ? 'Administração' : 'Recursos Humanos',
    bio: '',
    location: 'Saic, Chspecó, Santa Catarina, Brasil',
    birthDate: '',
    emergencyContact: '',
    employeeId: user?.role === 'admin' ? 'ADM-001' : user?.role === 'encarregado' ? 'ENC-001' : 'MON-001',
  });

  // Account statistics
  const [accountStats] = useState({
    loginCount: 127,
    lastActivity: new Date().toISOString(),
    accountCreated: '2024-01-15',
    dataAccessed: 45,
    reportsGenerated: 12,
    employeesManaged: user?.role === 'admin' ? 250 : user?.role === 'encarregado' ? 45 : 15,
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    emailVerified: true,
    phoneVerified: false,
    backupCodesGenerated: false,
  });

  // Role permissions
  const getRolePermissions = () => {
    switch (user?.role) {
      case 'admin':
        return [
          'Gestão completa de funcionários',
          'Acesso a todos os relatórios',
          'Configurar sistema',
          'Gerenciar usuários',
          'Exportar e importar dados',
          'Visualizar todas as atividades'
        ];
      case 'encarregado':
        return [
          'Gestão de funcionários do departamento',
          'Visualizar relatórios do departamento',
          'Aprovar férias',
          'Registrar presenças',
          'Gerenciar salários'
        ];
      case 'monitor':
        return [
          'Visualizar informações de funcionários',
          'Registrar presenças',
          'Visualizar relatórios autorizados',
          'Atualizar dados de salários'
        ];
      default:
        return [];
    }
  };

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    systemAlerts: true,
    securityAlerts: true,
    employeeUpdates: true,
  });

  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    darkMode: false,
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    currency: 'HTG',
    timezone: 'America/Port-au-Prince',
  });

  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showPasswords: false,
  });

  const handleProfileSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Informações do perfil foram salvas com sucesso",
    });
  };

  const handlePhotoUpload = () => {
    toast({
      title: "Foto do perfil alterada",
      description: "Nova foto do perfil foi carregada com sucesso",
    });
  };

  const generateBackupCodes = () => {
    setSecuritySettings({...securitySettings, backupCodesGenerated: true});
    toast({
      title: "Códigos backup gerados",
      description: "10 códigos backup foram criados para sua conta",
    });
  };

  const handleSecuritySave = () => {
    toast({
      title: "Configurações de segurança atualizadas",
      description: "Novas configurações de segurança foram aplicadas",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Preferências de notificação atualizadas",
      description: "Configurações de notificação foram salvas",
    });
  };

  const handleThemeSave = () => {
    toast({
      title: "Configurações de aparência atualizadas",
      description: "Novo tema foi aplicado",
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As novas senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi atualizada com sucesso",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showPasswords: false,
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Dados estão sendo exportados em formato CSV",
    });
  };

  const handleDataImport = () => {
    toast({
      title: "Importação iniciada",
      description: "Dados estão sendo importados no sistema",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('settings.profile')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('settings.security')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t('settings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t('settings.appearance')}
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            {t('settings.data')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.profile.info')}</CardTitle>
              <CardDescription>
                {t('settings.profile.info.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                      {user?.role}
                    </Badge>
                    <Badge variant="outline">{profileData.employeeId}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{profileData.location}</p>
                </div>
              </div>

              <Separator />

              {/* Enhanced Profile Information for Different Roles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('settings.profile.fullname')}</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('settings.profile.phone')}</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+509 XXXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">{t('settings.profile.birthdate')}</Label>
                  <Input
                    id="birthDate" 
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t('settings.profile.department')}</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">{t('settings.profile.emergencycontact')}</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    placeholder="+509 XXXX-XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t('settings.profile.bio')}</Label>
                <Input
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder={t('settings.profile.bio.placeholder')}
                />
              </div>
              
              <Button onClick={handleProfileSave} className="w-full">
                {t('settings.profile.save')}
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Role and Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {t('settings.role.permissions')}
              </CardTitle>
              <CardDescription>
                {t('settings.role.permissions.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{t('settings.role.current')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === 'admin' ? t('settings.role.admin') : 
                     user?.role === 'encarregado' ? t('settings.role.manager') : t('settings.role.monitor')}
                  </p>
                </div>
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-sm">
                  {user?.role?.toUpperCase()}
                </Badge>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">{t('settings.role.permissions.list')}</h4>
                <div className="grid grid-cols-1 gap-2">
                  {getRolePermissions().map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      {permission}
                    </div>
                  ))}
                </div>

                {/* Enhanced Features for Admin */}
                {user?.role === 'admin' && (
                  <>
                    <Separator />
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Recursos Administrativos</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span>Configuração avançada do sistema</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>Gestão completa de usuários</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-600" />
                          <span>Backup e restauração</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span>Auditoria de segurança</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Enhanced Features for Encarregado */}
                {user?.role === 'encarregado' && (
                  <>
                    <Separator />
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Recursos de Supervisão</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <span>Supervisão de equipe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>Aprovação de férias</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>Controle de ponto</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span>Relatórios departamentais</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Enhanced Features for Monitor */}
                {user?.role === 'monitor' && (
                  <>
                    <Separator />
                    <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                      <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Recursos de Monitoramento</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-orange-600" />
                          <span>Visualização de dados</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span>Registro de presenças</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-orange-600" />
                          <span>Relatórios básicos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span>Informações de funcionários</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {t('settings.account.stats')}
              </CardTitle>
              <CardDescription>
                {t('settings.account.stats.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{accountStats.loginCount}</div>
                  <div className="text-sm text-muted-foreground">{t('settings.account.logins')}</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{accountStats.reportsGenerated}</div>
                  <div className="text-sm text-muted-foreground">{t('settings.account.reports')}</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{accountStats.employeesManaged}</div>
                  <div className="text-sm text-muted-foreground">{t('settings.account.employees')}</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('settings.account.created')}</span>
                  <span>{new Date(accountStats.accountCreated).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('settings.account.lastactivity')}</span>
                  <span>{new Date(accountStats.lastActivity).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                {t('settings.password.change')}
              </CardTitle>
              <CardDescription>
                {t('settings.password.change.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('settings.password.current')}</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={passwordData.showPasswords ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setPasswordData({...passwordData, showPasswords: !passwordData.showPasswords})}
                  >
                    {passwordData.showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('settings.password.new')}</Label>
                  <Input
                    id="newPassword"
                    type={passwordData.showPasswords ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('settings.password.confirm')}</Label>
                  <Input
                    id="confirmPassword"
                    type={passwordData.showPasswords ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handlePasswordChange} className="w-full">
                {t('settings.password.change.button')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure opções de segurança e proteção da conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Ative segurança adicional para sua conta
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorEnabled: checked})}
                />
              </div>
              
              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Verificação da Conta</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${securitySettings.emailVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm">Email verificado</span>
                    </div>
                    <Badge variant={securitySettings.emailVerified ? 'default' : 'destructive'}>
                      {securitySettings.emailVerified ? 'Verificado' : 'Não verificado'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${securitySettings.phoneVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm">Telefone verificado</span>
                    </div>
                    <Badge variant={securitySettings.phoneVerified ? 'default' : 'destructive'}>
                      {securitySettings.phoneVerified ? 'Verificado' : 'Não verificado'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Códigos de Backup</h4>
                <p className="text-sm text-muted-foreground">
                  Gere códigos de backup para acessar sua conta se perder seu telefone
                </p>
                <Button 
                  variant="outline" 
                  onClick={generateBackupCodes}
                  disabled={securitySettings.backupCodesGenerated}
                >
                  {securitySettings.backupCodesGenerated ? 'Códigos já gerados' : 'Gerar Códigos de Backup'}
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSecuritySave} className="w-full">
                Salvar Configurações de Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha quais notificações você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações por email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações push no navegador
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba relatórios semanais por email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas do Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas importantes do sistema
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.systemAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Segurança</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas de segurança e logins
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Funcionários</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre mudanças de funcionários
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.employeeUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, employeeUpdates: checked})}
                />
              </div>
              
              <Button onClick={handleNotificationSave} className="w-full">
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência e Idioma</CardTitle>
              <CardDescription>
                Configure a aparência e idioma do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Ative a aparência escura
                  </p>
                </div>
                <Switch
                  checked={themeSettings.darkMode}
                  onCheckedChange={(checked) => setThemeSettings({...themeSettings, darkMode: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Input
                    id="language"
                    value={themeSettings.language}
                    onChange={(e) => setThemeSettings({...themeSettings, language: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input
                    id="timezone"
                    value={themeSettings.timezone}
                    onChange={(e) => setThemeSettings({...themeSettings, timezone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <Input
                    id="dateFormat"
                    value={themeSettings.dateFormat}
                    onChange={(e) => setThemeSettings({...themeSettings, dateFormat: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Input
                    id="currency"
                    value={themeSettings.currency}
                    onChange={(e) => setThemeSettings({...themeSettings, currency: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleThemeSave} className="w-full">
                Salvar Aparência
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Dados</CardTitle>
              <CardDescription>
                Exporte, importe e gerencie dados do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleDataExport} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Dados
                </Button>
                <Button onClick={handleDataImport} variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Importar Dados
                </Button>
              </div>
              
              <Separator />
              
              <div className="p-4 border rounded-lg bg-destructive/5">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <h4 className="font-semibold text-destructive">Zona de Perigo</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Essas ações podem apagar dados permanentemente. Tenha cuidado.
                </p>
                <Button variant="destructive" className="w-full">
                  Reset Completo do Sistema
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

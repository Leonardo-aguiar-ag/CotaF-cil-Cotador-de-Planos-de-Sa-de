import React, { useState, useMemo } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  KanbanSquare, 
  Target, 
  PlayCircle, 
  Wrench, 
  Link as LinkIcon, 
  MessageSquare,
  Search,
  Bell,
  UserCircle,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Printer,
  Save,
  Building2,
  User,
  HeartPulse,
  Smile,
  Building,
  Check,
  X,
  FileSpreadsheet,
  Upload,
  Edit,
  Trash2
} from 'lucide-react';

// --- MOCK DATA ---
const AGE_BRACKETS = [
  '0-18', '19-23', '24-28', '29-33', '34-38', 
  '39-43', '44-48', '49-53', '54-58', '59+'
];

const MOCK_PLANS = [
  {
    id: 'p1',
    operator: 'Hapvida',
    name: 'Nosso Médico RMSP',
    accommodation: 'Enfermaria',
    copay: 'Com Coparticipação Parcial',
    network: 'Rede Própria',
    refund: 'Sem Reembolso',
    prices: { '0-18': 154.90, '19-23': 185.88, '24-28': 223.05, '29-33': 267.66, '34-38': 321.20, '39-43': 385.44, '44-48': 462.52, '49-53': 555.03, '54-58': 666.03, '59+': 932.44 }
  },
  {
    id: 'p2',
    operator: 'Hapvida',
    name: 'Mix',
    accommodation: 'Apartamento',
    copay: 'Sem Coparticipação',
    network: 'Rede Ampla',
    refund: 'Sem Reembolso',
    prices: { '0-18': 210.50, '19-23': 252.60, '24-28': 303.12, '29-33': 363.74, '34-38': 436.49, '39-43': 523.79, '44-48': 628.55, '49-53': 754.26, '54-58': 905.11, '59+': 1267.15 }
  },
  {
    id: 'p3',
    operator: 'NotreDame',
    name: 'Smart 200 SP',
    accommodation: 'Enfermaria',
    copay: 'Com Coparticipação Total',
    network: 'Rede Própria',
    refund: 'Sem Reembolso',
    prices: { '0-18': 165.00, '19-23': 198.00, '24-28': 237.60, '29-33': 285.12, '34-38': 342.14, '39-43': 410.57, '44-48': 492.68, '49-53': 591.22, '54-58': 709.46, '59+': 993.24 }
  },
  {
    id: 'p4',
    operator: 'NotreDame',
    name: 'Advance 600',
    accommodation: 'Apartamento',
    copay: 'Sem Coparticipação',
    network: 'Rede Nacional',
    refund: 'Reembolso Padrão',
    prices: { '0-18': 350.00, '19-23': 420.00, '24-28': 504.00, '29-33': 604.80, '34-38': 725.76, '39-43': 870.91, '44-48': 1045.09, '49-53': 1254.11, '54-58': 1504.93, '59+': 2106.90 }
  }
];

const RECENT_QUOTES = [
  { id: 1, type: 'PME', client: 'Tech Solutions LTDA', location: 'São Paulo/SP', date: 'Hoje, 10:45', value: 'R$ 2.450,00' },
  { id: 2, type: 'PF', client: 'Maria Silva', location: 'Campinas/SP', date: 'Hoje, 09:12', value: 'R$ 540,00' },
  { id: 3, type: 'Adesão', client: 'João Souza (CREA)', location: 'Belo Horizonte/MG', date: 'Ontem, 16:30', value: 'R$ 890,00' },
];

// --- MAIN COMPONENT ---
export default function CotadorApp() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'wizard', or 'tables'

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar - Hidden on print */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between print:hidden shrink-0">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[#006B6C] flex items-center gap-2">
              <HeartPulse className="w-8 h-8" />
              CotadorPro
            </h1>
          </div>
          <nav className="px-4 space-y-1">
            <NavItem icon={<Home />} label="Início" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <NavItem icon={<FileText />} label="Relatório de Cotação" />
            <NavItem icon={<Users />} label="CRM - Clientes" />
            <NavItem icon={<KanbanSquare />} label="Pipeline de Vendas" />
            <NavItem icon={<FileSpreadsheet />} label="Gestão de Tabelas" active={currentView === 'tables'} onClick={() => setCurrentView('tables')} />
            <NavItem icon={<PlayCircle />} label="Tutoriais" />
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Integrações</p>
            </div>
            <NavItem icon={<LinkIcon />} label="Conectar MCP" />
            <NavItem icon={<MessageSquare />} label="Extensão WhatsApp" />
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#006B6C] text-white flex items-center justify-center font-bold">
              LA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Leonardo Aguiar</p>
              <p className="text-xs text-slate-500 truncate">Consultor Premium</p>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-slate-400">v2.4.1</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Hidden on print */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 print:hidden shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar clientes, cotações ou planos..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:border-[#006B6C] focus:ring-2 focus:ring-[#006B6C]/20 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-slate-400 hover:text-[#006B6C] transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-[#006B6C] transition-colors rounded-full hover:bg-slate-100">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <DashboardView onStartQuote={() => setCurrentView('wizard')} />}
          {currentView === 'wizard' && <WizardView onCancel={() => setCurrentView('dashboard')} />}
          {currentView === 'tables' && <TablesManagementView />}
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        active 
          ? 'bg-[#006B6C]/10 text-[#006B6C]' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      {label}
    </button>
  );
}

function DashboardView({ onStartQuote }) {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Olá, Leonardo! 👋</h2>
          <p className="text-slate-500 mt-1">Aqui está o resumo das suas atividades hoje.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Tarefas Hoje" value="12" subtitle="3 pendentes" icon={<CheckCircle2 />} color="blue" />
        <KpiCard title="Oportunidades CRM" value="8" subtitle="Novos leads" icon={<Users />} color="orange" />
        <KpiCard title="Cotações Efetuadas" value="4" subtitle="Hoje" icon={<FileText />} color="teal" />
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Acesso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickActionButton icon={<HeartPulse />} label="Cotar Saúde" onClick={onStartQuote} primary />
          <QuickActionButton icon={<Smile />} label="Cotar Odonto" />
          <QuickActionButton icon={<Users />} label="Meus Clientes" />
          <QuickActionButton icon={<UserCircle />} label="Cartão de Visita" />
          <QuickActionButton icon={<CheckCircle2 />} label="Minhas Tarefas" />
          <QuickActionButton icon={<MessageSquare />} label="Chat IA" />
        </div>
      </div>

      {/* Recent Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Últimas Cotações</h3>
          <button className="text-sm text-[#006B6C] hover:underline font-medium">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Tipo</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Localização</th>
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Valor Estimado</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {RECENT_QUOTES.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#006B6C]/10 text-[#006B6C]">
                      {quote.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-800">{quote.client}</td>
                  <td className="p-4 text-slate-500">{quote.location}</td>
                  <td className="p-4 text-slate-500">{quote.date}</td>
                  <td className="p-4 font-semibold text-slate-700">{quote.value}</td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-[#006B6C]">Ver detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subtitle, icon, color }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
          <span className="text-xs text-slate-400">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick, primary }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border ${
        primary 
          ? 'bg-[#006B6C] text-white border-[#006B6C] hover:bg-teal-800 shadow-md hover:shadow-lg' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-[#006B6C] hover:text-[#006B6C] hover:bg-teal-50/30'
      }`}
    >
      <div className="mb-2">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </button>
  );
}

// --- NEW COMPONENT: TABLES MANAGEMENT ---
function TablesManagementView() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestão de Tabelas e Preços</h2>
          <p className="text-slate-500 mt-1">Atualize os valores, importe planilhas de operadoras ou cadastre novos planos.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Plano Manual
          </button>
          <button className="px-4 py-2 bg-[#006B6C] text-white font-semibold rounded-lg text-sm hover:bg-teal-800 transition-colors shadow-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Importar Planilha (Excel/CSV)
          </button>
        </div>
      </div>

      {/* Tabela de Planos Cadastrados */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-800">Tabelas Ativas no Sistema</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Buscar operadora ou plano..." 
              className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#006B6C] outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-medium">Operadora</th>
                <th className="p-4 font-medium">Nome do Plano</th>
                <th className="p-4 font-medium">Acomodação</th>
                <th className="p-4 font-medium">Coparticipação</th>
                <th className="p-4 font-medium">Última Atualização</th>
                <th className="p-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {MOCK_PLANS.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-[#006B6C]">{plan.operator}</td>
                  <td className="p-4 font-medium text-slate-800">{plan.name}</td>
                  <td className="p-4 text-slate-500">{plan.accommodation}</td>
                  <td className="p-4 text-slate-500 truncate max-w-[150px]">{plan.copay}</td>
                  <td className="p-4 text-slate-500">Hoje, 08:30</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-[#006B6C] hover:bg-teal-50 rounded transition-colors" title="Editar Preços">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Excluir Plano">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex gap-3 border border-blue-100">
        <Upload className="w-5 h-5 shrink-0 text-blue-600" />
        <div>
          <strong className="block mb-1">Como funciona a importação?</strong>
          Para atualizar em massa, clique em "Importar Planilha". O sistema lerá as colunas de Faixa Etária (ex: 0-18, 19-23) e atualizará automaticamente os preços no banco de dados para que reflitam imediatamente no motor de cotação.
        </div>
      </div>
    </div>
  );
}

// --- WIZARD COMPONENT ---

function WizardView({ onCancel }) {
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    type: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    ages: AGE_BRACKETS.reduce((acc, bracket) => ({ ...acc, [bracket]: 0 }), {}),
    state: '',
    city: '',
    accommodation: 'Todas',
    copay: 'Todas',
    selectedPlans: [] // Array of plan IDs
  });

  const updateData = (field, value) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  // Determine if next button should be disabled
  const isNextDisabled = () => {
    if (step === 1 && !quoteData.type) return true;
    if (step === 2 && (!quoteData.clientName || Object.values(quoteData.ages).reduce((a, b) => a + b, 0) === 0)) return true;
    if (step === 3 && (!quoteData.state || !quoteData.city)) return true;
    return false;
  };

  const steps = [
    "Tipo de Tabela",
    "Dados e Vidas",
    "Localização e Filtros",
    "Comparativo"
  ];

  return (
    <div className="flex flex-col h-full bg-white print:bg-white">
      {/* Wizard Header - Hidden on Print */}
      <div className="border-b border-slate-200 px-8 py-4 bg-slate-50 flex items-center justify-between sticky top-0 z-10 print:hidden shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Nova Cotação de Saúde</h2>
            <p className="text-sm text-slate-500">Siga os passos para gerar o comparativo</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="hidden md:flex items-center gap-2">
          {steps.map((label, idx) => {
            const num = idx + 1;
            const isActive = step === num;
            const isPast = step > num;
            return (
              <div key={num} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold border-2 transition-colors ${
                  isActive ? 'border-[#006B6C] bg-[#006B6C] text-white' :
                  isPast ? 'border-[#006B6C] bg-white text-[#006B6C]' :
                  'border-slate-200 bg-white text-slate-400'
                }`}>
                  {isPast ? <Check className="w-4 h-4" /> : num}
                </div>
                <span className={`text-sm font-medium hidden lg:block ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {label}
                </span>
                {num < 4 && <div className={`w-8 h-px ${isPast ? 'bg-[#006B6C]' : 'bg-slate-200'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="flex-1 overflow-auto p-8 relative">
        <div className={`max-w-4xl mx-auto h-full ${step === 4 ? 'max-w-[95%] print:max-w-none print:p-0' : ''}`}>
          {step === 1 && (
            <Step1Type type={quoteData.type} setType={(v) => updateData('type', v)} />
          )}
          {step === 2 && (
            <Step2Data 
              data={quoteData} 
              updateData={updateData} 
              updateAge={(bracket, change) => {
                const current = quoteData.ages[bracket];
                const next = Math.max(0, current + change);
                updateData('ages', { ...quoteData.ages, [bracket]: next });
              }}
            />
          )}
          {step === 3 && (
            <Step3Filters data={quoteData} updateData={updateData} />
          )}
          {step === 4 && (
            <Step4Compare 
              data={quoteData} 
              updateData={updateData} 
            />
          )}
        </div>
      </div>

      {/* Wizard Footer - Hidden on Print */}
      {step < 4 && (
        <div className="border-t border-slate-200 p-4 bg-white flex justify-between items-center print:hidden shrink-0">
          <button 
            onClick={step === 1 ? onCancel : prevStep}
            className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
          >
            {step === 1 ? 'Cancelar' : 'Voltar'}
          </button>
          
          <button 
            onClick={nextStep}
            disabled={isNextDisabled()}
            className={`px-8 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              isNextDisabled() 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-[#C84B00] text-white hover:bg-orange-700 shadow-md hover:shadow-lg'
            }`}
          >
            Próxima Etapa
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// --- WIZARD STEPS ---

function Step1Type({ type, setType }) {
  const options = [
    { id: 'PME', title: 'Empresarial (PME)', desc: 'Para empresas com CNPJ, a partir de 2 vidas.', icon: <Building2 /> },
    { id: 'PF', title: 'Pessoa Física', desc: 'Contratação via CPF direto com a operadora.', icon: <User /> },
    { id: 'Adesão', title: 'Adesão (Entidade)', desc: 'Para profissionais liberais e estudantes.', icon: <Users /> },
    { id: 'Odonto', title: 'Odontológico', desc: 'Planos exclusivos para saúde bucal.', icon: <Smile /> },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Qual a modalidade do plano?</h3>
      <p className="text-slate-500 mb-8">Selecione o tipo de contratação para filtrar as tabelas corretas.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setType(opt.id)}
            className={`flex items-start gap-4 p-6 rounded-xl border-2 text-left transition-all ${
              type === opt.id 
                ? 'border-[#006B6C] bg-teal-50/50 shadow-md ring-1 ring-[#006B6C]/20' 
                : 'border-slate-200 bg-white hover:border-[#006B6C]/50 hover:shadow-sm'
            }`}
          >
            <div className={`p-3 rounded-lg ${type === opt.id ? 'bg-[#006B6C] text-white' : 'bg-slate-100 text-slate-600'}`}>
              {React.cloneElement(opt.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <h4 className={`font-bold text-lg ${type === opt.id ? 'text-[#006B6C]' : 'text-slate-800'}`}>{opt.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2Data({ data, updateData, updateAge }) {
  const totalVidas = Object.values(data.ages).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Dados do Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Nome do Titular ou Empresa *</label>
            <input 
              type="text" 
              value={data.clientName}
              onChange={(e) => updateData('clientName', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006B6C]/20 focus:border-[#006B6C] outline-none transition-all"
              placeholder="Ex: João da Silva"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Telefone / WhatsApp</label>
            <input 
              type="text" 
              value={data.clientPhone}
              onChange={(e) => updateData('clientPhone', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006B6C]/20 focus:border-[#006B6C] outline-none transition-all"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Distribuição de Vidas</h3>
            <p className="text-sm text-slate-500">Informe a quantidade de beneficiários por faixa etária.</p>
          </div>
          <div className="bg-[#006B6C] text-white px-4 py-2 rounded-lg font-bold">
            Total: {totalVidas} vida{totalVidas !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-4">
          {AGE_BRACKETS.map(bracket => (
            <div key={bracket} className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <span className="text-sm font-semibold text-slate-600 mb-2">{bracket} anos</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateAge(bracket, -1)}
                  disabled={data.ages[bracket] === 0}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold text-lg text-slate-800">{data.ages[bracket]}</span>
                <button 
                  onClick={() => updateAge(bracket, 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#006B6C]/10 text-[#006B6C] hover:bg-[#006B6C]/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3Filters({ data, updateData }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Localização e Preferências</h3>
        <p className="text-slate-500">Defina a região de abrangência e filtros específicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Estado (UF) *</label>
          <select 
            value={data.state}
            onChange={(e) => updateData('state', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006B6C]/20 focus:border-[#006B6C] outline-none transition-all"
          >
            <option value="">Selecione o Estado</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="CE">Ceará</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Cidade *</label>
          <select 
            value={data.city}
            onChange={(e) => updateData('city', e.target.value)}
            disabled={!data.state}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006B6C]/20 focus:border-[#006B6C] outline-none transition-all disabled:bg-slate-100 disabled:opacity-70"
          >
            <option value="">Selecione a Cidade</option>
            <option value="Capital">Capital / Região Metropolitana</option>
            <option value="Interior">Interior</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-800">Acomodação</h4>
          <div className="flex gap-4">
            {['Todas', 'Enfermaria', 'Apartamento'].map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="accommodation" 
                  value={opt}
                  checked={data.accommodation === opt}
                  onChange={(e) => updateData('accommodation', e.target.value)}
                  className="w-4 h-4 text-[#006B6C] focus:ring-[#006B6C]"
                />
                <span className="text-slate-700 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-800">Coparticipação</h4>
          <div className="flex gap-4">
            {['Todas', 'Com Coparticipação', 'Sem Coparticipação'].map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="copay" 
                  value={opt}
                  checked={data.copay === opt}
                  onChange={(e) => updateData('copay', e.target.value)}
                  className="w-4 h-4 text-[#006B6C] focus:ring-[#006B6C]"
                />
                <span className="text-slate-700 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4Compare({ data, updateData }) {
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // Filter plans based on step 3 (simplified for mock data)
  const availablePlans = MOCK_PLANS.filter(plan => {
    let accMatch = data.accommodation === 'Todas' || plan.accommodation === data.accommodation;
    let copayMatch = data.copay === 'Todas' || plan.copay.includes(data.copay); 
    return accMatch && copayMatch;
  });

  const togglePlanSelection = (planId) => {
    const current = data.selectedPlans;
    if (current.includes(planId)) {
      updateData('selectedPlans', current.filter(id => id !== planId));
      setShowLimitWarning(false);
    } else {
      if (current.length >= 4) {
        setShowLimitWarning(true);
        setTimeout(() => setShowLimitWarning(false), 3500); // Esconde o aviso após 3.5s
        return;
      }
      updateData('selectedPlans', [...current, planId]);
    }
  };

  const selectedPlanObjects = data.selectedPlans.map(id => availablePlans.find(p => p.id === id)).filter(Boolean);
  const totalVidas = Object.values(data.ages).reduce((a, b) => a + b, 0);
  const activeAgeBrackets = AGE_BRACKETS.filter(bracket => data.ages[bracket] > 0);

  const calculateTotal = (plan) => {
    let total = 0;
    activeAgeBrackets.forEach(bracket => {
      total += (plan.prices[bracket] * data.ages[bracket]);
    });
    return total;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300">
      {/* Header Actions - Hidden on print */}
      <div className="flex justify-between items-end mb-6 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Comparativo de Planos</h2>
          <p className="text-slate-500 text-sm mt-1">Cliente: <span className="font-semibold text-slate-700">{data.clientName}</span> | {totalVidas} vida(s) | {data.city}/{data.state}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm font-medium">
            <Save className="w-4 h-4" />
            Salvar Cotação
          </button>
          <button 
            onClick={handlePrint}
            disabled={selectedPlanObjects.length === 0}
            className="px-4 py-2 bg-[#C84B00] text-white rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" />
            Gerar PDF
          </button>
        </div>
      </div>

      {/* Print Only Header */}
      <div className="hidden print:block mb-8 border-b-2 border-[#006B6C] pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#006B6C] flex items-center gap-2">
            <HeartPulse className="w-8 h-8" />
            Proposta Comercial
          </h1>
          <div className="text-right">
            <p className="font-bold text-slate-800">Consultor: Leonardo Aguiar</p>
            <p className="text-slate-600">leonardo@corretora.com.br</p>
            <p className="text-slate-600">(11) 98888-7777</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Dados do Cliente</h2>
          <div className="flex gap-8 text-sm">
            <p><strong>Nome:</strong> {data.clientName || 'Não informado'}</p>
            <p><strong>Modalidade:</strong> {data.type}</p>
            <p><strong>Localidade:</strong> {data.city}/{data.state}</p>
            <p><strong>Total de Vidas:</strong> {totalVidas}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Left Panel: Plan Selection - Hidden on Print */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden shadow-sm print:hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Planos Disponíveis</h3>
            <p className="text-xs text-slate-500 mt-1">{availablePlans.length} encontrados</p>
          </div>
          
          {showLimitWarning && (
            <div className="mx-4 mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-orange-600 mt-0.5"><X className="w-4 h-4" /></span>
              <p className="text-sm text-orange-800">
                <strong className="block mb-0.5">Limite atingido</strong>
                Você pode comparar no máximo 4 planos simultaneamente.
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {availablePlans.map(plan => {
              const isSelected = data.selectedPlans.includes(plan.id);
              const planTotal = calculateTotal(plan);
              return (
                <div 
                  key={plan.id}
                  onClick={() => togglePlanSelection(plan.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-[#006B6C] bg-teal-50/30' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{plan.operator}</span>
                      <h4 className="font-bold text-slate-800 leading-tight">{plan.name}</h4>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mt-1 shrink-0 ${
                      isSelected ? 'bg-[#006B6C] border-[#006B6C] text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap text-xs text-slate-600 mb-3">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded">{plan.accommodation}</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[120px]">{plan.copay}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100/50 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Total Mensal</span>
                    <span className="font-bold text-[#006B6C]">
                      R$ {planTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Comparison Matrix */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col print:col-span-4 print:border-none print:shadow-none">
          {selectedPlanObjects.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center print:hidden">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Nenhum plano selecionado</h3>
              <p className="text-slate-500 mt-2 max-w-sm">Selecione os planos na lista ao lado para gerar o comparativo lado a lado.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto print:overflow-visible">
              <table className="w-full min-w-max border-collapse">
                <thead>
                  <tr>
                    <th className="bg-slate-50 border-b border-slate-200 p-4 text-left font-semibold text-slate-600 w-48 sticky left-0 z-10 print:static print:bg-transparent">
                      Características
                    </th>
                    {selectedPlanObjects.map(plan => (
                      <th key={plan.id} className="bg-slate-50 border-b border-l border-slate-200 p-4 min-w-[220px] relative print:bg-transparent">
                        {/* Remove button - hidden on print */}
                        <button 
                          onClick={() => togglePlanSelection(plan.id)}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors print:hidden"
                          title="Remover plano"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        <div className="text-center">
                          <span className="text-xs font-bold text-[#006B6C] uppercase tracking-wider block mb-1">{plan.operator}</span>
                          <span className="text-lg font-bold text-slate-800 block leading-tight">{plan.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* General Features */}
                  <TableRow label="Acomodação" plans={selectedPlanObjects} field="accommodation" />
                  <TableRow label="Coparticipação" plans={selectedPlanObjects} field="copay" />
                  <TableRow label="Abrangência" plans={selectedPlanObjects} field="network" />
                  <TableRow label="Reembolso" plans={selectedPlanObjects} field="refund" />
                  
                  {/* Price Breakdown */}
                  <tr>
                    <td colSpan={selectedPlanObjects.length + 1} className="bg-[#006B6C]/5 p-3 font-bold text-[#006B6C] text-xs uppercase tracking-wider border-y border-slate-200 sticky left-0 print:static print:bg-slate-100">
                      Composição de Preços (Vidas por Faixa Etária)
                    </td>
                  </tr>
                  
                  {activeAgeBrackets.map(bracket => (
                    <tr key={bracket} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 border-b border-slate-200 font-medium text-slate-700 bg-white sticky left-0 z-10 print:static">
                        <span className="inline-block w-6 text-center font-bold mr-2 text-[#006B6C]">{data.ages[bracket]}x</span>
                        {bracket} anos
                      </td>
                      {selectedPlanObjects.map(plan => {
                        const unitPrice = plan.prices[bracket];
                        const rowTotal = unitPrice * data.ages[bracket];
                        return (
                          <td key={plan.id} className="p-3 border-b border-l border-slate-200 text-center">
                            <div className="flex flex-col">
                              <span className="text-slate-500 text-xs">R$ {unitPrice.toFixed(2)} un.</span>
                              <span className="font-semibold text-slate-800">R$ {rowTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Totals Row */}
                  <tr>
                    <td className="p-4 border-b border-slate-200 font-bold text-slate-800 bg-slate-50 sticky left-0 z-10 text-lg print:static print:bg-transparent">
                      Total Mensal Estimado
                    </td>
                    {selectedPlanObjects.map(plan => (
                      <td key={plan.id} className="p-4 border-b border-l border-slate-200 text-center bg-slate-50 print:bg-transparent">
                        <span className="text-2xl font-black text-[#C84B00]">
                          R$ {calculateTotal(plan).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Additional Info Row */}
                  <tr>
                    <td className="p-4 text-xs text-slate-500 bg-white sticky left-0 print:static" colSpan={selectedPlanObjects.length + 1}>
                      * Valores sujeitos a alteração sem aviso prévio. Taxa de adesão/cadastro não inclusa nesta estimativa.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for table rows
function TableRow({ label, plans, field }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="p-3 border-b border-slate-200 font-medium text-slate-600 bg-white sticky left-0 z-10 print:static">
        {label}
      </td>
      {plans.map(plan => (
        <td key={plan.id} className="p-3 border-b border-l border-slate-200 text-center text-slate-800 font-medium">
          {plan[field]}
        </td>
      ))}
    </tr>
  );
}
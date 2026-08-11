"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Users,
  Search,
  Filter,
  Download,
  MessageCircle,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  StickyNote,
  Trash2,
  Megaphone,
  CalendarDays,
  HandCoins,
  HelpCircle,
  Plus,
  Table as TableIcon,
  LayoutList,
  CheckSquare,
  Square,
  ArrowUpDown,
  X,
  PieChart,
  UserPlus,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { generateWhatsAppUrl } from "@/lib/utils";

type Status = "novo" | "contatado" | "ativo" | "inativo";
type HowHelp = "divulgacao" | "evento" | "doacao" | "voluntario" | "outro" | "";
type SortField = "name" | "city" | "created_at" | "status";
type SortOrder = "asc" | "desc";
type ViewMode = "table" | "cards";

interface Apoiador {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  city: string;
  neighborhood: string | null;
  how_help: HowHelp;
  lgpd_consent: boolean;
  whatsapp_authorization: boolean;
  status: Status;
  notes: string | null;
  created_at: string;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  novo: { label: "Novo", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: Clock },
  contatado: { label: "Contatado", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", icon: MessageCircle },
  ativo: { label: "Ativo", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", icon: CheckCircle2 },
  inativo: { label: "Inativo", color: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400", icon: XCircle },
};

const HOW_HELP_CONFIG: Record<HowHelp, { label: string; icon: React.ElementType }> = {
  divulgacao: { label: "Divulgação", icon: Megaphone },
  evento: { label: "Eventos", icon: CalendarDays },
  doacao: { label: "Doação", icon: HandCoins },
  voluntario: { label: "Voluntário", icon: UserCheck },
  outro: { label: "Outro", icon: HelpCircle },
  "": { label: "Não informado", icon: HelpCircle },
};

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return phone;
}

export default function AdminApoiadoresPage() {
  const [apoiadores, setApoiadores] = useState<Apoiador[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "todos">("todos");
  const [filterHowHelp, setFilterHowHelp] = useState<HowHelp | "todos">("todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string>("");
  const [savingNote, setSavingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  
  // View mode state (Planilha vs Cards)
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  
  // Bulk selection state
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Sorting state
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Modal manual registration state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [newFormData, setNewFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Maceió",
    neighborhood: "",
    how_help: "divulgacao" as HowHelp,
    notes: "",
  });
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  const fetchApoiadores = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("apoiadores")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar apoiadores");
    } else {
      setApoiadores(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchApoiadores();
  }, [fetchApoiadores]);

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let result = apoiadores.filter((a) => {
      const matchSearch =
        search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.city.toLowerCase().includes(search.toLowerCase()) ||
        (a.neighborhood?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        a.phone.includes(search) ||
        (a.email?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchStatus = filterStatus === "todos" || a.status === filterStatus;
      const matchHelp = filterHowHelp === "todos" || a.how_help === filterHowHelp;
      return matchSearch && matchStatus && matchHelp;
    });

    result.sort((a, b) => {
      let aVal = a[sortField] ?? "";
      let bVal = b[sortField] ?? "";
      if (sortField === "created_at") {
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [apoiadores, search, filterStatus, filterHowHelp, sortField, sortOrder]);

  const counts = useMemo(() => {
    return {
      total: apoiadores.length,
      novo: apoiadores.filter((a) => a.status === "novo").length,
      contatado: apoiadores.filter((a) => a.status === "contatado").length,
      ativo: apoiadores.filter((a) => a.status === "ativo").length,
      inativo: apoiadores.filter((a) => a.status === "inativo").length,
    };
  }, [apoiadores]);

  // Breakdown by city and how_help for stats modal/panel
  const cityStats = useMemo(() => {
    const map: Record<string, number> = {};
    apoiadores.forEach((a) => {
      const c = a.city ? a.city.trim() : "Não informada";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [apoiadores]);

  const helpStats = useMemo(() => {
    const map: Record<string, number> = {};
    apoiadores.forEach((a) => {
      const h = a.how_help ? HOW_HELP_CONFIG[a.how_help].label : "Não informado";
      map[h] = (map[h] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [apoiadores]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdatingStatus(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("apoiadores")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar status");
    } else {
      setApoiadores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      toast.success("Status atualizado!");
    }
    setUpdatingStatus(null);
  };

  const saveNote = async (id: string) => {
    setSavingNote(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("apoiadores")
      .update({ notes: editingNote })
      .eq("id", id);
    if (error) {
      toast.error("Erro ao salvar nota");
    } else {
      setApoiadores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, notes: editingNote } : a))
      );
      toast.success("Nota salva!");
    }
    setSavingNote(false);
  };

  const deleteApoiador = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este apoiador?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("apoiadores").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
    } else {
      setApoiadores((prev) => prev.filter((a) => a.id !== id));
      if (selectedId === id) setSelectedId(null);
      setSelectedRows((prev) => prev.filter((rId) => rId !== id));
      toast.success("Apoiador removido");
    }
  };

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedRows.length === filtered.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filtered.map((a) => a.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const bulkUpdateStatus = async (status: Status) => {
    if (selectedRows.length === 0) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("apoiadores")
      .update({ status })
      .in("id", selectedRows);
    if (error) {
      toast.error("Erro ao atualizar lote");
    } else {
      setApoiadores((prev) =>
        prev.map((a) => (selectedRows.includes(a.id) ? { ...a, status } : a))
      );
      toast.success(`${selectedRows.length} apoiador(es) atualizado(s)!`);
      setSelectedRows([]);
    }
  };

  const bulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!confirm(`Tem certeza que deseja excluir ${selectedRows.length} apoiadores selecionados?`))
      return;
    const supabase = createClient();
    const { error } = await supabase
      .from("apoiadores")
      .delete()
      .in("id", selectedRows);
    if (error) {
      toast.error("Erro ao excluir lote");
    } else {
      setApoiadores((prev) => prev.filter((a) => !selectedRows.includes(a.id)));
      toast.success(`${selectedRows.length} apoiadores removidos`);
      setSelectedRows([]);
    }
  };

  // Export CSV (Excel compatible UTF-8 BOM)
  const exportCSV = (onlySelected = false) => {
    const listToExport = onlySelected
      ? apoiadores.filter((a) => selectedRows.includes(a.id))
      : filtered;

    if (listToExport.length === 0) {
      toast.error("Nenhum item para exportar");
      return;
    }

    const headers = [
      "Nome",
      "Telefone",
      "Email",
      "Cidade",
      "Bairro",
      "Como Ajuda",
      "Status",
      "Consentimento LGPD",
      "Autorizacao WhatsApp",
      "Observacoes",
      "Data de Cadastro",
    ];

    const rows = listToExport.map((a) => [
      a.name,
      a.phone,
      a.email ?? "",
      a.city,
      a.neighborhood ?? "",
      HOW_HELP_CONFIG[a.how_help].label,
      STATUS_CONFIG[a.status].label,
      a.lgpd_consent ? "Sim" : "Não",
      a.whatsapp_authorization ? "Sim" : "Não",
      a.notes ?? "",
      formatDate(a.created_at),
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) =>
          row
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(";")
        )
        .join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `apoiadores_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`${listToExport.length} cadastros exportados para CSV!`);
  };

  // Create manual apoiador
  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormData.name || !newFormData.phone || !newFormData.city) {
      toast.error("Preencha Nome, Telefone e Cidade");
      return;
    }

    setIsSubmittingNew(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("apoiadores")
      .insert({
        name: newFormData.name,
        phone: newFormData.phone,
        email: newFormData.email || null,
        city: newFormData.city,
        neighborhood: newFormData.neighborhood || null,
        how_help: newFormData.how_help,
        notes: newFormData.notes || null,
        lgpd_consent: true,
        whatsapp_authorization: true,
        status: "novo",
      })
      .select()
      .single();

    if (error) {
      toast.error("Erro ao cadastrar apoiador: " + error.message);
    } else {
      toast.success("Apoiador cadastrado com sucesso!");
      setApoiadores((prev) => [data, ...prev]);
      setIsModalOpen(false);
      setNewFormData({
        name: "",
        phone: "",
        email: "",
        city: "Maceió",
        neighborhood: "",
        how_help: "divulgacao",
        notes: "",
      });
    }
    setIsSubmittingNew(false);
  };

  const selectedApoiador = apoiadores.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
              Planilha de Apoiadores
            </h1>
            <span className="bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300 text-xs font-bold px-2.5 py-1 rounded-full">
              {counts.total} cadastros
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Gerencie e exporte os cadastros de lideranças e apoiadores da campanha
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Alternador de visualização */}
          <div className="bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <TableIcon size={15} />
              Planilha
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <LayoutList size={15} />
              Lista & Cards
            </button>
          </div>

          <button
            onClick={() => setIsStatsOpen(!isStatsOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-medium transition-colors"
          >
            <PieChart size={15} className="text-accent-500" />
            Estatísticas
          </button>

          <button
            onClick={fetchApoiadores}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 text-xs transition-colors"
            title="Atualizar dados"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => exportCSV(false)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            <Download size={15} />
            Exportar CSV
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-all shadow-md shadow-accent-500/20"
          >
            <UserPlus size={16} />
            + Novo Cadastro
          </button>
        </div>
      </div>

      {/* Stats Breakdown Collapsible Panel */}
      {isStatsOpen && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-display flex items-center gap-2">
              <PieChart size={16} className="text-accent-500" />
              Resumo da Base de Apoiadores
            </h3>
            <button
              onClick={() => setIsStatsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Top Cidades
              </p>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                {cityStats.map(([city, count]) => (
                  <div key={city} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{city}</span>
                    <span className="font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">
                      {count} ({Math.round((count / (counts.total || 1)) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Por Forma de Apoio
              </p>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                {helpStats.map(([help, count]) => (
                  <div key={help} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{help}</span>
                    <span className="font-bold bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 px-2 py-0.5 rounded-full">
                      {count} ({Math.round((count / (counts.total || 1)) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { key: "total", label: "Total da Base", color: "text-slate-900 dark:text-white", bg: "bg-white dark:bg-slate-900" },
          { key: "novo", label: "Novos Cadastros", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/70 dark:bg-blue-950/30" },
          { key: "contatado", label: "Em Contato", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50/70 dark:bg-yellow-950/30" },
          { key: "ativo", label: "Apoiadores Ativos", color: "text-green-600 dark:text-green-400", bg: "bg-green-50/70 dark:bg-green-950/30" },
        ].map((card) => (
          <div
            key={card.key}
            onClick={() => setFilterStatus(card.key === "total" ? "todos" : (card.key as Status))}
            className={`${card.bg} p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-slate-300 transition-all`}
          >
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{card.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold font-display mt-1 ${card.color}`}>
              {counts[card.key as keyof typeof counts]}
            </p>
          </div>
        ))}
      </div>

      {/* Bar de Filtros e Busca */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="apoiadores-search"
            type="text"
            placeholder="Buscar por nome, cidade, bairro, WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <select
            id="apoiadores-filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Status | "todos")}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="todos">Todos os Status</option>
            <option value="novo">Novos</option>
            <option value="contatado">Contatados</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>

          <select
            id="apoiadores-filter-help"
            value={filterHowHelp}
            onChange={(e) => setFilterHowHelp(e.target.value as HowHelp | "todos")}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="todos">Forma de Apoio</option>
            <option value="divulgacao">Divulgação</option>
            <option value="evento">Eventos</option>
            <option value="doacao">Doação</option>
            <option value="voluntario">Voluntário</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      {/* Barra de Ações em Lote (Bulk Actions) */}
      {selectedRows.length > 0 && (
        <div className="bg-accent-500 text-white p-3.5 rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-lg shadow-accent-500/20 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckSquare size={16} />
            <span>{selectedRows.length} apoiador(es) selecionado(s)</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] opacity-80">Ações em lote:</span>
            <button
              onClick={() => bulkUpdateStatus("contatado")}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold transition-colors"
            >
              Marcar Contatado
            </button>
            <button
              onClick={() => bulkUpdateStatus("ativo")}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold transition-colors"
            >
              Marcar Ativo
            </button>
            <button
              onClick={() => exportCSV(true)}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Download size={13} />
              Exportar
            </button>
            <button
              onClick={bulkDelete}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-semibold transition-colors"
            >
              Excluir
            </button>
            <button
              onClick={() => setSelectedRows([])}
              className="p-1 hover:bg-white/20 rounded-lg ml-1"
              title="Cancelar seleção"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL: MODO PLANILHA (DATA TABLE) VS MODO CARDS */}
      {viewMode === "table" ? (
        /* MODO PLANILHA (FULL DATA TABLE) */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="animate-spin text-slate-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">Nenhum apoiador encontrado</p>
              <p className="text-sm mt-1">Ajuste os filtros ou cadastre um novo apoiador</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4 w-10 text-center">
                      <button onClick={toggleSelectAll} className="p-1 hover:text-slate-700">
                        {selectedRows.length === filtered.length && filtered.length > 0 ? (
                          <CheckSquare size={16} className="text-accent-500" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Apoiador / Nome
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-4">WhatsApp / Fone</th>
                    <th
                      className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      onClick={() => handleSort("city")}
                    >
                      <div className="flex items-center gap-1">
                        Cidade / Bairro
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-4">Como quer Ajudar</th>
                    <th
                      className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      onClick={() => handleSort("created_at")}
                    >
                      <div className="flex items-center gap-1">
                        Data de Cadastro
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((apoiador) => {
                    const StatusIcon = STATUS_CONFIG[apoiador.status].icon;
                    const HelpIcon = HOW_HELP_CONFIG[apoiador.how_help].icon;
                    const isRowSelected = selectedRows.includes(apoiador.id);
                    const wppUrl = generateWhatsAppUrl(
                      apoiador.phone,
                      `Olá ${apoiador.name.split(" ")[0]}! Aqui é a equipe do Brivaldo Marques. Vimos seu cadastro como apoiador e gostaríamos de conversar com você.`
                    );

                    return (
                      <tr
                        key={apoiador.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                          isRowSelected ? "bg-accent-50/50 dark:bg-accent-900/10" : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleSelectRow(apoiador.id)}
                            className="p-1 text-slate-400 hover:text-accent-500"
                          >
                            {isRowSelected ? (
                              <CheckSquare size={16} className="text-accent-500" />
                            ) : (
                              <Square size={16} />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                              {apoiador.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                                {apoiador.name}
                              </p>
                              {apoiador.email && (
                                <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                                  {apoiador.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <a
                            href={`tel:${apoiador.phone}`}
                            className="font-medium text-slate-700 dark:text-slate-300 hover:text-accent-500"
                          >
                            {formatPhone(apoiador.phone)}
                          </a>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {apoiador.city}
                          </span>
                          {apoiador.neighborhood && (
                            <span className="text-slate-400 text-[11px] block">
                              {apoiador.neighborhood}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                            <HelpIcon size={12} className="text-slate-400" />
                            {HOW_HELP_CONFIG[apoiador.how_help].label}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <select
                            value={apoiador.status}
                            onChange={(e) => updateStatus(apoiador.id, e.target.value as Status)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border-none cursor-pointer focus:outline-none ${
                              STATUS_CONFIG[apoiador.status].color
                            }`}
                          >
                            <option value="novo">Novo</option>
                            <option value="contatado">Contatado</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                          {formatDate(apoiador.created_at)}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={wppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors inline-flex items-center justify-center"
                              title="Chamar no WhatsApp"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                            </a>
                            <button
                              onClick={() => deleteApoiador(apoiador.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer da tabela */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Exibindo {filtered.length} de {apoiadores.length} cadastros na planilha</span>
              <span>Ordenado por {sortField} ({sortOrder.toUpperCase()})</span>
            </div>
          )}
        </div>
      ) : (
        /* MODO CARDS / LISTA SPLIT */
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw size={24} className="animate-spin text-slate-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Users size={40} className="mx-auto mb-3 opacity-40" />
                <p className="font-medium">Nenhum apoiador encontrado</p>
                <p className="text-sm mt-1">Ajuste os filtros ou aguarde novos cadastros</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((apoiador) => {
                  const StatusIcon = STATUS_CONFIG[apoiador.status].icon;
                  const HelpIcon = HOW_HELP_CONFIG[apoiador.how_help].icon;
                  const isSelected = selectedId === apoiador.id;
                  const wppUrl = generateWhatsAppUrl(
                    apoiador.phone,
                    `Olá ${apoiador.name.split(" ")[0]}! Aqui é a equipe do Brivaldo Marques. Vimos seu cadastro como apoiador e gostaríamos de conversar com você.`
                  );

                  return (
                    <div
                      key={apoiador.id}
                      onClick={() => {
                        setSelectedId(isSelected ? null : apoiador.id);
                        setEditingNote(apoiador.notes ?? "");
                      }}
                      className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors
                        ${isSelected
                          ? "bg-accent-50 dark:bg-accent-900/10 border-l-2 border-accent-500"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        {apoiador.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                            {apoiador.name}
                          </p>
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CONFIG[apoiador.status].color}`}>
                            <StatusIcon size={10} />
                            {STATUS_CONFIG[apoiador.status].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {apoiador.city}
                            {apoiador.neighborhood ? ` · ${apoiador.neighborhood}` : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <HelpIcon size={11} />
                            {HOW_HELP_CONFIG[apoiador.how_help].label}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-400">
                          {formatDate(apoiador.created_at)}
                        </span>
                        <a
                          href={wppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card de Detalhes lateral */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit sticky top-6">
            {!selectedApoiador ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 px-6 text-center">
                <Users size={36} className="mb-3 opacity-30" />
                <p className="font-medium text-sm">Selecione um apoiador</p>
                <p className="text-xs mt-1">Clique em um item da lista para ver os detalhes completos</p>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-base">
                      {selectedApoiador.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {selectedApoiador.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Cadastrado em {formatDate(selectedApoiador.created_at)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteApoiador(selectedApoiador.id)}
                    className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Excluir apoiador"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-slate-400 flex-shrink-0" />
                    <a
                      href={`tel:${selectedApoiador.phone}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-accent-600 transition-colors font-medium"
                    >
                      {formatPhone(selectedApoiador.phone)}
                    </a>
                  </div>
                  {selectedApoiador.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-slate-400 flex-shrink-0" />
                      <a
                        href={`mailto:${selectedApoiador.email}`}
                        className="text-slate-700 dark:text-slate-300 hover:text-accent-600 transition-colors truncate"
                      >
                        {selectedApoiador.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {selectedApoiador.city}
                      {selectedApoiador.neighborhood ? ` · ${selectedApoiador.neighborhood}` : ""}
                    </span>
                  </div>
                  {selectedApoiador.how_help && (
                    <div className="flex items-center gap-2 text-sm">
                      {(() => {
                        const HelpIcon = HOW_HELP_CONFIG[selectedApoiador.how_help].icon;
                        return <HelpIcon size={14} className="text-slate-400 flex-shrink-0" />;
                      })()}
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {HOW_HELP_CONFIG[selectedApoiador.how_help].label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${selectedApoiador.lgpd_consent ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600"}`}>
                    {selectedApoiador.lgpd_consent ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                    LGPD
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${selectedApoiador.whatsapp_authorization ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600"}`}>
                    {selectedApoiador.whatsapp_authorization ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                    WhatsApp
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Alterar Status
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(STATUS_CONFIG) as Status[]).map((s) => {
                      const Cfg = STATUS_CONFIG[s];
                      const Icon = Cfg.icon;
                      const isActive = selectedApoiador.status === s;
                      return (
                        <button
                          key={s}
                          disabled={updatingStatus === selectedApoiador.id}
                          onClick={() => updateStatus(selectedApoiador.id, s)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border
                            ${isActive
                              ? `${Cfg.color} border-current opacity-100 font-bold`
                              : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                            }`}
                        >
                          <Icon size={12} />
                          {Cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <StickyNote size={12} />
                    Observação / Nota Interna
                  </p>
                  <textarea
                    id="apoiador-note-textarea"
                    rows={3}
                    value={editingNote}
                    onChange={(e) => setEditingNote(e.target.value)}
                    placeholder="Adicione observações sobre este apoiador..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />
                  <button
                    id="apoiador-save-note-btn"
                    onClick={() => saveNote(selectedApoiador.id)}
                    disabled={savingNote}
                    className="mt-2 w-full py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-colors disabled:opacity-60"
                  >
                    {savingNote ? "Salvando..." : "Salvar Nota"}
                  </button>
                </div>

                <a
                  href={generateWhatsAppUrl(
                    selectedApoiador.phone,
                    `Olá ${selectedApoiador.name.split(" ")[0]}! Aqui é a equipe do Brivaldo Marques. Vimos seu cadastro como apoiador e gostaríamos de conversar com você. 😊`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="apoiador-detail-wpp-btn"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-green-500/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Conversar no WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: NOVO CADASTRO MANUAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 flex items-center justify-center">
                  <UserPlus size={18} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">
                  Cadastrar Apoiador Manualmente
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateManual} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do apoiador"
                  value={newFormData.name}
                  onChange={(e) => setNewFormData({ ...newFormData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(82) 99999-9999"
                    value={newFormData.phone}
                    onChange={(e) => setNewFormData({ ...newFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    E-mail (opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={newFormData.email}
                    onChange={(e) => setNewFormData({ ...newFormData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maceió"
                    value={newFormData.city}
                    onChange={(e) => setNewFormData({ ...newFormData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Benedito Bentes"
                    value={newFormData.neighborhood}
                    onChange={(e) => setNewFormData({ ...newFormData, neighborhood: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Como Pode Ajudar?
                </label>
                <select
                  value={newFormData.how_help}
                  onChange={(e) => setNewFormData({ ...newFormData, how_help: e.target.value as HowHelp })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="divulgacao">Divulgação de Campanha</option>
                  <option value="evento">Organização de Eventos</option>
                  <option value="voluntario">Voluntário na Rua / Bandeiraço</option>
                  <option value="doacao">Apoio / Doação</option>
                  <option value="outro">Outro tipo de apoio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Observações / Quem indicou
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Liderança do bairro, contato feito em caminhada..."
                  value={newFormData.notes}
                  onChange={(e) => setNewFormData({ ...newFormData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="flex-1 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {isSubmittingNew ? "Cadastrando..." : "Salvar Cadastro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

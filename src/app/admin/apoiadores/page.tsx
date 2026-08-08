"use client";

import { useEffect, useState, useCallback } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { generateWhatsAppUrl } from "@/lib/utils";

type Status = "novo" | "contatado" | "ativo" | "inativo";
type HowHelp = "divulgacao" | "evento" | "doacao" | "voluntario" | "outro" | "";

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
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
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

  const supabase = createClient();

  const fetchApoiadores = useCallback(async () => {
    setLoading(true);
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
  }, [supabase]);

  useEffect(() => {
    fetchApoiadores();
  }, [fetchApoiadores]);

  const filtered = apoiadores.filter((a) => {
    const matchSearch =
      search === "" ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      (a.email?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = filterStatus === "todos" || a.status === filterStatus;
    const matchHelp = filterHowHelp === "todos" || a.how_help === filterHowHelp;
    return matchSearch && matchStatus && matchHelp;
  });

  const counts = {
    total: apoiadores.length,
    novo: apoiadores.filter((a) => a.status === "novo").length,
    contatado: apoiadores.filter((a) => a.status === "contatado").length,
    ativo: apoiadores.filter((a) => a.status === "ativo").length,
    inativo: apoiadores.filter((a) => a.status === "inativo").length,
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdatingStatus(id);
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
    const { error } = await supabase.from("apoiadores").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
    } else {
      setApoiadores((prev) => prev.filter((a) => a.id !== id));
      if (selectedId === id) setSelectedId(null);
      toast.success("Apoiador removido");
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Nome", "Telefone", "Email", "Cidade", "Bairro", "Como Ajuda", "Status", "Data"],
      ...filtered.map((a) => [
        a.name,
        a.phone,
        a.email ?? "",
        a.city,
        a.neighborhood ?? "",
        HOW_HELP_CONFIG[a.how_help].label,
        STATUS_CONFIG[a.status].label,
        formatDate(a.created_at),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apoiadores_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado!");
  };

  const selectedApoiador = apoiadores.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display">
            Apoiadores
          </h1>
          <p className="text-slate-500 mt-1">
            Gerencie os cadastros da página "Seja Apoiador"
          </p>
        </div>
        <div className="flex gap-3">
          <button
            id="apoiadores-refresh-btn"
            onClick={fetchApoiadores}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors"
          >
            <RefreshCw size={16} />
            Atualizar
          </button>
          <button
            id="apoiadores-export-btn"
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Cards de contagem */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: "total", label: "Total", color: "text-slate-900 dark:text-white", bg: "bg-white dark:bg-slate-900" },
          { key: "novo", label: "Novos", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
          { key: "contatado", label: "Contatados", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
          { key: "ativo", label: "Ativos", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30" },
        ].map((card) => (
          <div
            key={card.key}
            className={`${card.bg} p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm`}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className={`text-3xl font-bold font-display mt-1 ${card.color}`}>
              {counts[card.key as keyof typeof counts]}
            </p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="apoiadores-search"
            type="text"
            placeholder="Buscar por nome, cidade, telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <select
          id="apoiadores-filter-status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Status | "todos")}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          <option value="todos">Todos os status</option>
          <option value="novo">Novos</option>
          <option value="contatado">Contatados</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
        </select>
        <select
          id="apoiadores-filter-help"
          value={filterHowHelp}
          onChange={(e) => setFilterHowHelp(e.target.value as HowHelp | "todos")}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          <option value="todos">Como quer ajudar</option>
          <option value="divulgacao">Divulgação</option>
          <option value="evento">Eventos</option>
          <option value="doacao">Doação</option>
          <option value="voluntario">Voluntário</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Layout principal: lista + detalhe */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Tabela / Lista */}
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
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                      {apoiador.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
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

                    {/* Data + WhatsApp */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-400">
                        {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(apoiador.created_at))}
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

          {/* Rodapé */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 text-right">
              {filtered.length} de {apoiadores.length} apoiadores
            </div>
          )}
        </div>

        {/* Painel de detalhe */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit sticky top-6">
          {!selectedApoiador ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 px-6 text-center">
              <Users size={36} className="mb-3 opacity-30" />
              <p className="font-medium text-sm">Selecione um apoiador</p>
              <p className="text-xs mt-1">Clique em um item da lista para ver os detalhes</p>
            </div>
          ) : (
            <div className="p-6 space-y-5">
              {/* Header do detalhe */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                    {selectedApoiador.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
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

              {/* Dados */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-slate-400 flex-shrink-0" />
                  <a
                    href={`tel:${selectedApoiador.phone}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-accent-600 transition-colors"
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
                  <span className="text-slate-700 dark:text-slate-300">
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
                    <span className="text-slate-700 dark:text-slate-300">
                      {HOW_HELP_CONFIG[selectedApoiador.how_help].label}
                    </span>
                  </div>
                )}
              </div>

              {/* Autorizações */}
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

              {/* Status */}
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Status
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
                            ? `${Cfg.color} border-current opacity-100`
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

              {/* Nota interna */}
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <StickyNote size={12} />
                  Nota interna
                </p>
                <textarea
                  id="apoiador-note-textarea"
                  rows={3}
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                  placeholder="Adicione observações sobre este apoiador..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />
                <button
                  id="apoiador-save-note-btn"
                  onClick={() => saveNote(selectedApoiador.id)}
                  disabled={savingNote}
                  className="mt-2 w-full py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-medium transition-colors disabled:opacity-60"
                >
                  {savingNote ? "Salvando..." : "Salvar nota"}
                </button>
              </div>

              {/* Botão WhatsApp */}
              <a
                href={generateWhatsAppUrl(
                  selectedApoiador.phone,
                  `Olá ${selectedApoiador.name.split(" ")[0]}! Aqui é a equipe do Brivaldo Marques. Vimos seu cadastro como apoiador e gostaríamos de conversar com você. 😊`
                )}
                target="_blank"
                rel="noopener noreferrer"
                id="apoiador-detail-wpp-btn"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-green-500/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Abrir WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react'
import { supabase, getTasks } from '../lib/supabase'
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    critical: 0,
    completed: 0
  })
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    setLoading(true)
    try {
      const allTasks = await getTasks()
      setTasks(allTasks)

      // Calculate stats
      const today = allTasks.filter(t => {
        if (!t.data_prazo) return false
        const prazoDate = new Date(t.data_prazo).toDateString()
        const todayDate = new Date().toDateString()
        return prazoDate === todayDate
      }).length

      const pending = allTasks.filter(t => t.status !== 'concluido').length
      const critical = allTasks.filter(t => t.prioridade === 'critica').length
      const completed = allTasks.filter(t => t.status === 'concluido').length

      setStats({
        today,
        pending,
        critical,
        completed
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`bg-white rounded-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <Icon className="text-gray-400" size={32} />
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Boa tarde, Bia</h1>
        <p className="text-gray-600 mt-2">Foque no que precisa da sua atenção agora.</p>
      </div>

      {/* CTA BUTTON */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-8">
        + Nova Ação
      </button>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Clock}
          label="Para hoje"
          value={stats.today}
          color="border-blue-500"
        />
        <StatCard
          icon={AlertCircle}
          label="Pendências"
          value={stats.pending}
          color="border-orange-500"
        />
        <StatCard
          icon={AlertTriangle}
          label="Críticas"
          value={stats.critical}
          color="border-red-500"
        />
        <StatCard
          icon={CheckCircle}
          label="Concluídas"
          value={stats.completed}
          color="border-green-500"
        />
      </div>

      {/* MY DAY SECTION */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Meu Dia</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
            <p className="text-sm text-gray-600">Para hoje</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">❌</div>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pendências</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔥</div>
            <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
            <p className="text-sm text-gray-600">Críticas</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <p className="text-2xl font-bold text-gray-900">0h</p>
            <p className="text-sm text-gray-600">Tempo estimado</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-sm text-gray-600">Concluídas</p>
          </div>
        </div>
      </div>

      {/* CHECKLIST SECTION */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Checklist do Dia</h2>
        <div className="text-center text-gray-500 py-8">
          <p>✓ Nada pendente para hoje. Tudo em dia!</p>
        </div>
      </div>

      {/* QUICK SHORTCUTS */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Atalhos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors text-left">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-bold text-gray-900">Central de Operações</h3>
            <p className="text-sm text-gray-600">Gerenciar tarefas e projetos</p>
          </button>
          <button className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors text-left">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-bold text-gray-900">Pessoas</h3>
            <p className="text-sm text-gray-600">Gestão de equipe</p>
          </button>
        </div>
      </div>

      {/* RECENT TASKS */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tarefas Recentes</h2>
        <div className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
            >
              <div className={`w-1 h-8 rounded mr-3 ${
                task.prioridade === 'critica' ? 'bg-red-500' :
                task.prioridade === 'alta' ? 'bg-orange-500' :
                task.prioridade === 'media' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{task.titulo}</p>
                <p className="text-xs text-gray-600">{task.status}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                task.status === 'novo' ? 'bg-blue-100 text-blue-700' :
                task.status === 'a_fazer' ? 'bg-orange-100 text-orange-700' :
                task.status === 'em_andamento' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

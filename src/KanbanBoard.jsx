import { useState, useEffect } from 'react'
import { supabase, getTasks, updateTask } from '../lib/supabase'

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggedTask, setDraggedTask] = useState(null)

  const statuses = [
    { id: 'novo', label: 'Novo', color: 'bg-blue-50', borderColor: 'border-l-blue-500' },
    { id: 'a_fazer', label: 'A Fazer', color: 'bg-orange-50', borderColor: 'border-l-orange-500' },
    { id: 'em_andamento', label: 'Em Andamento', color: 'bg-purple-50', borderColor: 'border-l-purple-500' },
    { id: 'concluido', label: 'Concluído', color: 'bg-green-50', borderColor: 'border-l-green-500' }
  ]

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    setLoading(true)
    try {
      const allTasks = await getTasks()
      setTasks(allTasks)
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  function getTasksByStatus(status) {
    return tasks.filter(task => task.status === status)
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'critica':
        return 'border-red-500 bg-red-50'
      case 'alta':
        return 'border-orange-500 bg-orange-50'
      case 'media':
        return 'border-yellow-500 bg-yellow-50'
      default:
        return 'border-green-500 bg-green-50'
    }
  }

  function getPriorityLabel(priority) {
    switch (priority) {
      case 'critica':
        return '🔥 Crítica'
      case 'alta':
        return '⚠️ Alta'
      case 'media':
        return '📌 Média'
      default:
        return '✓ Baixa'
    }
  }

  async function handleDragEnd(task, newStatus) {
    if (newStatus !== task.status) {
      try {
        await updateTask(task.id, { status: newStatus })
        setTasks(tasks.map(t =>
          t.id === task.id ? { ...t, status: newStatus } : t
        ))
      } catch (error) {
        console.error('Error updating task:', error)
      }
    }
    setDraggedTask(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Central de Operações</h1>
        <p className="text-gray-600 mt-2">Acompanhe tarefas e processos por status</p>
      </div>

      {/* STATS BAR */}
      <div className="bg-white rounded-lg p-4 mb-6 flex gap-6 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">0</span>
          <span className="text-sm text-gray-600">Para hoje</span>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-red-600">8</span>
          <span className="text-sm text-gray-600">Críticas</span>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-orange-600">9</span>
          <span className="text-sm text-gray-600">Atrasadas</span>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-green-600">11</span>
          <span className="text-sm text-gray-600">Concluídas</span>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status.id} className="flex flex-col">
            {/* COLUMN HEADER */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {status.label}
              </h2>
              <p className="text-sm text-gray-600">
                {getTasksByStatus(status.id).length} tarefas
              </p>
            </div>

            {/* DROPPABLE AREA */}
            <div
              className={`flex-1 ${status.color} rounded-lg p-4 min-h-96 border-2 border-dashed border-gray-300 transition-all ${
                draggedTask && draggedTask.status !== status.id ? 'border-blue-400 bg-blue-50' : ''
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                e.currentTarget.classList.add('border-blue-400', 'bg-blue-50')
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
                if (draggedTask) {
                  handleDragEnd(draggedTask, status.id)
                }
              }}
            >
              <div className="space-y-3">
                {getTasksByStatus(status.id).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task)}
                    onDragEnd={() => setDraggedTask(null)}
                    className={`bg-white rounded-lg p-4 cursor-move hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(task.prioridade)} shadow-sm`}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">
                      {task.titulo}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      {task.descricao?.substring(0, 60)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {getPriorityLabel(task.prioridade)}
                      </span>
                      {task.data_prazo && (
                        <span className="text-xs text-gray-500">
                          {new Date(task.data_prazo).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {getTasksByStatus(status.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-sm">Nenhuma tarefa</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="mt-8 bg-white rounded-lg">
        <div className="border-b border-gray-200 flex">
          <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            📋 Quadro
          </button>
          <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
            👤 Minhas Tarefas
          </button>
          <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
            ⏰ Atrasadas
          </button>
          <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
            🚫 Bloqueadas
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AMBENG SGI</h1>
          <nav className="flex gap-4">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-2 rounded ${currentPage === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-500'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentPage('kanban')}
              className={`px-4 py-2 rounded ${currentPage === 'kanban' ? 'bg-blue-800' : 'hover:bg-blue-500'}`}
            >
              Kanban
            </button>
          </nav>
        </div>
      </header>

      {/* CONTEÃšDO */}
      <main className="max-w-7xl mx-auto p-6">
        {/* HOME */}
        {currentPage === 'home' && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">A</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">AMBENG SGI</h2>
            <p className="text-xl text-gray-600 mb-6">Sistema de GestÃ£o de SeguranÃ§a e SaÃºde do Trabalho</p>
            <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <p className="text-lg text-green-600 font-semibold">
                âœ… App Online e Funcionando!
              </p>
            </div>
            <p className="text-gray-600 mt-8">Use o menu acima para navegar entre as seÃ§Ãµes</p>
          </div>
        )}

        {/* DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Total de Empresas</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Pessoas Cadastradas</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Tarefas Ativas</p>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Obras em Andamento</p>
              <p className="text-3xl font-bold text-red-600">0</p>
            </div>
          </div>
        )}

        {/* KANBAN */}
        {currentPage === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4 text-blue-600">ðŸ“‹ A Fazer</h3>
              <div className="space-y-2">
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <p className="font-semibold">Tarefa 1</p>
                  <p className="text-sm text-gray-600">DescriÃ§Ã£o da tarefa</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4 text-yellow-600">âš¡ Em Progresso</h3>
              <div className="space-y-2">
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                  <p className="font-semibold">Tarefa 2</p>
                  <p className="text-sm text-gray-600">DescriÃ§Ã£o da tarefa</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4 text-green-600">âœ… ConcluÃ­do</h3>
              <div className="space-y-2">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <p className="font-semibold">Tarefa 3</p>
                  <p className="text-sm text-gray-600">DescriÃ§Ã£o da tarefa</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


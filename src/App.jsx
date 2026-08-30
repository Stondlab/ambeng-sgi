import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Dashboard from './components/Dashboard'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pages = [
    { id: 'dashboard', name: 'Painel', icon: '📊' },
    { id: 'kanban', name: 'Operações', icon: '🚀' },
    { id: 'sst', name: 'SST', icon: '🛡️' },
    { id: 'rh', name: 'RH', icon: '👥' }
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">AMBENG SGI SST</h1>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'kanban' && <KanbanBoard />}
        {currentPage === 'sst' && (
          <div className="p-6 text-center text-gray-500">
            <p>Página SST - Em desenvolvimento</p>
          </div>
        )}
        {currentPage === 'rh' && (
          <div className="p-6 text-center text-gray-500">
            <p>Página RH - Em desenvolvimento</p>
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-0">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setCurrentPage(page.id)
                setMobileMenuOpen(false)
              }}
              className={`p-4 text-center transition-colors ${
                currentPage === page.id
                  ? 'bg-blue-50 text-blue-600 border-t-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{page.icon}</div>
              <div className="text-xs font-medium">{page.name}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

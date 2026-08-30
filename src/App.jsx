import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function App() {
  const [currentPage, setCurrentPage] = useState('pessoas')
  const [pessoas, setPessoas] = useState([])
  const [receitas, setReceitas] = useState([])
  const [despesas, setDespesas] = useState([])
  const [loading, setLoading] = useState(true)

  // Buscar dados do Supabase
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Buscar Pessoas
      const { data: pessoasData } = await supabase
        .from('pessoas')
        .select('*')
      setPessoas(pessoasData || [])

      // Buscar Receitas
      const { data: receitasData } = await supabase
        .from('receitas')
        .select('*')
      setReceitas(receitasData || [])

      // Buscar Despesas
      const { data: despesasData } = await supabase
        .from('despesas')
        .select('*')
      setDespesas(despesasData || [])
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AMBENG SGI</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* SIDEBAR */}
        <div className="w-64 bg-white shadow-sm border-r">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setCurrentPage('pessoas')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                currentPage === 'pessoas'
                  ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>ðŸ‘¥</span> Pessoas
            </button>
            <button
              onClick={() => setCurrentPage('financeiro')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                currentPage === 'financeiro'
                  ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>ðŸ’°</span> Financeiro
            </button>
          </nav>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando dados...</p>
              </div>
            </div>
          ) : (
            <>
              {/* PESSOAS */}
              {currentPage === 'pessoas' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Pessoas</h2>
                    <p className="text-gray-600">GestÃ£o de colaboradores e funcionÃ¡rios</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Colaboradores</h3>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        + Adicionar
                      </button>
                    </div>

                    {pessoas.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Nenhuma pessoa cadastrada</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b">
                            <tr className="text-left text-gray-600 font-semibold">
                              <th className="pb-3">Nome</th>
                              <th className="pb-3">Email</th>
                              <th className="pb-3">FunÃ§Ã£o</th>
                              <th className="pb-3">Status</th>
                              <th className="pb-3">AÃ§Ãµes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pessoas.map(pessoa => (
                              <tr key={pessoa.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 font-medium">{pessoa.nome || 'N/A'}</td>
                                <td className="py-3 text-gray-600">{pessoa.email || 'N/A'}</td>
                                <td className="py-3 text-gray-600">{pessoa.funcao || 'N/A'}</td>
                                <td className="py-3">
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                    Ativo
                                  </span>
                                </td>
                                <td className="py-3">
                                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                                    Editar
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    Remover
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FINANCEIRO */}
              {currentPage === 'financeiro' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Financeiro</h2>
                    <p className="text-gray-600">Receitas, Despesas e Movimento Financeiro</p>
                  </div>

                  {/* CARDS DE RESUMO */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow p-6">
                      <p className="text-gray-600 text-sm mb-2">Total de Receitas</p>
                      <p className="text-3xl font-bold text-green-600">
                        R$ {receitas.reduce((sum, r) => sum + (r.valor || 0), 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{receitas.length} registros</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <p className="text-gray-600 text-sm mb-2">Total de Despesas</p>
                      <p className="text-3xl font-bold text-red-600">
                        R$ {despesas.reduce((sum, d) => sum + (d.valor || 0), 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{despesas.length} registros</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <p className="text-gray-600 text-sm mb-2">Saldo LÃ­quido</p>
                      <p className={`text-3xl font-bold ${
                        (receitas.reduce((sum, r) => sum + (r.valor || 0), 0) - 
                         despesas.reduce((sum, d) => sum + (d.valor || 0), 0)) >= 0
                          ? 'text-blue-600'
                          : 'text-red-600'
                      }`}>
                        R$ {(receitas.reduce((sum, r) => sum + (r.valor || 0), 0) - 
                            despesas.reduce((sum, d) => sum + (d.valor || 0), 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* RECEITAS */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Receitas</h3>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        + Adicionar Receita
                      </button>
                    </div>

                    {receitas.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Nenhuma receita cadastrada</p>
                    ) : (
                      <div className="space-y-2">
                        {receitas.map(receita => (
                          <div key={receita.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                            <div>
                              <p className="font-medium">{receita.descricao || 'Receita'}</p>
                              <p className="text-sm text-gray-600">{new Date(receita.data).toLocaleDateString()}</p>
                            </div>
                            <p className="text-green-600 font-bold">+ R$ {receita.valor?.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DESPESAS */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Despesas</h3>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        + Adicionar Despesa
                      </button>
                    </div>

                    {despesas.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Nenhuma despesa cadastrada</p>
                    ) : (
                      <div className="space-y-2">
                        {despesas.map(despesa => (
                          <div key={despesa.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                            <div>
                              <p className="font-medium">{despesa.descricao || 'Despesa'}</p>
                              <p className="text-sm text-gray-600">{new Date(despesa.data).toLocaleDateString()}</p>
                            </div>
                            <p className="text-red-600 font-bold">- R$ {despesa.valor?.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

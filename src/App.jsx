import './App.css'
 
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">AMBENG SGI</h1>
        <p className="text-center text-gray-600 mb-6">Sistema de Gestão de Segurança</p>
        <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center text-green-600">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            App Online ✅
          </div>
        </div>
      </div>
    </div>
  )
}

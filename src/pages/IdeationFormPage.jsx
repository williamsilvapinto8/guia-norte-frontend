import { useParams, useNavigate } from 'react-router-dom'
import IdeationForm from './IdeationForm'

export default function IdeationFormPage() {
    const { businessId } = useParams()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-blue-700">Guia Norte</h1>
                    <p className="text-xs text-gray-400">Formulário de Ideação</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-500 hover:text-blue-600 transition"
                >
                    ← Voltar ao Painel
                </button>
            </header>
            <IdeationForm businessId={businessId} />
        </div>
    )
}
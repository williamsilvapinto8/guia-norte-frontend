import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const STAGE_LABELS = {
    ideation: 'Ideação',
    plan: 'Plano de Negócios',
    mvp: 'MVP',
}

function cleanBold(text) {
    return text.split('**').join('')
}

function renderLine(line, index) {
    const cleaned = cleanBold(line)
    const isBoldTitle = line.startsWith('**') && line.endsWith('**')
    const isBullet = line.startsWith('* ') || line.startsWith('- ')
    const isNumbered = line.length > 2 && line[1] === '.' && line[2] === ' '

    if (isBoldTitle) {
        return (
            <h3 key={index} className="text-lg font-bold text-gray-800 mt-6 mb-2">
                {cleaned}
            </h3>
        )
    }

    if (isBullet) {
        return (
            <li key={index} className="text-gray-700 ml-4 mb-1 list-disc">
                {cleanBold(line.slice(2))}
            </li>
        )
    }

    if (isNumbered) {
        return (
            <li key={index} className="text-gray-700 ml-4 mb-1 list-decimal">
                {cleanBold(line.slice(3))}
            </li>
        )
    }

    return (
        <p key={index} className="text-gray-700 mb-2 leading-relaxed">
            {cleaned}
        </p>
    )
}

export default function Diagnosis() {
    const { businessId, stage } = useParams()
    const navigate = useNavigate()
    const [diagnosis, setDiagnosis] = useState(null)
    const [business, setBusiness] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [diagRes, businessRes] = await Promise.all([
                    api.get('/api/diagnoses/?business=' + businessId + '&diagnosis_type=' + stage),
                    api.get('/api/businesses/' + businessId + '/'),
                ])

                setBusiness(businessRes.data)

                const list = diagRes.data
                const done = list.find(d => d.status === 'done')
                setDiagnosis(done || null)

            } catch (err) {
                setError('Erro ao carregar diagnóstico.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [businessId, stage])

    const formatContent = (content) => {
        if (!content) return []
        return content.split('\n').filter(line => line.trim() !== '')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-blue-700">Guia Norte</h1>
                    <p className="text-xs text-gray-400">Painel do Empreendedor</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-500 hover:text-blue-600 transition"
                >
                    Voltar ao Painel
                </button>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && !diagnosis && (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">⏳</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            Diagnóstico ainda não disponível
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Preencha o formulário de {STAGE_LABELS[stage]} para gerar seu diagnóstico.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                            Voltar ao Painel
                        </button>
                    </div>
                )}

                {!loading && !error && diagnosis && (
                    <>
                        <div className="mb-6">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                Diagnóstico de {STAGE_LABELS[stage]}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800 mt-1">
                                {business?.name}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Gerado em {new Date(diagnosis.created_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit', month: 'long', year: 'numeric'
                                })}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="prose max-w-none">
                                {formatContent(diagnosis.content).map((line, index) => renderLine(line, index))}
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-400">
                                Diagnóstico gerado por IA · Modelo: {diagnosis.model_name || 'Guia Norte AI'} · Versão {diagnosis.diagnosis_version}
                            </p>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
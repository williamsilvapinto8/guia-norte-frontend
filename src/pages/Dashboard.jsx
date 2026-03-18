import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const STAGE_LABELS = {
    ideation: 'Ideação',
    plan: 'Plano de Negócios',
    mvp: 'MVP',
}

const STAGE_ORDER = ['ideation', 'plan', 'mvp']

function StageBar({ label, progress, isActive, isCompleted }) {
    return (
        <div className={`flex-1 p-3 rounded-lg border ${isActive ? 'border-blue-400 bg-blue-50' : isCompleted ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-semibold ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                    {label}
                </span>
                <span className={`text-xs font-bold ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                    {progress}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-1">
                {isCompleted && <span className="text-xs text-green-600 font-medium">Concluído ✓</span>}
                {isActive && progress === 0 && <span className="text-xs text-blue-500">Não iniciado</span>}
                {isActive && progress > 0 && progress < 100 && <span className="text-xs text-blue-500">Em andamento</span>}
                {!isActive && !isCompleted && <span className="text-xs text-gray-400">Aguardando</span>}
            </div>
        </div>
    )
}

function BusinessCard({ business, stageStatus, diagnoses, onViewDiagnosis, onFillForm }) {
    const currentStage = stageStatus?.current_stage || 'ideation'

    const getProgress = (stage) => {
        if (!stageStatus) return 0
        return stageStatus[`${stage}_progress`] || 0
    }

    const isStageCompleted = (stage) => {
        if (!stageStatus) return false
        return !!stageStatus[`${stage}_completed_at`]
    }

    const lastDiagnosis = diagnoses?.find(d => d.diagnosis_type === currentStage && d.status === 'done')

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{business.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {business.segment || 'Sem segmento'} · {business.city || 'Sem cidade'}{business.state ? `/${business.state}` : ''}
                    </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {STAGE_LABELS[currentStage] || currentStage}
                </span>
            </div>

            <div className="flex gap-2 mb-4">
                {STAGE_ORDER.map((stage) => (
                    <StageBar
                        key={stage}
                        label={STAGE_LABELS[stage]}
                        progress={getProgress(stage)}
                        isActive={currentStage === stage}
                        isCompleted={isStageCompleted(stage)}
                    />
                ))}
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => onViewDiagnosis(business.id, currentStage)}
                    disabled={!lastDiagnosis}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${lastDiagnosis
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {lastDiagnosis ? 'Ver Diagnóstico' : 'Diagnóstico Pendente'}
                </button>
                <button
                    onClick={() => onFillForm(business.id)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                >
                    Preencher Formulário
                </button>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [businesses, setBusinesses] = useState([])
    const [stageStatuses, setStageStatuses] = useState({})
    const [diagnoses, setDiagnoses] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [businessRes, stageRes, diagnosisRes] = await Promise.all([
                    api.get('/api/businesses/'),
                    api.get('/api/stage-status/'),
                    api.get('/api/diagnoses/'),
                ])

                setBusinesses(businessRes.data)

                const stageMap = {}
                stageRes.data.forEach(s => {
                    stageMap[s.business] = s
                })
                setStageStatuses(stageMap)

                const diagMap = {}
                diagnosisRes.data.forEach(d => {
                    if (!diagMap[d.business]) diagMap[d.business] = []
                    diagMap[d.business].push(d)
                })
                setDiagnoses(diagMap)

            } catch (err) {
                setError('Erro ao carregar dados. Tente novamente.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleViewDiagnosis = (businessId, stage) => {
        navigate(`/diagnosis/${businessId}/${stage}`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-blue-700">Guia Norte</h1>
                    <p className="text-xs text-gray-400">Painel do Empreendedor</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                    Sair
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Meus Negócios</h2>
                </div>

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

                {!loading && !error && businesses.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg font-medium">Nenhum negócio encontrado.</p>
                        <p className="text-sm mt-1">Você ainda não tem negócios cadastrados.</p>
                    </div>
                )}

                {!loading && !error && businesses.length > 0 && (
                    <div className="grid gap-4">
                        {businesses.map((business) => (
                            <BusinessCard
                                key={business.id}
                                business={business}
                                stageStatus={stageStatuses[business.id]}
                                diagnoses={diagnoses[business.id] || []}
                                onViewDiagnosis={handleViewDiagnosis}
                                onFillForm={(id) => navigate('/ideation/' + id)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
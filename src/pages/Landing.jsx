import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Landing() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '', // Nome do negócio
        segment: '',      // Segmento
        businessType: '', // Tipo de negócio (físico, online, híbrido)
        currentStage: '', // Fase atual do negócio (ideia, abertura, funcionamento)
        city: '',         // Cidade
        state: '',        // Estado
        hasCnpj: '',      // Possui CNPJ (sim, nao)
        revenueRange: '', // Faixa de faturamento
        // Campos de maturidade da ideia (q1_problema_definido, etc.)
        q1_problema_definido: '',
        q2_publico_definido: '',
        q3_pesquisa_concorrencia: '',
        q4_conversou_clientes: '',
        q5_estimativa_investimento: '',
        q6_precos_definidos: '',
        q7_plano_divulgacao: '',
        q8_testes_realizados: '',
        // Campos de resumo da ideia
        descricao_resumida_negocio: '',
        principal_produto_servico: '',
        maior_dificuldade_atual: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await api.post('https://n8n.cocrias.com.br/webhook/captura-inicial', {
                nome: form.name,
                email: form.email,
                telefone_whatsapp: form.phone,
                nome_negocio: form.businessName,
                segmento: form.segment,
                tipo_negocio: form.businessType,
                fase_atual_negocio: form.currentStage,
                cidade: form.city,
                estado: form.state,
                possui_cnpj: form.hasCnpj,
                faixa_faturamento: form.revenueRange,
                // Campos de maturidade da ideia
                q1_problema_definido: form.q1_problema_definido,
                q2_publico_definido: form.q2_publico_definido,
                q3_pesquisa_concorrencia: form.q3_pesquisa_concorrencia,
                q4_conversou_clientes: form.q4_conversou_clientes,
                q5_estimativa_investimento: form.q5_estimativa_investimento,
                q6_precos_definidos: form.q6_precos_definidos,
                q7_plano_divulgacao: form.q7_plano_divulgacao,
                q8_testes_realizados: form.q8_testes_realizados,
                // Campos de resumo da ideia
                descricao_resumida_negocio: form.descricao_resumida_negocio,
                principal_produto_servico: form.principal_produto_servico,
                maior_dificuldade_atual: form.maior_dificuldade_atual,
            })
            setSuccess(true)
        } catch (err) {
            setError('Erro ao enviar. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-700">Guia Norte</span>
                    <div className="hidden md:flex gap-6 text-sm text-gray-600">
                        <button onClick={() => scrollTo('como-funciona')} className="hover:text-blue-600 transition">Como funciona</button>
                        <button onClick={() => scrollTo('para-quem')} className="hover:text-blue-600 transition">Para quem é</button>
                        <button onClick={() => scrollTo('etapas')} className="hover:text-blue-600 transition">Etapas</button>
                        <button onClick={() => scrollTo('cadastro')} className="hover:text-blue-600 transition">Começar grátis</button>
                    </div>
                    <button
                        onClick={() => scrollTo('cadastro')}
                        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Quero começar
                    </button>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                        Ferramenta gratuita para empreendedores
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Sua ideia de negócio{' '}
                        <span className="text-blue-600">merece mais do que intuição.</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                        O que faz diferença não é apenas ter uma ideia — é quem executa e persiste com clareza.
                        O Guia Norte analisa sua ideia com inteligência artificial e te mostra o caminho.
                    </p>
                    <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
                        Diagnóstico personalizado. Pontos cegos. Próximos passos práticos. Em linguagem simples, sem jargão.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => scrollTo('cadastro')}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                        >
                            Quero meu diagnóstico grátis
                        </button>
                        <button
                            onClick={() => scrollTo('como-funciona')}
                            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition"
                        >
                            Como funciona →
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">100% gratuito · Sem cartão de crédito · Pronto em minutos</p>
                </div>
            </section>

            {/* ===== NÚMEROS ===== */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        ['60%', 'das empresas fecham antes dos 5 anos'],
                        ['3 etapas', 'para sair da ideia ao MVP'],
                        ['100% IA', 'diagnóstico personalizado por negócio'],
                        ['Gratuito', 'para começar sua jornada'],
                    ].map(([num, label]) => (
                        <div key={num}>
                            <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{num}</div>
                            <div className="text-sm text-gray-500">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== PROBLEMA ===== */}
            <section className="py-20 px-6 bg-gray-50" id="para-quem">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Você se identifica com algum destes cenários?
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            A maioria dos empreendedores começa empolgado e, sem direção clara, esbarra sempre nos mesmos obstáculos.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            ['🤔', 'O empreendedor de intuição', 'Tem uma boa ideia, mas não sabe se o mercado quer. Age na base do "acho que vai funcionar" e descobre os problemas depois de investir.'],
                            ['😰', 'O empreendedor travado', 'Sabe que tem potencial, mas não consegue dar o primeiro passo. Sempre parece faltar alguma informação para se sentir seguro.'],
                            ['📋', 'O empreendedor sem plano', 'Abre o negócio com energia, mas sem estrutura. O caixa aperta, os clientes não chegam como esperava e a saída parece cada vez mais distante.'],
                            ['🔄', 'O empreendedor em círculos', 'Já tentou antes e não funcionou. Sente que repete os mesmos erros porque nunca parou para entender o que estava faltando de verdade.'],
                        ].map(([emoji, title, desc]) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="text-3xl mb-3">{emoji}</div>
                                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 bg-blue-600 rounded-2xl p-8 text-white text-center">
                        <p className="text-xl font-semibold mb-2">
                            Se você se reconheceu em qualquer um desses cenários...
                        </p>
                        <p className="text-blue-100 mb-6">
                            O problema não é a ideia. É a falta de um processo claro para validá-la e estruturá-la. O Guia Norte existe exatamente para isso.
                        </p>
                        <button
                            onClick={() => scrollTo('cadastro')}
                            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
                        >
                            Quero meu diagnóstico grátis
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== COMO FUNCIONA ===== */}
            <section className="py-20 px-6 bg-white" id="como-funciona">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Como o Guia Norte funciona
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Sem consultoria cara. Sem curso longo. Uma ferramenta que analisa seu negócio e te devolve clareza na hora.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            ['01', 'Você responde o formulário', 'Perguntas objetivas sobre sua ideia, seu mercado e sua situação atual. Sem enrolação — focado no que a IA precisa saber para te ajudar de verdade.'],
                            ['02', 'A IA analisa sua ideia', 'Com base nas suas respostas, a inteligência artificial identifica pontos fortes, pontos cegos e riscos específicos do seu tipo de negócio e da sua região.'],
                            ['03', 'Você recebe seu diagnóstico', 'Um relatório personalizado em linguagem simples, com próximos passos práticos para sair da Ideação, estruturar um Plano e testar seu MVP.'],
                        ].map(([num, title, desc]) => (
                            <div key={num} className="text-center">
                                <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {num}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2 text-lg">{title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ETAPAS ===== */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50" id="etapas">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Três etapas para um negócio sólido
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Abrir um negócio é importante. Mantê-lo aberto e próspero ao longo do tempo é o que realmente importa.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {[
                            ['💡', 'Ideação', 'Analise se sua ideia tem potencial de mercado. Descubra o que ainda está em aberto e receba um plano de ação para estruturar sua ideia antes de investir um centavo.', 'Disponível grátis'],
                            ['📊', 'Plano de Negócios Simplificado', 'Com a ideia validada, estruture mercado, concorrência, portfólio, operação e finanças. Saiba se seu plano é coerente antes de colocar tudo em risco.', 'Em breve'],
                            ['🚀', 'MVP — Experimento de Validação', 'Antes de abrir as portas, teste. Desenhe um experimento pequeno e controlado para validar se os clientes realmente compram do jeito que você planeja.', 'Em breve'],
                        ].map(([emoji, title, desc, badge]) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex gap-5 items-start">
                                <div className="text-4xl mt-1">{emoji}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
                                        <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${badge === 'Disponível grátis' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {badge}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROPÓSITO ===== */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-5xl mb-6">🧭</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Por que o Guia Norte existe
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        Acreditamos que uma boa ideia nas mãos certas pode mudar a vida de uma família, de um bairro, de uma comunidade.
                        Mas a realidade é dura: a maioria dos pequenos negócios fecha não por falta de dedicação — mas por falta de direção.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        A cada empreendedor que conseguimos ajudar a estruturar melhor a sua ideia, aumentamos as chances de que esse negócio
                        prospere. E um negócio próspero gera emprego, renda e impacto real.
                    </p>
                    <p className="text-xl font-semibold text-blue-700">
                        Isso é o que nos move. E é por isso que começamos de graça.
                    </p>
                </div>
            </section>

            {/* ===== ANTES / DEPOIS ===== */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        O que muda com o Guia Norte
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-8 border border-red-100">
                            <h3 className="font-bold text-red-600 mb-5 text-lg">Sem o Guia Norte</h3>
                            <ul className="space-y-3">
                                {[
                                    'Age por intuição e descobre os erros depois de investir',
                                    'Não sabe se o mercado quer o que está oferecendo',
                                    'Perde tempo e dinheiro em detalhes que não importam agora',
                                    'Não tem um processo claro para validar antes de abrir',
                                    'Aprende sozinho — na marra e com custo alto',
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                                        <span className="text-red-400 mt-0.5 font-bold">✗</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-green-100">
                            <h3 className="font-bold text-green-600 mb-5 text-lg">Com o Guia Norte</h3>
                            <ul className="space-y-3">
                                {[
                                    'Recebe um diagnóstico personalizado antes de investir',
                                    'Sabe exatamente quais pontos cegos precisam de atenção',
                                    'Foca nos próximos passos certos para o estágio atual',
                                    'Valida a ideia com um MVP antes de correr riscos maiores',
                                    'Tem um consultor digital disponível a qualquer hora',
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                                        <span className="text-green-500 mt-0.5 font-bold">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CADASTRO ===== */}
            <section className="py-20 px-6 bg-blue-700" id="cadastro">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                        Comece agora · É gratuito
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Sua ideia merece uma chance real.
                    </h2>
                    <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                        Preencha abaixo e nossa equipe vai te enviar o acesso para iniciar seu diagnóstico de Ideação.
                        Sem enrolação, sem cartão de crédito.
                    </p>

                    {success ? (
                        <div className="bg-white rounded-2xl p-10 text-center">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Recebemos seu cadastro!</h3>
                            <p className="text-gray-500 mb-6">
                                Em breve você vai receber um e-mail com o link para acessar a plataforma e iniciar seu diagnóstico de Ideação.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Já tenho conta — Fazer login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 text-left shadow-2xl shadow-blue-900/30">
                            {/* Bloco 1: Sobre você */}
                            <h3 className="text-xl font-bold text-gray-800 mb-4">1. Sobre você</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Seu nome *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Como você se chama?"
                                    value={form.name}
                                    onChange={e => set('name', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Seu melhor e-mail *</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="email@exemplo.com"
                                    value={form.email}
                                    onChange={e => set('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (opcional)</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="(00) 00000-0000"
                                    value={form.phone}
                                    onChange={e => set('phone', e.target.value)}
                                />
                            </div>

                            {/* Bloco 2: Sobre o seu negócio */}
                            <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">2. Sobre o seu negócio</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do seu negócio (pode ser provisório) *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Nome da sua ideia"
                                    value={form.businessName}
                                    onChange={e => set('businessName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Qual é o segmento do seu negócio? *</label>
                                <select
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    value={form.segment}
                                    onChange={e => set('segment', e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Comércio">Comércio (loja, mercado, roupas, etc.)</option>
                                    <option value="Serviços">Serviços (contabilidade, advocacia, estética, etc.)</option>
                                    <option value="Indústria/Oficina">Indústria/Oficina (marcenaria, esquadrias, etc.)</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Seu negócio será... *</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="businessType"
                                            value="fisico"
                                            checked={form.businessType === 'fisico'}
                                            onChange={e => set('businessType', e.target.value)}
                                            className="form-radio text-blue-600"
                                            required
                                        />
                                        <span className="ml-2 text-gray-700">Físico (loja, consultório, escritório)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="businessType"
                                            value="online"
                                            checked={form.businessType === 'online'}
                                            onChange={e => set('businessType', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Online</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="businessType"
                                            value="hibrido"
                                            checked={form.businessType === 'hibrido'}
                                            onChange={e => set('businessType', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Híbrido (físico + online)</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Em que fase seu negócio está hoje? *</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="currentStage"
                                            value="ideia"
                                            checked={form.currentStage === 'ideia'}
                                            onChange={e => set('currentStage', e.target.value)}
                                            className="form-radio text-blue-600"
                                            required
                                        />
                                        <span className="ml-2 text-gray-700">Só ideia (ainda não abriu)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="currentStage"
                                            value="abertura"
                                            checked={form.currentStage === 'abertura'}
                                            onChange={e => set('currentStage', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Em abertura (estruturação, reforma)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="currentStage"
                                            value="funcionamento"
                                            checked={form.currentStage === 'funcionamento'}
                                            onChange={e => set('currentStage', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Já em funcionamento</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade onde o negócio está (ou estará) *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Sua cidade"
                                    value={form.city}
                                    onChange={e => set('city', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Estado (UF) *</label>
                                <select
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    value={form.state}
                                    onChange={e => set('state', e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="PR">Paraná</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="BA">Bahia</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="Outro">Outro Estado</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Você já tem CNPJ para esse negócio? (opcional)</label>
                                <div className="space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="hasCnpj"
                                            value="sim"
                                            checked={form.hasCnpj === 'sim'}
                                            onChange={e => set('hasCnpj', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Sim</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="hasCnpj"
                                            value="nao"
                                            checked={form.hasCnpj === 'nao'}
                                            onChange={e => set('hasCnpj', e.target.value)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">Não</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Hoje o negócio fatura aproximadamente... (opcional)</label>
                                <select
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    value={form.revenueRange}
                                    onChange={e => set('revenueRange', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="ainda_nao_fatura">Ainda não fatura</option>
                                    <option value="ate_10k">Até R$ 10 mil/mês</option>
                                    <option value="10a30k">De R$ 10 a 30 mil/mês</option>
                                    <option value="acima_30k">Acima de R$ 30 mil/mês</option>
                                </select>
                            </div>

                            {/* Bloco 3: Maturidade da ideia */}
                            <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">3. Maturidade da ideia</h3>
                            {[
                                { id: 'q1_problema_definido', label: 'Você já definiu claramente qual problema do cliente o seu negócio resolve?' },
                                { id: 'q2_publico_definido', label: 'Você já sabe quem é o seu cliente ideal?' },
                                { id: 'q3_pesquisa_concorrencia', label: 'Você já pesquisou concorrentes na sua região?' },
                                { id: 'q4_conversou_clientes', label: 'Você já conversou com possíveis clientes sobre sua ideia?' },
                                { id: 'q5_estimativa_investimento', label: 'Você já tem uma estimativa de quanto precisa investir para começar?' },
                                { id: 'q6_precos_definidos', label: 'Você já tem ideia de quanto vai cobrar pelos seus produtos/serviços?' },
                                { id: 'q7_plano_divulgacao', label: 'Você já tem algum tipo de plano de divulgação e vendas?' },
                                { id: 'q8_testes_realizados', label: 'Você já testou sua ideia de alguma forma (pré‑venda, pesquisa, protótipo)?' },
                            ].map(question => (
                                <div className="mb-4" key={question.id}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">{question.label} *</label>
                                    <div className="space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="sim"
                                                checked={form[question.id] === 'sim'}
                                                onChange={e => set(question.id, e.target.value)}
                                                className="form-radio text-blue-600"
                                                required
                                            />
                                            <span className="ml-2 text-gray-700">Sim</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="nao"
                                                checked={form[question.id] === 'nao'}
                                                onChange={e => set(question.id, e.target.value)}
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2 text-gray-700">Não</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value="nao_sei"
                                                checked={form[question.id] === 'nao_sei'}
                                                onChange={e => set(question.id, e.target.value)}
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2 text-gray-700">Não sei responder</span>
                                        </label>
                                    </div>
                                </div>
                            ))}

                            {/* Bloco 4: Resumo da ideia */}
                            <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">4. Resumo da ideia</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Descreva em 1–2 frases o que é o seu negócio ou ideia. *</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Ex: Meu negócio é uma loja online de produtos artesanais para pets, focada em sustentabilidade."
                                    value={form.descricao_resumida_negocio}
                                    onChange={e => set('descricao_resumida_negocio', e.target.value)}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Qual é o principal produto ou serviço que você pretende oferecer? *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Ex: Coleiras personalizadas e brinquedos ecológicos."
                                    value={form.principal_produto_servico}
                                    onChange={e => set('principal_produto_servico', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Qual é a maior dificuldade que você sente hoje para tirar essa ideia do papel? (opcional)</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    placeholder="Ex: Não sei como validar se as pessoas realmente comprariam meus produtos."
                                    value={form.maior_dificuldade_atual}
                                    onChange={e => set('maior_dificuldade_atual', e.target.value)}
                                    rows="3"
                                ></textarea>
                            </div>


                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
                            >
                                {loading ? 'Enviando...' : 'Quero meu diagnóstico grátis →'}
                            </button>
                            <p className="text-xs text-gray-400 text-center mt-4">
                                Seus dados estão seguros. Nada de spam — prometemos.
                            </p>
                        </form>
                    )}
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Dúvidas frequentes</h2>
                    <div className="space-y-4">
                        {[
                            ['O diagnóstico é mesmo gratuito?', 'Sim. O diagnóstico de Ideação é 100% gratuito. Sem cartão de crédito, sem período de teste — você preenche o formulário e recebe o diagnóstico completo.'],
                            ['Preciso ter CNPJ para usar o Guia Norte?', 'Não. O Guia Norte foi feito especialmente para quem ainda está na fase de ideia. Você não precisa ter nenhuma empresa aberta — só precisa ter uma ideia de negócio.'],
                            ['Quanto tempo leva para receber o diagnóstico?', 'Depois de preencher o formulário de Ideação, o diagnóstico é gerado automaticamente em segundos pela inteligência artificial e fica disponível na sua área de acesso.'],
                            ['Para que tipo de negócio o Guia Norte funciona?', 'Para qualquer pequeno comércio ou serviço local: lojas, mercadinhos, clínicas, escritórios de serviços, oficinas, estética, alimentação e muito mais. Se você tem uma ideia de negócio, o Guia Norte pode te ajudar.'],
                            ['O que acontece depois do diagnóstico de Ideação?', 'Você terá acesso ao painel do Guia Norte, onde poderá avançar para as etapas de Plano de Negócios e MVP — com diagnósticos específicos para cada fase da jornada do seu negócio.'],
                        ].map(([q, a]) => (
                            <details key={q} className="group border border-gray-200 rounded-xl overflow-hidden">
                                <summary className="flex justify-between items-center px-6 py-4 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50 transition list-none">
                                    {q}
                                    <span className="ml-4 text-blue-600 text-xl transition group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                                    {a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="text-5xl mb-6">🧭</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Toda grande empresa começou como uma ideia.
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        A diferença está em quem persiste com clareza. Dê o primeiro passo com o diagnóstico certo.
                    </p>
                    <button
                        onClick={() => scrollTo('cadastro')}
                        className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-xl"
                    >
                        Quero meu diagnóstico grátis
                    </button>
                    <p className="text-blue-300 text-xs mt-4">100% gratuito · Sem cartão · Diagnóstico em minutos</p>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-gray-900 text-gray-400 py-10 px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <span className="text-white font-bold text-lg">Guia Norte</span>
                        <p className="text-xs mt-1">Consultoria digital para pequenos negócios</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <button onClick={() => navigate('/login')} className="hover:text-white transition">Login</button>
                        <button onClick={() => navigate('/register')} className="hover:text-white transition">Criar conta</button>
                    </div>
                    <p className="text-xs">© 2026 Guia Norte. Todos os direitos reservados.</p>
                </div>
            </footer>

        </div>
    )
}
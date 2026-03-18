import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const TOTAL_BLOCKS = 5

function ProgressBar({ current, total }) {
    const percent = Math.round((current / total) * 100)
    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Bloco {current} de {total}</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    )
}

export default function IdeationForm({ businessId }) {
    const navigate = useNavigate()
    const [block, setBlock] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        // Bloco 1 — Sobre o negócio
        nome_negocio: '',
        segmento: '',
        tipo_negocio: '',
        fase_atual_negocio: '',
        cidade: '',
        estado: '',
        possui_cnpj: '',
        faixa_faturamento: '',

        // Bloco 2 — Maturidade da ideia
        q1_problema_definido: '',
        q2_publico_definido: '',
        q3_pesquisa_concorrencia: '',
        q4_conversou_clientes: '',
        q5_estimativa_investimento: '',
        q6_precos_definidos: '',
        q7_plano_divulgacao: '',
        q8_testes_realizados: '',

        // Bloco 3 — Resumo + Contexto
        descricao_resumida_negocio: '',
        principal_produto_servico: '',
        maior_dificuldade_atual: '',
        problema_principal_cliente: '',
        solucao_proposta: '',
        cliente_ideal_descricao: '',
        ticket_medio_estimado: '',
        frequencia_compra_esperada: '',

        // Bloco 4 — Mercado, Portfólio e Custos
        percepcao_tamanho_mercado: '',
        qtd_concorrentes_diretos: '',
        principal_concorrente_referencia: '',
        diferencial_pretendido: '',
        pesquisa_mercado_tipo: '',
        qtd_itens_inicio_faixa: '',
        item1_nome: '',
        item1_tipo: '',
        item1_preco_estimado: '',
        item1_custo_estimado: '',
        item2_nome: '',
        item2_tipo: '',
        item2_preco_estimado: '',
        item2_custo_estimado: '',
        tipo_ponto_fisico: '',
        aluguel_mensal_valor: '',
        qtd_pessoas_inicio: '',
        custo_salarios_faixa: '',
        custos_fixos_itens: [],
        investimento_marketing_faixa: '',
        investimento_inicial_faixa: '',

        // Bloco 5 — Percepção do empreendedor
        confianca_ideia_nota: '',
        riscos_percebidos: [],
        objetivo_12_meses: '',
        duvida_especifica_diagnostico: '',
    })

    const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const toggleCheck = (field, value) => {
        setForm(prev => {
            const arr = prev[field]
            return {
                ...prev,
                [field]: arr.includes(value)
                    ? arr.filter(v => v !== value)
                    : [...arr, value],
            }
        })
    }

    const radioGroup = (field, options) => (
        <div className="flex flex-col gap-2 mt-1">
            {options.map(([val, label]) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                        type="radio"
                        name={field}
                        value={val}
                        checked={form[field] === val}
                        onChange={() => set(field, val)}
                        className="accent-blue-600"
                    />
                    {label}
                </label>
            ))}
        </div>
    )

    const checkGroup = (field, options) => (
        <div className="flex flex-col gap-2 mt-1">
            {options.map(([val, label]) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                        type="checkbox"
                        checked={form[field].includes(val)}
                        onChange={() => toggleCheck(field, val)}
                        className="accent-blue-600"
                    />
                    {label}
                </label>
            ))}
        </div>
    )

    const fieldClass = "border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
    const labelClass = "block text-sm font-medium text-gray-700 mb-1 mt-4"

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            const payload = {
                form_type: 'ideation',
                form_version: '1.0',
                data: {
                    dados_mestres_negocio: {
                        nome_negocio: form.nome_negocio,
                        segmento_atuacao: form.segmento,
                        tipo_negocio: form.tipo_negocio,
                        fase_atual_negocio: form.fase_atual_negocio,
                        cidade: form.cidade,
                        estado: form.estado,
                        possui_cnpj: form.possui_cnpj,
                        faixa_faturamento: form.faixa_faturamento,
                    },
                    maturidade_ideia: {
                        problema_definido: form.q1_problema_definido,
                        publico_definido: form.q2_publico_definido,
                        pesquisa_concorrencia: form.q3_pesquisa_concorrencia,
                        conversou_clientes: form.q4_conversou_clientes,
                        estimativa_investimento: form.q5_estimativa_investimento,
                        precos_definidos: form.q6_precos_definidos,
                        plano_divulgacao: form.q7_plano_divulgacao,
                        testes_realizados: form.q8_testes_realizados,
                    },
                    resumo_ideia: {
                        descricao_resumida_negocio: form.descricao_resumida_negocio,
                        principal_produto_servico: form.principal_produto_servico,
                        maior_dificuldade_atual: form.maior_dificuldade_atual,
                    },
                    diagnostico_bloco1_contexto_negocio: {
                        problema_principal_cliente: form.problema_principal_cliente,
                        solucao_proposta: form.solucao_proposta,
                        cliente_ideal_descricao: form.cliente_ideal_descricao,
                        ticket_medio_estimado: form.ticket_medio_estimado,
                        frequencia_compra_esperada: form.frequencia_compra_esperada,
                    },
                    diagnostico_bloco2_mercado_concorrencia: {
                        percepcao_tamanho_mercado: form.percepcao_tamanho_mercado,
                        qtd_concorrentes_diretos: form.qtd_concorrentes_diretos,
                        principal_concorrente_referencia: form.principal_concorrente_referencia,
                        diferencial_pretendido: form.diferencial_pretendido,
                        pesquisa_mercado_tipo: form.pesquisa_mercado_tipo,
                    },
                    diagnostico_bloco3_portfolio_precos: {
                        qtd_itens_inicio_faixa: form.qtd_itens_inicio_faixa,
                        item1: {
                            nome: form.item1_nome,
                            tipo: form.item1_tipo,
                            preco_estimado: form.item1_preco_estimado,
                            custo_estimado: form.item1_custo_estimado,
                        },
                        item2: {
                            nome: form.item2_nome,
                            tipo: form.item2_tipo,
                            preco_estimado: form.item2_preco_estimado,
                            custo_estimado: form.item2_custo_estimado,
                        },
                    },
                    diagnostico_bloco4_estrutura_custos: {
                        tipo_ponto_fisico: form.tipo_ponto_fisico,
                        aluguel_mensal_valor: form.aluguel_mensal_valor,
                        qtd_pessoas_inicio: form.qtd_pessoas_inicio,
                        custo_salarios_faixa: form.custo_salarios_faixa,
                        custos_fixos_itens: form.custos_fixos_itens,
                        investimento_marketing_faixa: form.investimento_marketing_faixa,
                        investimento_inicial_faixa: form.investimento_inicial_faixa,
                    },
                    diagnostico_bloco5_percepcao_empreendedor: {
                        confianca_ideia_nota: form.confianca_ideia_nota,
                        riscos_percebidos: form.riscos_percebidos,
                        objetivo_12_meses: form.objetivo_12_meses,
                        duvida_especifica_diagnostico: form.duvida_especifica_diagnostico,
                    },
                },
            }

            await api.post('/api/businesses/' + businessId + '/form-responses/', payload)
            setSuccess(true)
        } catch (err) {
            setError('Erro ao enviar formulário. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulário enviado com sucesso!</h2>
                <p className="text-gray-500 mb-6">
                    A IA está analisando suas respostas. Em breve seu diagnóstico estará disponível no painel.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Voltar ao Painel
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Formulário de Ideação</h2>
            <p className="text-sm text-gray-500 mb-6">Responda com calma — não precisa ser exato, é só uma estimativa.</p>

            <ProgressBar current={block} total={TOTAL_BLOCKS} />

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-4">
                    {error}
                </div>
            )}

            {/* ===== BLOCO 1 ===== */}
            {block === 1 && (
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Sobre o seu negócio</h3>

                    <label className={labelClass}>Nome do seu negócio (pode ser provisório) *</label>
                    <input className={fieldClass} value={form.nome_negocio} onChange={e => set('nome_negocio', e.target.value)} placeholder="Ex.: Mercadinho do Bairro" />

                    <label className={labelClass}>Qual é o segmento do seu negócio? *</label>
                    <select className={fieldClass} value={form.segmento} onChange={e => set('segmento', e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="comercio">Comércio (loja, mercado, roupas, etc.)</option>
                        <option value="servicos">Serviços (contabilidade, advocacia, estética, etc.)</option>
                        <option value="industria">Indústria/Oficina (marcenaria, esquadrias, etc.)</option>
                        <option value="outro">Outro</option>
                    </select>

                    <label className={labelClass}>Seu negócio será... *</label>
                    {radioGroup('tipo_negocio', [
                        ['physical', 'Físico (loja, consultório, escritório)'],
                        ['online', 'Online'],
                        ['hybrid', 'Híbrido (físico + online)'],
                    ])}

                    <label className={labelClass}>Em que fase seu negócio está hoje? *</label>
                    {radioGroup('fase_atual_negocio', [
                        ['ideation', 'Só ideia (ainda não abriu)'],
                        ['plan', 'Em abertura (estruturação, reforma)'],
                        ['operation', 'Já em funcionamento'],
                    ])}

                    <label className={labelClass}>Cidade onde o negócio está (ou estará) *</label>
                    <input className={fieldClass} value={form.cidade} onChange={e => set('cidade', e.target.value)} placeholder="Ex.: Porto Alegre" />

                    <label className={labelClass}>Estado (UF) *</label>
                    <select className={fieldClass} value={form.estado} onChange={e => set('estado', e.target.value)}>
                        <option value="">Selecione...</option>
                        {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>

                    <label className={labelClass}>Você já tem CNPJ para esse negócio?</label>
                    {radioGroup('possui_cnpj', [
                        ['sim', 'Sim'],
                        ['nao', 'Não'],
                    ])}

                    <label className={labelClass}>Hoje o negócio fatura aproximadamente...</label>
                    <select className={fieldClass} value={form.faixa_faturamento} onChange={e => set('faixa_faturamento', e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="ainda_nao_fatura">Ainda não fatura</option>
                        <option value="ate_10k">Até R$ 10 mil/mês</option>
                        <option value="10a30k">De R$ 10 a 30 mil/mês</option>
                        <option value="acima_30k">Acima de R$ 30 mil/mês</option>
                    </select>
                </div>
            )}

            {/* ===== BLOCO 2 ===== */}
            {block === 2 && (
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Maturidade da ideia</h3>
                    <p className="text-sm text-gray-500 mb-4">Responda com Sim, Não ou Não sei responder.</p>

                    {[
                        ['q1_problema_definido', 'Você já definiu claramente qual problema do cliente o seu negócio resolve?'],
                        ['q2_publico_definido', 'Você já sabe quem é o seu cliente ideal?'],
                        ['q3_pesquisa_concorrencia', 'Você já pesquisou concorrentes na sua região?'],
                        ['q4_conversou_clientes', 'Você já conversou com possíveis clientes sobre sua ideia?'],
                        ['q5_estimativa_investimento', 'Você já tem uma estimativa de quanto precisa investir para começar?'],
                        ['q6_precos_definidos', 'Você já tem ideia de quanto vai cobrar pelos seus produtos/serviços?'],
                        ['q7_plano_divulgacao', 'Você já tem algum tipo de plano de divulgação e vendas?'],
                        ['q8_testes_realizados', 'Você já testou sua ideia de alguma forma (pré-venda, pesquisa, protótipo)?'],
                    ].map(([field, question]) => (
                        <div key={field} className="mt-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{question} *</label>
                            {radioGroup(field, [
                                ['sim', 'Sim'],
                                ['nao', 'Não'],
                                ['nao_sei', 'Não sei responder'],
                            ])}
                        </div>
                    ))}
                </div>
            )}

            {/* ===== BLOCO 3 ===== */}
            {block === 3 && (
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Resumo da ideia e contexto do negócio</h3>

                    <label className={labelClass}>Descreva em 1–2 frases o que é o seu negócio ou ideia. *</label>
                    <textarea className={fieldClass} rows={3} value={form.descricao_resumida_negocio} onChange={e => set('descricao_resumida_negocio', e.target.value)} placeholder="Ex.: Um mercadinho focado em produtos frescos e atendimento personalizado." />

                    <label className={labelClass}>Qual é o principal produto ou serviço que você pretende oferecer? *</label>
                    <input className={fieldClass} value={form.principal_produto_servico} onChange={e => set('principal_produto_servico', e.target.value)} placeholder="Ex.: Cestas básicas e produtos de hortifrúti." />

                    <label className={labelClass}>Qual é a maior dificuldade que você sente hoje para tirar essa ideia do papel?</label>
                    <input className={fieldClass} value={form.maior_dificuldade_atual} onChange={e => set('maior_dificuldade_atual', e.target.value)} placeholder="Ex.: Conseguir capital inicial." />

                    <label className={labelClass}>Qual é o principal problema ou necessidade do cliente que seu negócio resolve? *</label>
                    <textarea className={fieldClass} rows={2} value={form.problema_principal_cliente} onChange={e => set('problema_principal_cliente', e.target.value)} />

                    <label className={labelClass}>Como, na prática, seu negócio pretende resolver esse problema? *</label>
                    <textarea className={fieldClass} rows={2} value={form.solucao_proposta} onChange={e => set('solucao_proposta', e.target.value)} />

                    <label className={labelClass}>Quem é o seu cliente ideal? (idade, renda, bairro, profissão…) *</label>
                    <textarea className={fieldClass} rows={2} value={form.cliente_ideal_descricao} onChange={e => set('cliente_ideal_descricao', e.target.value)} placeholder="Ex.: Famílias com crianças que valorizam conveniência." />

                    <label className={labelClass}>Em média, quanto você espera que cada cliente gaste por compra/serviço? (R$)</label>
                    <input className={fieldClass} type="number" value={form.ticket_medio_estimado} onChange={e => set('ticket_medio_estimado', e.target.value)} placeholder="Ex.: 150" />

                    <label className={labelClass}>Com que frequência você espera que um cliente compre de você?</label>
                    {radioGroup('frequencia_compra_esperada', [
                        ['uma_vez_so', 'Uma vez só (serviço pontual)'],
                        ['1_vez_ano', '1 vez por ano'],
                        ['1_vez_3a6_meses', '1 vez a cada 3–6 meses'],
                        ['1_vez_mes', '1 vez por mês'],
                        ['mais_1_vez_mes', 'Mais de 1 vez por mês'],
                    ])}
                </div>
            )}

            {/* ===== BLOCO 4 ===== */}
            {block === 4 && (
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Mercado, Portfólio e Estrutura de Custos</h3>

                    <label className={labelClass}>Na sua percepção, existe mercado suficiente na sua região? *</label>
                    {radioGroup('percepcao_tamanho_mercado', [
                        ['sim_com_folga', 'Sim, com folga'],
                        ['sim_concorrido', 'Sim, mas concorrido'],
                        ['nao_tenho_certeza', 'Não tenho certeza'],
                        ['nao_muito_nicho', 'Não, acho que é muito nicho'],
                    ])}

                    <label className={labelClass}>Quantos concorrentes diretos você estima que existam na sua região? *</label>
                    {radioGroup('qtd_concorrentes_diretos', [
                        ['nenhum', 'Nenhum'],
                        ['1a3', '1 a 3'],
                        ['4a10', '4 a 10'],
                        ['mais10', 'Mais de 10'],
                        ['nao_sei', 'Não sei dizer'],
                    ])}

                    <label className={labelClass}>Cite o principal concorrente ou referência na sua região.</label>
                    <input className={fieldClass} value={form.principal_concorrente_referencia} onChange={e => set('principal_concorrente_referencia', e.target.value)} />

                    <label className={labelClass}>O que você pretende fazer de diferente dos seus concorrentes? *</label>
                    <textarea className={fieldClass} rows={2} value={form.diferencial_pretendido} onChange={e => set('diferencial_pretendido', e.target.value)} />

                    <label className={labelClass}>Você já fez alguma pesquisa de mercado?</label>
                    {radioGroup('pesquisa_mercado_tipo', [
                        ['informal', 'Não, apenas percepções informais'],
                        ['conversas', 'Sim, conversei com clientes em potencial'],
                        ['questionario', 'Sim, fiz pesquisa com questionário'],
                        ['contratei', 'Sim, contratei alguém para isso'],
                    ])}

                    <div className="mt-6 border-t pt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Portfólio inicial</h4>

                        <label className={labelClass}>Produto/Serviço 1 — Nome *</label>
                        <input className={fieldClass} value={form.item1_nome} onChange={e => set('item1_nome', e.target.value)} />
                        <label className={labelClass}>Tipo *</label>
                        {radioGroup('item1_tipo', [['produto', 'Produto'], ['servico', 'Serviço']])}
                        <label className={labelClass}>Preço estimado de venda (R$) *</label>
                        <input className={fieldClass} type="number" value={form.item1_preco_estimado} onChange={e => set('item1_preco_estimado', e.target.value)} />
                        <label className={labelClass}>Custo aproximado por unidade (R$)</label>
                        <input className={fieldClass} type="number" value={form.item1_custo_estimado} onChange={e => set('item1_custo_estimado', e.target.value)} />

                        <label className={labelClass}>Produto/Serviço 2 — Nome (opcional)</label>
                        <input className={fieldClass} value={form.item2_nome} onChange={e => set('item2_nome', e.target.value)} />
                        <label className={labelClass}>Tipo</label>
                        {radioGroup('item2_tipo', [['produto', 'Produto'], ['servico', 'Serviço']])}
                        <label className={labelClass}>Preço estimado de venda (R$)</label>
                        <input className={fieldClass} type="number" value={form.item2_preco_estimado} onChange={e => set('item2_preco_estimado', e.target.value)} />
                        <label className={labelClass}>Custo aproximado por unidade (R$)</label>
                        <input className={fieldClass} type="number" value={form.item2_custo_estimado} onChange={e => set('item2_custo_estimado', e.target.value)} />
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Estrutura de Custos</h4>

                        <label className={labelClass}>Você terá ponto físico? *</label>
                        {radioGroup('tipo_ponto_fisico', [
                            ['online', 'Não, será totalmente online'],
                            ['alugado', 'Sim, ponto alugado'],
                            ['proprio', 'Sim, ponto próprio'],
                        ])}

                        <label className={labelClass}>Aluguel mensal estimado (R$)</label>
                        <input className={fieldClass} type="number" value={form.aluguel_mensal_valor} onChange={e => set('aluguel_mensal_valor', e.target.value)} />

                        <label className={labelClass}>Quantas pessoas vão trabalhar no negócio no início? *</label>
                        {radioGroup('qtd_pessoas_inicio', [
                            ['so_eu', 'Só eu'],
                            ['2a3', '2 a 3 pessoas'],
                            ['4a6', '4 a 6 pessoas'],
                            ['mais6', 'Mais de 6'],
                        ])}

                        <label className={labelClass}>Custo mensal com salários/ajuda de custo</label>
                        {radioGroup('custo_salarios_faixa', [
                            ['ate_3000', 'Até R$ 3.000'],
                            ['3001a10000', 'De R$ 3.001 a R$ 10.000'],
                            ['10001a30000', 'De R$ 10.001 a R$ 30.000'],
                            ['acima_30000', 'Acima de R$ 30.000'],
                        ])}

                        <label className={labelClass}>Quais custos fixos você terá todo mês?</label>
                        {checkGroup('custos_fixos_itens', [
                            ['agua', 'Água'],
                            ['luz', 'Luz'],
                            ['internet', 'Internet'],
                            ['sistemas', 'Sistemas/softwares'],
                            ['marketing', 'Marketing/Anúncios'],
                            ['contabilidade', 'Contabilidade'],
                        ])}

                        <label className={labelClass}>Investimento em marketing por mês</label>
                        {radioGroup('investimento_marketing_faixa', [
                            ['nada_quase', 'Nada / quase nada'],
                            ['ate_300', 'Até R$ 300'],
                            ['301a800', 'De R$ 301 a R$ 800'],
                            ['801a2000', 'De R$ 801 a R$ 2.000'],
                            ['acima_2000', 'Acima de R$ 2.000'],
                        ])}

                        <label className={labelClass}>Investimento inicial para começar *</label>
                        {radioGroup('investimento_inicial_faixa', [
                            ['ate_10000', 'Até R$ 10.000'],
                            ['10001a50000', 'De R$ 10.001 a R$ 50.000'],
                            ['50001a150000', 'De R$ 50.001 a R$ 150.000'],
                            ['acima_150000', 'Acima de R$ 150.000'],
                            ['nao_ideia', 'Ainda não tenho ideia'],
                        ])}
                    </div>
                </div>
            )}

            {/* ===== BLOCO 5 ===== */}
            {block === 5 && (
                <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Percepção do empreendedor</h3>

                    <label className={labelClass}>De 1 a 5, quão confiante você está hoje na sua ideia? *</label>
                    <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => set('confianca_ideia_nota', n)}
                                className={'w-12 h-12 rounded-full border-2 font-bold transition ' + (
                                    form.confianca_ideia_nota === n
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-gray-300 text-gray-600 hover:border-blue-400'
                                )}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                        <span>Muito inseguro</span>
                        <span>Muito confiante</span>
                    </div>

                    <label className={labelClass}>Quais são, na sua visão, os maiores riscos para o seu negócio?</label>
                    {checkGroup('riscos_percebidos', [
                        ['falta_clientes', 'Falta de clientes'],
                        ['concorrencia_forte', 'Concorrência forte'],
                        ['falta_dinheiro', 'Falta de dinheiro / fluxo de caixa'],
                        ['falta_experiencia', 'Falta de experiência em gestão'],
                        ['problemas_equipe', 'Problemas com equipe/mão de obra'],
                    ])}

                    <label className={labelClass}>Qual é o seu objetivo principal nos próximos 12 meses? *</label>
                    {radioGroup('objetivo_12_meses', [
                        ['tirar_ideia_papel', 'Tirar a ideia do papel e abrir as portas'],
                        ['pagar_contas', 'Atingir um faturamento que pague minhas contas'],
                        ['viver_100_do_negocio', 'Viver 100% desse negócio'],
                        ['crescer_expandir', 'Crescer e abrir mais unidades ou expandir'],
                    ])}

                    <label className={labelClass}>Existe alguma dúvida específica que você gostaria que o diagnóstico abordasse?</label>
                    <textarea className={fieldClass} rows={3} value={form.duvida_especifica_diagnostico} onChange={e => set('duvida_especifica_diagnostico', e.target.value)} placeholder="Opcional" />
                </div>
            )}

            {/* ===== NAVEGAÇÃO ===== */}
            <div className="flex justify-between mt-8">
                {block > 1 ? (
                    <button
                        onClick={() => setBlock(b => b - 1)}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                    >
                        Voltar
                    </button>
                ) : <div />}

                {block < TOTAL_BLOCKS ? (
                    <button
                        onClick={() => setBlock(b => b + 1)}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Próximo
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                    >
                        {loading ? 'Enviando...' : 'Enviar Diagnóstico'}
                    </button>
                )}
            </div>
        </div>
    )
}
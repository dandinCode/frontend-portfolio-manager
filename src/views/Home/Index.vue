<template>
    <div class="home-container">
        <section class="hero-section">
            <v-container fluid class="hero-content">
                <v-row class="fill-height align-center justify-center text-center">
                    <v-col cols="12" md="10" lg="8">
                        <div class="logo-wrapper">
                            <img src="@/assets/talos_logo.png" alt="Talos" class="hero-logo" />
                            <h1 class="hero-title">
                                <span class="title-accent">Talos</span>
                            </h1>
                        </div>
                        <p class="hero-description">
                            Uma plataforma inteligente para criação e otimização de carteiras de investimento em ações
                            baseada em dados históricos, diversificação setorial e modelos matemáticos
                            de otimização.
                        </p>
                        <div class="hero-buttons">
                            <v-btn size="x-large" class="btn-primary" to="/dashboard">
                                <v-icon start>mdi-chart-line</v-icon>
                                Começar Agora
                            </v-btn>
                            
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="section about-section">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="section-header-left">
                            <span class="section-badge">Sobre o Talos</span>
                            <h2 class="section-title">O que é este projeto?</h2>
                        </div>
                        <div class="about-text">
                            <p>
                                Este sistema foi criado para auxiliar investidores na tomada de decisão
                                ao montar carteiras de investimento em ações. A proposta é simples:
                                permitir que o usuário selecione qualquer conjunto de ações e, a partir
                                disso, gerar uma carteira otimizada de acordo com critérios de risco,
                                retorno e diversificação.
                            </p>
                            <p class="mt-4">
                                Internamente, a plataforma utiliza uma API própria de otimização
                                (<strong>Portfolio Optimized API</strong>) que aplica técnicas de
                                <strong>programação linear</strong> para encontrar a melhor distribuição
                                possível de capital entre os ativos selecionados.
                            </p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="info-card">
                            <div class="info-card-header">
                                <v-icon size="28" color="#B99D75">mdi-database</v-icon>
                                <h3>Fontes de Dados</h3>
                            </div>
                            <p>
                                Os dados históricos de preços e retornos são obtidos automaticamente
                                através do Yahoo Finance, permitindo análises baseadas em informações
                                reais de mercado.
                            </p>
                            <div class="info-card-header mt-6">
                                <v-icon size="28" color="#B99D75">mdi-calendar-range</v-icon>
                                <h3>Período de Análise</h3>
                            </div>
                            <p>
                                O usuário pode definir o período histórico a ser analisado. Caso nenhuma
                                data seja informada, o sistema utiliza automaticamente os últimos
                                <strong>12 meses</strong> como base.
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="section how-section">
            <v-container>
                <div class="section-header-center">
                    <span class="section-badge gold">Processo</span>
                    <h2 class="section-title">Como funciona?</h2>
                    <p class="section-subtitle">Três passos para uma carteira otimizada</p>
                </div>
                <v-row>
                    <v-col cols="12" md="4" v-for="(step, index) in steps" :key="index">
                        <div class="step-card">
                            <div class="step-number">{{ index + 1 }}</div>
                            <h3 class="step-title">{{ step.title }}</h3>
                            <p class="step-description">{{ step.description }}</p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="section problems-section">
            <v-container>
                <div class="section-header-center">
                    <span class="section-badge">Desafios Superados</span>
                    <h2 class="section-title">Quais problemas o Talos resolve?</h2>
                    <p class="section-subtitle">
                        Investir sem estratégia pode custar caro. O Talos resolve os principais desafios de quem quer
                        montar uma
                        carteira inteligente.
                    </p>
                </div>
                <div class="problems-grid">
                    <div v-for="problem in problems" :key="problem.title" class="problem-card">
                        <div class="problem-icon">
                            <v-icon size="32" color="#B99D75">{{ problem.icon }}</v-icon>
                        </div>
                        <h3>{{ problem.title }}</h3>
                        <p>{{ problem.description }}</p>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="section disclaimer-section">
            <v-container>
                <div class="disclaimer-card">
                    <div class="disclaimer-header">
                        <v-icon size="32" color="#B99D75">mdi-shield-alert</v-icon>
                        <h2 class="section-title">O que este projeto NÃO é</h2>
                    </div>
                    <div class="disclaimer-list">
                        <div v-for="item in disclaimer" :key="item.title" class="disclaimer-item">
                            <v-icon size="20" color="#B99D75" class="disclaimer-icon">mdi-close-circle</v-icon>
                            <div>
                                <h4>{{ item.title }}</h4>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="section myth-section">
            <v-container>
                <div class="myth-content">
                    <div class="myth-text">
                        <span class="section-badge gold">Inspiração</span>
                        <h2 class="section-title">Por que Talos?</h2>
                        <p>
                            O nome <strong>Talos</strong> vem da mitologia grega. Talos era um gigante de bronze criado
                            para
                            proteger a ilha de Creta, circulando constantemente suas fronteiras para impedir invasões.
                        </p>
                        <p>
                            Assim como o guardião mitológico, o Talos foi criado para proteger e fortalecer seus
                            investimentos,
                            ajudando você a tomar decisões mais seguras, equilibradas e inteligentes.
                        </p>
                        <p class="myth-quote">
                            Com análise de risco, retorno e diversificação, o Talos atua como um sistema de defesa
                            estratégico
                            para sua carteira.
                        </p>
                    </div>
                    <div class="myth-icon">
                        <v-icon size="80" color="#B99D75">mdi-shield-crown</v-icon>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="section future-section">
            <v-container>
                <div class="future-card">
                    <div class="future-header">
                        <v-icon size="40" color="#B99D75">mdi-compass</v-icon>
                        <h2 class="section-title">Visão de Futuro</h2>
                    </div>
                    <p class="future-description">
                        O projeto está em constante evolução. Entre as ideias futuras estão a inclusão
                        de indicadores fundamentalistas, perfis de investimento pré-configurados e a
                        possibilidade de o usuário escolher quais critérios deseja considerar no
                        processo de otimização.
                    </p>
                </div>
            </v-container>
        </section>

        <footer class="footer-section">
            <v-container>
                <div class="footer-content">
                    <div class="footer-logo">
                        <img src="@/assets/talos_logo.png" alt="Talos" class="footer-logo-img" />
                        <span>Talos</span>
                    </div>
                    <div class="footer-text">
                        <p>
                            Baseado em pesquisa acadêmica sobre otimização de carteiras utilizando
                            programação linear.
                        </p>
                        <a href="https://repositorio.ufc.br/handle/riufc/82322" target="_blank" class="tcc-link">
                            📄 Leia o TCC completo
                        </a>
                    </div>
                    <div class="footer-copyright">
                        <p>&copy; {{ new Date().getFullYear() }} Talos. Todos os direitos reservados.</p>
                    </div>
                </div>
            </v-container>
        </footer>
    </div>
</template>

<script setup lang="ts">
const steps = [
    {
        title: 'Seleção de Ações',
        description: 'O usuário escolhe quais símbolos deseja analisar. Qualquer pessoa pode cadastrar ações, cabendo ao investidor decidir se deseja utilizá-las ou não.'
    },
    {
        title: 'Otimização Matemática',
        description: 'O modelo avalia retorno esperado, risco (volatilidade) e correlação entre ativos para gerar uma carteira eficiente.'
    },
    {
        title: 'Diversificação Inteligente',
        description: 'Além da diversificação entre ativos, o sistema também considera a diversificação por setor econômico, reduzindo exposição concentrada.'
    }
]

const problems = [
    {
        icon: 'mdi-alert-circle',
        title: 'Falta de direção',
        description: 'Muitos investidores não sabem quais ativos escolher ou como distribuir seu capital de forma eficiente.'
    },
    {
        icon: 'mdi-chart-line-variant',
        title: 'Decisões sem base',
        description: 'Escolher ações apenas por "achismo" ou hype pode gerar prejuízos e risco desnecessário.'
    },
    {
        icon: 'mdi-scale-balance',
        title: 'Desequilíbrio na carteira',
        description: 'Sem uma boa alocação, sua carteira pode ficar exposta demais a um único setor ou ativo.'
    },
    {
        icon: 'mdi-timer-sand',
        title: 'Falta de tempo',
        description: 'Analisar ativos, risco e retorno manualmente exige tempo e conhecimento técnico.'
    }
]

const disclaimer = [
    {
        title: 'Não é uma ferramenta de recomendação financeira',
        description: 'O sistema não indica compras ou vendas de ativos.'
    },
    {
        title: 'Não substitui um assessor de investimentos',
        description: 'As decisões finais devem sempre considerar contexto pessoal e orientação profissional.'
    },
    {
        title: 'Não garante retornos',
        description: 'Os resultados são baseados em modelos matemáticos e dados históricos.'
    }
]
</script>

<style scoped>
.home-container {
    background-color: #1C2D41;
    min-height: 100vh;
}

.home-container * {
    background-color: transparent;
}

.hero-section {
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: radial-gradient(circle at 70% 30%, rgba(185, 157, 117, 0.1) 0%, transparent 70%),
        linear-gradient(135deg, #1C2D41 0%, #14222f 100%);
}

.hero-content {
    padding: 40px 20px;
}

.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
}

.hero-logo {
    width: 70px;
    height: 70px;
    filter: drop-shadow(0 0 20px rgba(185, 157, 117, 0.3));
}

.hero-title {
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0;
}

.title-accent {
    background:  #B99D75;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255, 252, 239, 0.85);
    max-width: 800px;
    margin: 0 auto 32px;
}

.hero-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary {
    background:  #B99D75 !important;
    color: #1C2D41 !important;
    font-weight: 600;
    text-transform: none;
    padding: 12px 32px !important;
    border-radius: 48px !important;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(185, 157, 117, 0.3);
}

.btn-outline {
    border: 2px solid #B99D75 !important;
    color: #FFFCEF !important;
    text-transform: none;
    padding: 12px 32px !important;
    border-radius: 48px !important;
    transition: all 0.3s ease;
    background: transparent !important;
}

.btn-outline:hover {
    background: rgba(185, 157, 117, 0.1) !important;
    transform: translateY(-2px);
}

.section {
    padding: 80px 0;
    background-color: #1C2D41;
}

.section-badge {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #B99D75;
    margin-bottom: 12px;
}

.section-badge.gold {
    color: #B99D75;
}

.section-header-left {
    margin-bottom: 24px;
}

.section-header-center {
    text-align: center;
    margin-bottom: 48px;
}

.section-title {
    font-size: 36px;
    font-weight: 700;
    color: #FFFCEF;
    margin: 0 0 8px 0;
}

.section-subtitle {
    font-size: 18px;
    color: rgba(255, 252, 239, 0.7);
    max-width: 600px;
    margin: 0 auto;
}

.about-section {
    background-color: #1C2D41;
}

.about-text p {
    color: rgba(255, 252, 239, 0.85);
    line-height: 1.7;
    font-size: 16px;
}

.about-text strong {
    color: #B99D75;
}

.info-card {
    background: rgba(255, 252, 239, 0.03);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 24px;
    padding: 32px;
}

.info-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.info-card-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #FFFCEF;
    margin: 0;
}

.info-card p {
    color: rgba(255, 252, 239, 0.7);
    line-height: 1.6;
    margin: 0;
}

.how-section {
    background-color: #14222f;
}

.step-card {
    background: rgba(255, 252, 239, 0.03);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 24px;
    padding: 32px;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
}

.step-card:hover {
    transform: translateY(-8px);
    border-color: #B99D75;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.step-number {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #B99D75 0%, #9b835f 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #1C2D41;
    margin: 0 auto 24px;
}

.step-title {
    font-size: 20px;
    font-weight: 600;
    color: #FFFCEF;
    margin-bottom: 12px;
}

.step-description {
    color: rgba(255, 252, 239, 0.7);
    line-height: 1.6;
    font-size: 14px;
}

.problems-section {
    background-color: #1C2D41;
}

.problems-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 32px;
}

.problem-card {
    background: rgba(255, 252, 239, 0.03);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 20px;
    padding: 28px;
    text-align: center;
    transition: all 0.3s ease;
}

.problem-card:hover {
    border-color: #B99D75;
    transform: translateY(-4px);
}

.problem-icon {
    margin-bottom: 20px;
}

.problem-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #FFFCEF;
    margin-bottom: 12px;
}

.problem-card p {
    color: rgba(255, 252, 239, 0.7);
    font-size: 14px;
    line-height: 1.6;
}

.disclaimer-section {
    background-color: #14222f;
}

.disclaimer-card {
    background: rgba(185, 157, 117, 0.05);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 32px;
    padding: 48px;
}

.disclaimer-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.disclaimer-header .section-title {
    margin-bottom: 0;
}

.disclaimer-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.disclaimer-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
}

.disclaimer-icon {
    flex-shrink: 0;
    margin-top: 2px;
}

.disclaimer-item h4 {
    font-size: 16px;
    font-weight: 600;
    color: #FFFCEF;
    margin-bottom: 4px;
}

.disclaimer-item p {
    color: rgba(255, 252, 239, 0.6);
    font-size: 14px;
    margin: 0;
}

.myth-section {
    background-color: #1C2D41;
}

.myth-content {
    display: flex;
    align-items: center;
    gap: 60px;
    max-width: 1000px;
    margin: 0 auto;
}

.myth-text {
    flex: 1;
}

.myth-text p {
    color: rgba(255, 252, 239, 0.85);
    line-height: 1.7;
    margin-bottom: 20px;
}

.myth-text strong {
    color: #B99D75;
}

.myth-quote {
    font-style: italic;
    border-left: 3px solid #B99D75;
    padding-left: 20px;
    margin-top: 24px;
}

.myth-icon {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    background: rgba(185, 157, 117, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.future-section {
    background-color: #14222f;
}

.future-card {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    background: rgba(185, 157, 117, 0.03);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 32px;
    padding: 48px;
}

.future-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.future-header .section-title {
    margin-bottom: 0;
}

.future-description {
    font-size: 18px;
    line-height: 1.7;
    color: rgba(255, 252, 239, 0.85);
}

.footer-section {
    background-color: #0f1a24;
    border-top: 1px solid rgba(185, 157, 117, 0.1);
    padding: 48px 0 24px;
}

.footer-content {
    text-align: center;
}

.footer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
}

.footer-logo-img {
    width: 32px;
    height: 32px;
}

.footer-logo span {
    font-size: 20px;
    font-weight: 600;
    color: #FFFCEF;
}

.footer-text p {
    color: rgba(255, 252, 239, 0.6);
    font-size: 14px;
    margin-bottom: 12px;
}

.tcc-link {
    color: #B99D75;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}

.tcc-link:hover {
    color: #e6d5b8;
    text-decoration: underline;
}

.footer-copyright {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(185, 157, 117, 0.1);
}

.footer-copyright p {
    color: rgba(255, 252, 239, 0.4);
    font-size: 12px;
    margin: 0;
}

@media (max-width: 960px) {
    .hero-title {
        font-size: 48px;
    }

    .hero-description {
        font-size: 16px;
    }

    .section-title {
        font-size: 28px;
    }

    .myth-content {
        flex-direction: column;
        text-align: center;
        gap: 32px;
    }

    .myth-quote {
        text-align: left;
    }

    .disclaimer-card {
        padding: 32px 24px;
    }

    .future-card {
        padding: 32px 24px;
    }
}

@media (max-width: 600px) {
    .hero-title {
        font-size: 36px;
    }

    .hero-logo {
        width: 50px;
        height: 50px;
    }

    .section {
        padding: 48px 0;
    }

    .section-title {
        font-size: 24px;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .hero-buttons .v-btn {
        width: 100%;
        max-width: 280px;
    }

    .step-card {
        padding: 24px;
    }

    .problems-grid {
        grid-template-columns: 1fr;
    }
}
</style>
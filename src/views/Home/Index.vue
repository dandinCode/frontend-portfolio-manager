<template>
    <v-container fluid class="home-hero">
        <v-row class="fill-height align-center justify-center text-center">
            <v-col cols="12" md="10" lg="8">
                <h1 class="display-2 font-weight-bold mb-6 text-white glow">
                    Portfolio Manager
                </h1>
                <p class="text-h6 text-grey-lighten-2 mb-10">
                    Uma plataforma inteligente para criação e otimização de carteiras de investimento em ações
                    baseada em dados históricos, diversificação setorial e modelos matemáticos
                    de otimização.
                </p>
                <v-btn size="x-large" color="blue-accent-3" class="mr-4" to="/run-model">
                    Começar Análise
                </v-btn>
                <v-btn size="x-large" variant="outlined" color="grey-lighten-2" to="/symbols">
                    Gerenciar Símbolos
                </v-btn>
            </v-col>
        </v-row>

        <v-container class="section">
            <v-row>
                <v-col cols="12" md="6">
                    <h2 class="text-h4 mb-4 text-white">O que é este projeto?</h2>
                    <p class="text-grey-lighten-2">
                        Este sistema foi criado para auxiliar investidores na tomada de decisão
                        ao montar carteiras de investimento em ações. A proposta é simples:
                        permitir que o usuário selecione qualquer conjunto de ações e, a partir
                        disso, gerar uma carteira otimizada de acordo com critérios de risco,
                        retorno e diversificação.
                    </p>
                    <p class="text-grey-lighten-2 mt-4">
                        Internamente, a plataforma utiliza uma API própria de otimização
                        (<strong>Portfolio Optimized API</strong>) que aplica técnicas de
                        <strong>programação linear</strong> para encontrar a melhor distribuição
                        possível de capital entre os ativos selecionados.
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="pa-6 glass-card" elevation="0">
                        <h3 class="text-h6 mb-2 section-title">Fontes de Dados</h3>
                        <p class="text-grey-lighten-1">
                            Os dados históricos de preços e retornos são obtidos automaticamente
                            através do Yahoo Finance, permitindo análises baseadas em informações
                            reais de mercado.
                        </p>
                        <h3 class="text-h6 mt-4 mb-2 section-title">Período de Análise</h3>
                        <p class="text-grey-lighten-1">
                            O usuário pode definir o período histórico a ser analisado. Caso nenhuma
                            data seja informada, o sistema utiliza automaticamente os últimos
                            <strong>12 meses</strong> como base.
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container class="section how-it-works">
            <h2 class="text-h4 text-center mb-12 text-white glow">
                Como funciona?
            </h2>
            <v-row align="stretch">
                <v-col cols="12" md="4">
                    <v-card class="how-card">
                        <h3 class="text-h6 font-weight-bold mb-3 text-white">1. Seleção de Ações</h3>
                        <p class="text-grey-lighten-1">
                            O usuário escolhe quais símbolos deseja analisar. Qualquer pessoa pode
                            cadastrar ações, cabendo ao investidor decidir se deseja utilizá-las
                            ou não.
                        </p>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="how-card">
                        <h3 class="text-h6 font-weight-bold mb-3 text-white">2. Otimização Matemática</h3>
                        <p class="text-grey-lighten-1">
                            O modelo avalia retorno esperado, risco (volatilidade) e correlação entre
                            ativos para gerar uma carteira eficiente.
                        </p>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="how-card">
                        <h3 class="text-h6 font-weight-bold mb-3 text-white">3. Diversificação Inteligente</h3>
                        <p class="text-grey-lighten-1">
                            Além da diversificação entre ativos, o sistema também considera a
                            diversificação por setor econômico, reduzindo exposição concentrada.
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container class="section text-center">
            <h2 class="text-h4 mb-4 text-white">O que este projeto NÃO é</h2>
            <v-list-item class="mb-2">
                <v-list-item-title class="text-white">
                    Não é uma ferramenta de recomendação financeira
                </v-list-item-title>
                <v-list-item-subtitle class="text-grey-lighten-1">
                    O sistema não indica compras ou vendas de ativos.
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item class="mb-2">
                <v-list-item-title class="text-white">
                    Não substitui um assessor de investimentos
                </v-list-item-title>
                <v-list-item-subtitle class="text-grey-lighten-1">
                    As decisões finais devem sempre considerar contexto pessoal e orientação profissional.
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title class="text-white">
                    Não garante retornos
                </v-list-item-title>
                <v-list-item-subtitle class="text-grey-lighten-1">
                    Os resultados são baseados em modelos matemáticos e dados históricos.
                </v-list-item-subtitle>
            </v-list-item>
        </v-container>

        <v-container class="section future-section">
            <h2 class="text-h4 text-center mb-12 text-white glow">
                Visão de Futuro
            </h2>
            <v-row justify="center" class="mb-8">
                <v-col cols="12" md="8">
                    <p class="text-center text-grey-lighten-2 future-description">
                        O projeto está em constante evolução. Entre as ideias futuras estão a inclusão
                        de indicadores fundamentalistas, perfis de investimento pré-configurados e a
                        possibilidade de o usuário escolher quais critérios deseja considerar no
                        processo de otimização.
                    </p>
                </v-col>
            </v-row>
        </v-container>

        <v-container class="section footer">
            <p class="text-grey-lighten-1 text-center">
                Baseado em pesquisa acadêmica sobre otimização de carteiras utilizando
                programação linear.
                <br />
                <a href="https://repositorio.ufc.br/handle/riufc/82322" target="_blank" class="tcc-link">
                    Leia o TCC completo
                </a>
            </p>
        </v-container>
    </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-hero {
    background: radial-gradient(circle at top, #1a237e, #0d1117);
    min-height: 100vh;
}

.darker {
    background: #0d1117;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
}

.glow {
    text-shadow: 0 0 20px rgba(79, 140, 255, 0.6);
}

.footer {
    padding-bottom: 120px;
}

.tcc-link {
    color: #4f8cff;
    text-decoration: none;
}

.tcc-link:hover {
    text-decoration: underline;
}

.section {
    padding: 100px 0;
}

.how-it-works {
    background: linear-gradient(180deg,
            rgba(13, 17, 23, 0) 0%,
            rgba(13, 17, 23, 0.4) 50%,
            rgba(13, 17, 23, 0) 100%);
}

.how-card {
    height: 100%;
    padding: 32px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: all 0.3s ease;
}

.how-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 30px rgba(79, 140, 255, 0.25);
    border-color: rgba(79, 140, 255, 0.4);
}

.section-title {
    font-weight: 600;
    color: #ffffff;
}

.future-description {
    font-size: 1.05rem;
    line-height: 1.7;
}
</style>

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
            <h3 class="text-h6 mb-2">Fontes de Dados</h3>
            <p class="text-grey-lighten-1">
              Os dados históricos de preços e retornos são obtidos automaticamente
              através do Yahoo Finance, permitindo análises baseadas em informações
              reais de mercado.
            </p>
            <h3 class="text-h6 mt-4 mb-2">Período de Análise</h3>
            <p class="text-grey-lighten-1">
              O usuário pode definir o período histórico a ser analisado. Caso nenhuma
              data seja informada, o sistema utiliza automaticamente os últimos
              <strong>12 meses</strong> como base.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="section darker">
      <h2 class="text-h4 text-center mb-10 text-white">Como funciona?</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-6 glass-card" elevation="0">
            <h3 class="text-h6 mb-2">1. Seleção de Ações</h3>
            <p class="text-grey-lighten-1">
              O usuário escolhe quais símbolos deseja analisar. Qualquer pessoa pode
              cadastrar ações, cabendo ao investidor decidir se deseja utilizá-las
              ou não.
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 glass-card" elevation="0">
            <h3 class="text-h6 mb-2">2. Otimização Matemática</h3>
            <p class="text-grey-lighten-1">
              O modelo avalia retorno esperado, risco (volatilidade) e correlação entre
              ativos para gerar uma carteira eficiente.
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6 glass-card" elevation="0">
            <h3 class="text-h6 mb-2">3. Diversificação Inteligente</h3>
            <p class="text-grey-lighten-1">
              Além da diversificação entre ativos, o sistema também considera a
              diversificação por setor econômico, reduzindo exposição concentrada.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="section">
      <h2 class="text-h4 mb-4 text-white">O que este projeto NÃO é</h2>
      <p class="text-grey-lighten-2">
        Este sistema não é uma ferramenta de recomendação financeira, não substitui
        um assessor de investimentos e não garante retornos. O objetivo é fornecer
        apoio quantitativo à decisão, permitindo que o usuário compreenda melhor
        possíveis cenários de alocação de ativos.
      </p>
    </v-container>

    <v-container class="section darker">
      <h2 class="text-h4 mb-4 text-white">Visão de Futuro</h2>
      <p class="text-grey-lighten-2">
        O projeto está em constante evolução. Entre as ideias futuras estão a inclusão
        de indicadores fundamentalistas, perfis de investimento pré-configurados e a
        possibilidade de o usuário escolher quais critérios deseja considerar no
        processo de otimização.
      </p>
    </v-container>

    <v-container class="section footer">
      <p class="text-grey-lighten-1 text-center">
        Baseado em pesquisa acadêmica sobre otimização de carteiras utilizando
        programação linear.
        <br />
        <a
          href="https://repositorio.ufc.br/handle/riufc/82322"
          target="_blank"
          class="tcc-link"
        >
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

.section {
  padding: 80px 0;
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
</style>

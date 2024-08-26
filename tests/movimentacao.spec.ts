import { test } from "@playwright/test"
import { MovimentacaoPage } from './support/pages/movimentacao'
import data from '.././tests/fixtures/movimentacao.json'
import { ModeloDeMovimentacao } from "./fixtures/modeloDeMovimentacao"
import { ModeloDelogin } from './fixtures/modeloDeLogin'
import { faker } from '@faker-js/faker';

let movimentacaoPage: MovimentacaoPage
const dados = data.sucesso as ModeloDeMovimentacao
const gerarConta = faker.word.noun()

test.beforeEach(async ({ page }) => {
    movimentacaoPage = new MovimentacaoPage(page)

    await movimentacaoPage.login(dados)
})
    
test('Acessar a página de Movimentações', async ({ page }) => {
    await movimentacaoPage.goToMovimentacoes()
    await movimentacaoPage.confirmarAcessoMovimentacoes()
})

test.only('Criar uma movimentação', async ({ page }) => {
    await movimentacaoPage.criarConta(gerarConta)
    await movimentacaoPage.acessarMovimentacoes()
    await movimentacaoPage.criarMovimentacaoSucesso(dados,gerarConta)
})
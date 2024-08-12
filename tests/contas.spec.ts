import { Page, test, chromium } from "@playwright/test";
import { ModeloDelogin } from './fixtures/modeloDeLogin'
import { ContasPage } from './support/pages/contas'
import data from './fixtures/contas.json'

let contasPage: ContasPage
const dados = data.sucesso as ModeloDelogin

test.beforeEach(async ({ page }) => {
    contasPage = new ContasPage(page)

    await contasPage.login(dados)
})

test('Acessar a página "Adicionar Contas"', async ({ page }) => {
    await contasPage.goToAddContas()
    await contasPage.confirmarAcessoAdicionarContas()
})

test('Criar conta', async ({ page }) => {
    await contasPage.acessarAdicionarContas()
    await contasPage.adicionarConta(dados)
    await contasPage.clicarBotaoAdicionar()
    await contasPage.confirmarContaCriada()
    await contasPage.deletarContaCriada()
})

test('Acessar a página "Listar Contas"', async ({ page }) => {
    await contasPage.goToListarContas()
    await contasPage.confirmarAcessoListarContas()
})

test('Deletar conta', async ({ page }) => {
    await contasPage.criarContaPraDeletar(dados)
    await contasPage.acessarListarContas()
    await contasPage.deletarConta()
    await contasPage.confirmarContaDeletada()
})

test('Editar uma conta', async ({ page }) => {
    await contasPage.criarContaPraEditar(dados)
    await contasPage.acessarListarContas()
    await contasPage.editarConta(dados)
    await contasPage.confirmarContaEditada()
    await contasPage.deletarContaPraEditar()
})
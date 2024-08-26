import { faker } from "@faker-js/faker"
import { Page, expect } from "@playwright/test"

export class MovimentacaoPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    //Esse bloco é apenas para realizar login na página:

    async login(data) {
        await this.go()
        await this.confirmarAcesso()
        await this.preencherEmail(data)
        await this.preencherSenha(data)
        await this.clicarBotao()
        await this.confirmaSucesso(data)
    }

    async go() {
        await this.page.goto('/')
    }

    async confirmarAcesso() {
        await expect(this.page).toHaveTitle('Seu Barriga - Log in')
    }

    async preencherEmail(data) {
        const inputEmail = this.page.locator('#email')
        await inputEmail.fill(data.email)
    }

    async preencherSenha(data) {
        const inputSenha = this.page.locator('#senha')
        await inputSenha.fill(data.senha)
    }

    async clicarBotao() {
        const entrarButton = this.page.locator('button[type="submit"]')
        await entrarButton.click()
    }

    async confirmaSucesso(data) {
        const loginConfirmation = this.page.locator('.alert')
        await expect(loginConfirmation).toHaveText(data.confirma)
    }

    //Aqui acaba o bloco de login

    //Esse bloco é voltado para criar as contas que participarão das movimentações

    async goToAddContas() {
        const menuContas = this.page.locator('.dropdown-toggle')
        await menuContas.click()
        const subMenuAdicionar = this.page.locator('a[href="/addConta"]')
        await subMenuAdicionar.click()
    }

    async confirmarAcessoAdicionarContas() {
        await expect(this.page).toHaveTitle('Seu Barriga - Adicionar Conta')
    }

    async adicionarConta(gerarConta) {        
        // const gerarConta = faker.word.noun()
        const inputNomeDaConta = this.page.locator('#nome')
        await inputNomeDaConta.fill(gerarConta)
    }

    async clicarBotaoAdicionar() {
        const botaoAdicionarConta = this.page.locator('.btn.btn-primary')
        await botaoAdicionarConta.click()
    }

    async confirmarContaCriada() {
        const mensagemContaCriada = this.page.locator('.alert')
        await expect(mensagemContaCriada).toHaveText('Conta adicionada com sucesso!')
    }

    async criarConta(gerarConta) {
        await this.goToAddContas()
        await this.confirmarAcessoAdicionarContas()
        await this.adicionarConta(gerarConta)
        await this.clicarBotaoAdicionar()
        await this.confirmarContaCriada()
    }

    //Aqui acaba o bloco de criação das contas das movimentações

    async goToMovimentacoes() {
        const menuMovimentacoes = this.page.locator('a[href="/movimentacao"]')
        await menuMovimentacoes.click()
    }

    async confirmarAcessoMovimentacoes() {
        await expect(this.page).toHaveTitle('Seu Barriga - Movimentações')
    }

    async acessarMovimentacoes() {
        await this.goToMovimentacoes()
        await this.confirmarAcessoMovimentacoes()
    }

    async selectDespesa() {
        const abaDeSelecao = this.page.locator('#tipo')
        await abaDeSelecao.click()
        await abaDeSelecao.selectOption({ label: 'Despesa' });
    }

    async selectReceita() {
        const abaDeSelecao = this.page.locator('#tipo')
        await abaDeSelecao.click()
        const itemDespesa = this.page.locator('option[value="REC"]')
        await itemDespesa.click()
    }

    async inserirDataMovimentacao(data) {
        const inputDataMovimentacao = this.page.locator('#data_transacao')
        await inputDataMovimentacao.fill(data.dataMovimentacao)
    }

    async inserirDataPagamento(data) {
        const inputDataPagamento = this.page.locator('#data_pagamento')
        await inputDataPagamento.fill(data.dataPagamento)
    }

    async inserirDescricao(data) {
        const inputDescricao = this.page.locator('#descricao')
        await inputDescricao.fill(data.descricao)
    }

    async inserirInteressado(data) {
        const inputInteressado = this.page.locator('#interessado')
        await inputInteressado.fill(data.interessado)
    }

    async inserirValor(data) {
        const inputValor = this.page.locator('#valor')
        await inputValor.fill(data.valor)
    }

    async selectConta(gerarConta) {
        const abaDaConta = this.page.locator('#conta')
        await abaDaConta.click()
        await abaDaConta.selectOption({ label: gerarConta });
    }

    async selectSituação() {
        const itemSituacaoPago = this.page.locator('input[value="1"]')
        await itemSituacaoPago.click()
    }

    async clicarBotaoCriarMovimentacao() {
        const botaoCriarMovimentacao = this.page.locator('.btn')
        await botaoCriarMovimentacao.click()
    }

    async criarMovimentacaoSucesso(data, gerarConta) {
        await this.selectDespesa()
        await this.inserirDataMovimentacao(data)
        await this.inserirDataPagamento(data)
        await this.inserirDescricao(data)
        await this.inserirInteressado(data)
        await this.inserirValor(data)
        await this.selectConta(gerarConta)
        await this.selectSituação()
        await this.clicarBotaoCriarMovimentacao()
    }

}
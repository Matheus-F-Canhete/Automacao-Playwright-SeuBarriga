import { Page, expect } from "@playwright/test"
import { ModeloDelogin } from "../../../fixtures/modeloDeLogin"
import data from '../../../fixtures/contas.json'

export class ContasPage {

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

    async goToAddContas() {
        const menuContas = this.page.locator('.dropdown-toggle')
        await menuContas.click()
        const subMenuAdicionar = this.page.locator('a[href="/addConta"]')
        await subMenuAdicionar.click()
    }

    async confirmarAcessoAdicionarContas() {
        await expect(this.page).toHaveTitle('Seu Barriga - Adicionar Conta')
    }

    async acessarAdicionarContas() {
        await this.goToAddContas()
        await this.confirmarAcessoAdicionarContas()
    }

    async adicionarConta(data) {
        const inputNomeDaConta = this.page.locator('#nome')
        await inputNomeDaConta.fill(data.nomeDeConta)
    }

    async adicionarContaPraDeletar(data) {
        const inputNomeDaConta = this.page.locator('#nome')
        await inputNomeDaConta.fill(data.nomeDeContaPraDeletar)
    }

    async adicionarContaPraEditar(data) {
        const inputNomeDaConta = this.page.locator('#nome')
        await inputNomeDaConta.fill(data.nomeDeContaPraEditar)
    }

    async clicarBotaoAdicionar() {
        const botaoAdicionarConta = this.page.locator('.btn.btn-primary')
        await botaoAdicionarConta.click()
    }

    async confirmarContaCriada() {
        const mensagemContaCriada = this.page.locator('.alert')
        await expect(mensagemContaCriada).toHaveText('Conta adicionada com sucesso!')
    }

    async goToListarContas() {
        const menuContas = this.page.locator('.dropdown-toggle')
        await menuContas.click()
        const subMenuListar = this.page.locator('a[href="/contas"]')
        await subMenuListar.click()
    }

    async confirmarAcessoListarContas() {
        await expect(this.page).toHaveTitle('Seu Barriga - Contas')
    }

    async acessarListarContas() {
        await this.goToListarContas()
        await this.confirmarAcessoListarContas()
    }

    async deletarConta() {
        const contaPraDeletar = this.page.locator('//td[text()="Água"]/following-sibling::td[1]//a[2]')
        await contaPraDeletar.click()
    }

    async deletarContaCriada() {
        await this.acessarListarContas()
        const contaPraDeletar = this.page.locator('//td[text()="Aluguel"]/following-sibling::td[1]//a[2]')
        await contaPraDeletar.click()
        await this.confirmarContaDeletada()
    }

    async confirmarContaDeletada() {
        const mensagemContaDeletada = this.page.locator('.alert')
        await expect(mensagemContaDeletada).toHaveText('Conta removida com sucesso!')
    }

    async criarContaPraDeletar(data) {
        await this.acessarAdicionarContas()
        await this.adicionarContaPraDeletar(data)
        await this.clicarBotaoAdicionar()
        await this.confirmarContaCriada()
    }

    async criarContaPraEditar(data) {
        await this.acessarAdicionarContas()
        await this.adicionarContaPraEditar(data)
        await this.clicarBotaoAdicionar()
        await this.confirmarContaCriada()
    }

    async editarConta(data) {
        const contaPraEditar = this.page.locator('//td[text()="Gás"]/following-sibling::td[1]//a[1]')
        await contaPraEditar.click()
        const campoPraEditar = this.page.locator('#nome')
        await campoPraEditar.fill(data.nomeDeContaEditada)
        const botaoEditar = this.page.locator('.btn.btn-primary')
        await botaoEditar.click()
    }

    async confirmarContaEditada() {
        const mensagemContaEditada = this.page.locator('.alert')
        await expect(mensagemContaEditada).toHaveText('Conta alterada com sucesso!')
    }

    async deletarContaPraEditar() {
        await this.acessarListarContas()
        const contaPraDeletar = this.page.locator('//td[text()="Mercado"]/following-sibling::td[1]//a[2]')
        await contaPraDeletar.click()
        await this.confirmarContaDeletada()
    }

}
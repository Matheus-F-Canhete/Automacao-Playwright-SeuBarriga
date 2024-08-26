/*Primeiro importamos o elemento page*/
import { Page, expect } from "@playwright/test"
import { ModeloDelogin } from "../../../fixtures/modeloDeLogin"
import dados from '../../../fixtures/login.json'

/*Essa classe criada representa a página de login*/
export class LoginPage {
    readonly page: Page

    /*Aqui o que acontece é o seguinte: através do "this" o construtor recebe */
    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/')
    }

    async confirmarAcesso() {
        await expect(this.page).toHaveTitle('Seu Barriga - Log in')
    }

    async preencherEmail(dados) {
        const inputEmail = this.page.locator('#email')
        await inputEmail.fill(dados.email)
    }

    async preencherSenha(dados) {
        const inputSenha = this.page.locator('#senha')
        await inputSenha.fill(dados.senha)
    }

    async clicarBotao() {
        const entrarButton = this.page.locator('button[type="submit"]')
        await entrarButton.click()
    }

    async confirmaSucesso(dados) {
        const loginConfirmation = this.page.locator('.alert')
        await expect(loginConfirmation).toHaveText(dados.confirma)
    }

    async login(dados) {
        await this.go()
        await this.preencherEmail(dados)
        await this.preencherSenha(dados)
        await this.clicarBotao()
        await this.confirmaSucesso(dados)
    }

    async clicarBotaoSair() {
        const botaoSair = this.page.locator('text=Sair')
        await botaoSair.click()
    }

    async confirmarLogout() {
        await expect(this.page).toHaveTitle('Seu Barriga - Log in')
    }
}
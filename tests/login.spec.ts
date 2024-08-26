//Primeiro, se importa os dados que serão utilizados no contexto page, referenciando seus contextos. Ou seja, o contexto page vai receber os dados de test e expect
import { test, expect } from '@playwright/test'
import { ModeloDelogin } from './fixtures/modeloDeLogin'
import data from './fixtures/login.json'
import { LoginPage } from './support/pages/login'

/*Para não ter que instanciar a pageobjects em todo teste, criamos uma variavel com o comando "let" e vamos informar que ela é do tipo da classe do page objects */
let loginPage: LoginPage


test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

/*Quando formos declarar uma função, é preciso declarar dentro de parênteses o contexto onde essa função será implementada, ou seja, nesse caso, o contexto é 'page' que é a página onde a função
 irá rodar.
 Além disso, o typescript é uma linguagem de programação assincrona e por isso é preciso declarar a assincronicidade e o método "await" que faz com que um step aguarde o outro step acabar*/
test('Website deve estar online', async ({ page }) => {
    //Quando vou determinar um passo do teste, primeiro preciso referenciar o contexto onde essa função irá rodar e declarar o que ela irá fazer
    await loginPage.go()
    //Nesse caso, estamos usando o método 'expect', que foi importado, para informar que o método espera que o contexto, ou seja a página, possua o dado title com o valor informado:
    await loginPage.confirmarAcesso()
})

test('Sucesso', async ({ page }) => {
    //Aqui instanciamos a massa de dados, informando o tipo a ser usada
    const dados = data.sucesso as ModeloDelogin
    /*Agora é só chamarmos a função utilizando a instância em que ela foi inserida*/
    await loginPage.go()
    await loginPage.preencherEmail(dados)
    await loginPage.preencherSenha(dados)
    await loginPage.clicarBotao()
    await loginPage.confirmaSucesso(dados)
})

test('Sem email', async ({ page }) => {
    const dados = data.semEmail as ModeloDelogin
    await loginPage.go()
    await loginPage.preencherSenha(dados)
    await loginPage.clicarBotao()
    await loginPage.confirmaSucesso(dados)
})

test('Sem senha', async ({ page }) => {
    const dados = data.semSenha as ModeloDelogin
    await loginPage.go()
    await loginPage.preencherEmail(dados)
    await loginPage.clicarBotao()
    await loginPage.confirmaSucesso(dados)
})

test('Email errado', async ({ page }) => {
    const dados = data.emailErrado as ModeloDelogin
    await loginPage.go()
    await loginPage.preencherEmail(dados)
    await loginPage.preencherSenha(dados)
    await loginPage.clicarBotao()
    await loginPage.confirmaSucesso(dados)
})

test('Senha errada', async ({ page }) => {
    const dados = data.senhaErrada as ModeloDelogin
    await loginPage.go()
    await loginPage.preencherEmail(dados)
    await loginPage.preencherSenha(dados)
    await loginPage.clicarBotao()
    await loginPage.confirmaSucesso(dados)
})

test("LogOut", async ({ page }) => {
    const dados = data.sucesso as ModeloDelogin
    await loginPage.login(dados)
    await loginPage.clicarBotaoSair()
    await loginPage.confirmarLogout()
})
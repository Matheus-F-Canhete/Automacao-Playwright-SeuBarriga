/*Nesse arquivo, estamos definindo a tipagem dos dados aceitos nos campos aos quais iremos atribuir o modelo "ModeloDeLogin". Isso significa que nesses campos só serão aceitos esses
 tipos de dados. E para usarmos nas outras páginas, precisamos exporta-los aqui e importa-los lá.*/
export interface ModeloDelogin {
    email: string
    senha: string
    confirma: string
    nomeDeConta: string
    nomeDeContaPraDeletar: string
    nomeDeContaPraEditar: string
    nomeDeContaEditada: string
}
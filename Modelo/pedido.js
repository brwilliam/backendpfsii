import PedidoDAO from "../Persistencia/pedidoDAO";

export default class Pedido{
    #IDPedido;
    #DataPedido;
    #ValorTotal;
    #restaurante; //é um objeto do tipo restaurante

    constructor(IDPedido=0,DataPedido="", ValorTotal=0, restaurante={}
                ){
        this.#IDPedido=IDPedido;
        this.#DataPedido=DataPedido;
        this.#ValorTotal=ValorTotal;
        this.#restaurante=restaurante;
    }

    get IDPedido(){
        return this.#IDPedido;
    }
    set IDPedido(novoCodigo){
        this.#IDPedido = novoCodigo;
    }

    get DataPedido(){
        return this.#DataPedido;
    }

    set DataPedido(novaDesc){
        this.#DataPedido=novaDesc;
    }

    get ValorTotal(){
        return this.#ValorTotal;
    }

    set ValorTotal(novoPreco){
        this.#ValorTotal = novoPreco
    }

    get restaurante(){
        return this.#restaurante;
    }

    set restaurante(novoRest){
        this.#restaurante = novoRest;
    }

    //override do método toJSON
    toJSON(){
        return {
            IDPedido:this.#IDPedido,
            DataPedido:this.#DataPedido,
            ValorTotal:this.#ValorTotal,
            restaurante:this.#restaurante
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const pedDAO = new PedidoDAO();
        await pedDAO.gravar(this);
     }
 
     async excluir(){
        const pedDAO = new PedidoDAO();
        await pedDAO.excluir(this);
     }
 
     async alterar(){
        const pedDAO = new PedidoDAO();
        await pedDAO.atualizar(this);
     }
 
     async consultar(termo){
        const pedDAO = new PedidoDAO();
        return await pedDAO.consultar(termo);
     }

}
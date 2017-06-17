import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

class TabelaLivros extends Component {

	render() {
    	return (
	        <div>            
	          <table className="pure-table">
	            <thead>
	              <tr>
	                <th>Código</th>
	                <th>Título</th>
	                <th>Preço</th>
	                <th>Código Autor</th>
	                <th>Nome Autor</th>
	                <th>Email Autor</th>
	              </tr>
	            </thead>
	            <tbody>
	              {
	                this.props.lista.map(function(livro){
	                  return (
	                    <tr key={livro.id}>
	                      <td>{livro.id}</td>
	                      <td>{livro.titulo}</td>
	                      <td>{livro.preco}</td>
	                      <td>{livro.autor.id}</td>
	                      <td>{livro.autor.nome}</td>
	                      <td>{livro.autor.email}</td>
	                    </tr>
	                  );
	                })
	              }
	            </tbody>
	          </table>
	        </div>
      	);
    }
}

export default class AutorBox extends Component {

  	constructor() {
		super();
    	this.state = {lista : []};
    }

  	componentDidMount() {
  		$.ajax({
		    url:'http://cdc-react.herokuapp.com/api/livros',
        	dataType: 'json',
        	success:function(resposta) {
           		this.setState({lista:resposta});
        	}.bind(this)
    	});

    	PubSub.subscriber('atualiza-lista-autores', function(topico, novaLista){
    		this.setState({lista: novaLista});
    	}.bind(this));
    }

	render(){
		return (
			<div>
	            <div className="header">
	              <h1>Cadastro de Autores</h1>
	            </div>
	            <div className="content" id="content">
					<TabelaLivros lista={this.state.lista}/>
				</div>
			</div>
		);
	}
}
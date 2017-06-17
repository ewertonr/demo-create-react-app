import PubSub from 'pubsub-js';

export default class TratadorErros {
	publicaErros(obj){
		for (var i = 0; i < obj.errors.length; i++) {
			var erro = obj.errors[i];
			PubSub.publish('erro-validacao', erro);
		}
	}
}

import React from 'react'
import countReducer from './countReducer'
import { useReducer } from 'react'

//EXERCICIO 4:
/* Neste exercício, você tem um App de contador no arquivo App.js.
O aplicativo deve gerenciar o estado da contagem por meio de botões para aumentar, diminuir e zerar a contagem.
Ao clicar em cada um dos botões do aplicativo, ele deverá se comportar da seguinte forma:
Botão de Aumentar: aumenta o contador em 1.
Botão Diminuir: diminui o contador em 1.
Botão Zerar: volta o contador para 0.
Sua tarefa é definir a lógica de state em uma função reducer colocada no arquivo counterReducer.js.
Faça do count uma variável state usando o hook useReducer.
* Você não precisa escrever nenhum import, todas os imports já são feitos na parte superior do arquivo App.js.

 */
const Exercico4 = () => {
  const [count, dispacth] = useReducer(countReducer, 0)

  return (
    <div>
      <div className="div">
        <button onClick={() => dispacth({ type: "add" })}>+</button>
        <h1>{count}</h1>
        <button onClick={() => dispacth({ type: "subtract" })}>-</button>
        <button onClick={() => dispacth({ type: "zerar" })}>ZERAR</button>

      </div>
    </div>
  )
}

export default Exercico4
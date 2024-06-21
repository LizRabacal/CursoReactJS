import { useState } from "react"
import React from 'react'

//EXERCICIO 3:

/* Neste exercício, a sua aplicação deverá realizar as seguintes ações:
- Quando o usuário pressionar o botão "enviar", você deverá exibir o nome completo dentro do elemento < span > reservado para isso.
- O nome completo deve ser formado pelo nome + espaço em branco(" ") + sobrenome.
 */


const Exercico3 = () => {
    const [fullName, setFullName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const handleName = () => {
        setFullName(firstName + " " + lastName);
        console.log(fullName);
    }
    const handleName2 = (e) => {
        e.preventDefault();
        const firstName = document.querySelector("input[name=firstName]").value;        
        const lastName = document.querySelector("input[name=lastName]").value;        
        setFullName(firstName + " " + lastName);
    }
    return (
        <>

            {/*     Jeito 1   */}
            <h1>Jeito 1</h1>


            <h1 style={{color: 'red'}} >{fullName && fullName}</h1>
            <div className="div">

                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="INSIRA SEU PRIMEIRO NOME" />
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="INSIRA SEU SOBRENOME" />
                <button type="submit" onClick={handleName}>Enviar</button>


            </div>

            {/*     Jeito 2   */}

            <h1>Jeito 2</h1>

            <h1>{fullName && fullName}</h1>
            <div className="div">

                <form onSubmit={(e) => handleName2(e)}>
                    <input type="text" name="firstName" placeholder="INSIRA SEU PRIMEIRO NOME" />
                    <input type="text" name="lastName" placeholder="INSIRA SEU SOBRENOME" />
                    <button type="submit" >Enviar</button>
                </form>

            </div>


        </>
    )
}

export default Exercico3
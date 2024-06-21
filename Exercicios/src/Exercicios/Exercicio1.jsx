
//EXERCICIO 1:

/*   Use o array de filmes para gerar uma tabela HTML com a lista de filmes. 
O cabeçalho da tabela já está feito, basta aplicar a renderização da lista na linha dentro do elemento < tbody >.
 */

export default function Exercicio1() {


    const movies = [
        {
            title: 'The Shawshank Redemption',
            year: 1994,
            rating: 4.7
        },
        {
            title: 'The Godfather',
            year: 1972,
            rating: 4.5
        },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
            rating: 4.4
        },
        {
            title: 'The Matrix',
            year: 1999,
            rating: 4.4
        },
    ];

    return (

        <>
            <table>


                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                {movies.map(m =>
                (<tbody>
                    <tr key={m.title}>
                        <td>{m.title}</td>
                        <td>{m.year}</td>
                        <td>{m.rating}</td>
                    </tr>

                </tbody>)
                )}
            </table>
        </>

    )
}

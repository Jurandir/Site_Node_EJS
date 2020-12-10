const formataListaNF = ( lista ) => {
    let resultado = lista
    // tira virgulas antes e depois da string
    if(resultado[0]==',') {
        resultado = `${resultado}`.substr(1)
    }
    pos = `${resultado}`.length-1
    if(resultado[pos]==',') {
        resultado = `${resultado}`.substr(0,pos)
    }
    // tira as virgulas juntas
    let str  = resultado.split(",,").join(",")
    while ( resultado!==str ) {
        resultado = str
        str       = resultado.split(",,").join(",")
    } 
    resultado = str
    return resultado
}


let x = ',9069648,9070753,,,9065172,,9065944,,,9065290,9065477,9068374,'
console.log('1',x)

let b = formataListaNF(x)
console.log('2',b)

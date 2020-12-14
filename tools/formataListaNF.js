const formataListaNF = ( lista ) => {
    let resultado = `${lista}`.trim()
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

module.exports = formataListaNF
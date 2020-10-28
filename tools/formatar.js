const fs = require('fs');

const ERPtoDT = function ( s_dt ) {
    return s_dt.substr(6,2) +'-'+s_dt.substr(4,2)+'-'+s_dt.substr(0,4) 
}

const NumberToReais = function (valor){
    var numero = (valor).toLocaleString('pt-BR')
    return 'R$ '+numero.replace(".", ";").replace(",", ".").replace(";", ",")
}

module.exports = { ERPtoDT, NumberToReais }

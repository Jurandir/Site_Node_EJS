let base64Str   =  retorno.comprovantes[0]                  // campo array recebido da API 
let path        = './downloads';                            // pasta local para realizar o download
let arq         = 'NovaImagem.png'                          // nome para ser dado ao baixar a imagem 
let buff        = new Buffer.from(base64Str, 'base64')      // converte formato Base64 em bytes
fs.writeFileSync(arq , buff)                                // grava arquivo em formato binario (PNG)


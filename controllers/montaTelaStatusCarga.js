const loadAPI =  require('../services/loadAPI')   /// async (method,endpoint,server,params)
const url_jsondoc = process.env.URL_JSONDOC
const url =  process.env.URL_POSICAOCARGA+'STATUS'

const montaTelaStatusCarga = async(req, res) => {
    const {NFE} = req.query

    let token = req.cookies.token
    let dados = await loadAPI('GET','',url_jsondoc,{ chaveNFe: NFE },token)
       
    dados.empresa   = req.session.empresa,
    dados.cnpj      = req.session.cnpj,
    dados.nfe       = NFE

    let parse = await parseDadosAPI(dados)

    let statusAPI = await loadAPI('GET','',url,{ ctrc: parse.conhecimento })
    parse.STATUS = statusAPI.dados.status

    console.log('parse:',parse)

    res.render('pages/statuscarga', parse)
}

function formataData(dt) {
    let ret = `${dt}`
    return ret.substr(8,2)+'-'+ret.substr(5,2)+'-'+ret.substr(0,4)
}

function formataDataHora(dt) {
    let ret = `${dt}`
    return ret.substr(8,2)+'-'+ret.substr(5,2)+'-'+ret.substr(0,4)+' - '+ret.substr(11,8)
}

function formataReais(vl) {
    if(vl==undefined) { vl = 0}
    let vlr = vl.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return vlr
}

async function montaHTMLocorrencias(ocorrencias) {
    let i = 0
    let ret = ''

    console.log('ocorrencias:',ocorrencias)

    for await (let e of ocorrencias ) {
        let descricaoOcorrencia = e.descricaoOcorrencia
        let dataRegistro        = formataDataHora( e.dataRegistro )
        ret = ret +`
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-3">
                <input type="text" readonly class="form-control" id="ocor_data${i}" value="${dataRegistro}" style="text-align: center; font-size: 12px;">
            </div>
            <div class="col-md-8">
                <input type="text" readonly class="form-control" id="ocor_desc${i}" value="${descricaoOcorrencia}" style="text-align: left; font-size: 12px;">
            </div>
        </div>
        `
    }
    return  encodeURI(ret)
}

async function parseDadosAPI(params) {
    const API_DADOS = params.dados
    console.log('API_DADOS:',API_DADOS)
    let ret = {
        empresa: empresa,
        conhecimento:        API_DADOS.conhecimento, 

        data_emissao:    formataData( API_DADOS.dataEmissao ),
        prev_entrega:    formataData( API_DADOS.prevEntrega ),
        val_mercadoria:  formataReais( API_DADOS.valorMercadoria ),
        val_frete:       formataReais( API_DADOS.valorFrete ),
        pesoM3:          API_DADOS.pesoM3,
        tipoPeso:        API_DADOS.tipoPesoM3,

        chave_ctrc:      API_DADOS.chave,
        origem_nome:     API_DADOS.origemPrestacao.nome,
        origem_uf:       API_DADOS.origemPrestacao.uf,
        origem_ibge:     API_DADOS.origemPrestacao.ibge,

        chave_nfe:       API_DADOS.notaFiscal.chaveNFe,
        nf_numero:       API_DADOS.notaFiscal.numero,
        nf_serie:        API_DADOS.notaFiscal.serie,
        nf_emissao:      formataData( API_DADOS.notaFiscal.dataEmissao ),
        nf_valor:        formataReais( API_DADOS.notaFiscal.valor ),

        ud_nome:         API_DADOS.unidadeDestino.sigla+' - '+API_DADOS.unidadeDestino.nome,
        ud_endereco:     API_DADOS.unidadeDestino.endereco+','+API_DADOS.unidadeDestino.numero+'/'+API_DADOS.unidadeDestino.bairro,
        ud_cidade:       API_DADOS.unidadeDestino.cidade.nome + ' - '+API_DADOS.unidadeDestino.cidade.uf,
        ud_ibge:         API_DADOS.unidadeDestino.cidade.ibge,

        dp_nome:         API_DADOS.destinoPrestacao.nome,
        dp_uf:           API_DADOS.destinoPrestacao.uf,
        dp_ibge:         API_DADOS.destinoPrestacao.ibge,

        le_nome:         API_DADOS.localEntrega.nome,
        le_endereco:     API_DADOS.localEntrega.endereco+','+API_DADOS.localEntrega.numero+'/'+API_DADOS.localEntrega.bairro,
        le_cidade:       API_DADOS.localEntrega.cidade.nome + ' - '+API_DADOS.localEntrega.cidade.uf,
        le_ibge:         API_DADOS.localEntrega.cidade.ibge,

        HTMLocorrencias: []
    }
    ret.HTMLocorrencias = await montaHTMLocorrencias(API_DADOS.ocorrencias)
    return ret
}



module.exports = montaTelaStatusCarga
"use strict";

((win,doc)=>{
    const tela       = "Status da Carga"
    const empresa    = 'EMPRESA EXEMPLO S/A'
    const ctrc       = 'XXX-X-999999'
    
    let itens        = doc.getElementById('itens')
    let nome_empresa = doc.getElementById('nome_empresa')
    let nome_tela    = doc.getElementById('nome_tela')
    let conhecimento = doc.getElementById('conhecimento')

    let data_emissao   = doc.getElementById('data_emissao')
    let prev_entrega   = doc.getElementById('prev_entrega')
    let val_mercadoria = doc.getElementById('val_mercadoria')
    let val_frete      = doc.getElementById('val_frete')
    let pesoM3         = doc.getElementById('pesoM3')
    let tipoPeso       = doc.getElementById('tipoPeso')

    let chave_ctrc     = doc.getElementById('chave_ctrc')
    let origem_nome    = doc.getElementById('origem_nome')
    let origem_uf      = doc.getElementById('origem_uf')
    let origem_ibge    = doc.getElementById('origem_ibge')

    let chave_nfe     = doc.getElementById('chave_nfe')
    let nf_numero     = doc.getElementById('nf_numero')
    let nf_serie      = doc.getElementById('nf_serie')
    let nf_emissao    = doc.getElementById('nf_emissao')
    let nf_valor      = doc.getElementById('nf_valor')

    let ud_nome       = doc.getElementById('ud_nome')
    let ud_endereco   = doc.getElementById('ud_endereco')
    let ud_cidade     = doc.getElementById('ud_cidade')
    let ud_ibge       = doc.getElementById('ud_ibge')

    let dp_nome       = doc.getElementById('dp_nome')
    let dp_uf         = doc.getElementById('dp_uf')
    let dp_ibge       = doc.getElementById('dp_ibge')

    let le_nome       = doc.getElementById('le_nome')
    let le_endereco   = doc.getElementById('le_endereco')
    let le_cidade     = doc.getElementById('le_cidade')
    let le_ibge       = doc.getElementById('le_ibge')
    
    nome_empresa.innerHTML = empresa
    nome_tela.innerHTML    = tela
    conhecimento.value     = ctrc

    data_emissao.value   = formataData( API_DADOS.dataEmissao )
    prev_entrega.value   = formataData( API_DADOS.prevEntrega )
    val_mercadoria.value = formataReais( API_DADOS.valorMercadoria )
    val_frete.value      = formataReais( API_DADOS.valorFrete )
    pesoM3.value         = API_DADOS.pesoM3
    tipoPeso.value       = API_DADOS.tipoPesoM3

    chave_ctrc.value     = API_DADOS.chave
    origem_nome.value    = API_DADOS.origemPrestacao.nome
    origem_uf.value      = API_DADOS.origemPrestacao.uf
    origem_ibge.value    = API_DADOS.origemPrestacao.ibge

    chave_nfe.value      = API_DADOS.notaFiscal.chaveNFe
    nf_numero.value      = API_DADOS.notaFiscal.numero
    nf_serie.value       = API_DADOS.notaFiscal.serie
    nf_emissao.value     = formataData( API_DADOS.notaFiscal.dataEmissao )
    nf_valor.value       = formataReais( API_DADOS.notaFiscal.valor )

    ud_nome.value        = API_DADOS.unidadeDestino.sigla+' - '+API_DADOS.unidadeDestino.nome
    ud_endereco.value    = API_DADOS.unidadeDestino.endereco+','+API_DADOS.unidadeDestino.numero+'/'+API_DADOS.unidadeDestino.bairro
    ud_cidade.value      = API_DADOS.unidadeDestino.cidade.nome + ' - '+API_DADOS.unidadeDestino.cidade.uf
    ud_ibge.value        = API_DADOS.unidadeDestino.cidade.ibge

    dp_nome.value        = API_DADOS.destinoPrestacao.nome
    dp_uf.value          = API_DADOS.destinoPrestacao.uf
    dp_ibge.value        = API_DADOS.destinoPrestacao.ibge

    le_nome.value        = API_DADOS.localEntrega.nome
    le_endereco.value    = API_DADOS.localEntrega.endereco+','+API_DADOS.localEntrega.numero+'/'+API_DADOS.localEntrega.bairro
    le_cidade.value      = API_DADOS.localEntrega.cidade.nome + ' - '+API_DADOS.localEntrega.cidade.uf
    le_ibge.value        = API_DADOS.localEntrega.cidade.ibge

    itens.innerHTML = ''

    API_DADOS.ocorrencias.forEach((e,i)=>{
        let descricaoOcorrencia = e.descricaoOcorrencia
        let dataRegistro        = formataDataHora( e.dataRegistro )
        itens.innerHTML = itens.innerHTML +`
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
    })

    function formataData(dt) {
        let ret = `${dt}`
        return ret.substr(8,2)+'-'+ret.substr(5,2)+'-'+ret.substr(0,4)
    }

    function formataDataHora(dt) {
        let ret = `${dt}`
        return ret.substr(8,2)+'-'+ret.substr(5,2)+'-'+ret.substr(0,4)+' - '+ret.substr(11,8)
    }
    
    function formataReais(vl) {
        let vlr = vl.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        return vlr
    }
    
})(window,document)



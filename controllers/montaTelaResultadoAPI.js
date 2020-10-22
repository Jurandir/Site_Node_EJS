const montaTelaResultadoAPI = (req, res) => {
    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    let res_json = JSON.stringify(req.session.res_json, null,"\t")

    res.render('pages/resultado', {
        empresa: req.session.empresa,
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3,
        texto: res_json
    })
}

module.exports = montaTelaResultadoAPI

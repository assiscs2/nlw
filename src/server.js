//Servidor
const express = require('express')
const server = express()
const { pageLanding, pageStudy, pageGiveClasses, saveClasses, createdClasses } = require('./pages')

//configurar nunjucks (Template Engine)

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Inicio e configuração do servidor
server

.use(express.urlencoded({extended: true}))
    //configurar arquivos estáticos (CSS, Scripts, imagens)
    .use(express.static("public"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/created-success", createdClasses)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)

    //Start do servidor (Porta)
    .listen(5500)



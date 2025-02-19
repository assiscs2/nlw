const Database = require('./database/db')
// const bodyParser = require('body-parser')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
// const { FileSystemLoader } = require('nunjucks')
const nunjucks = require('nunjucks')

function pageLanding(req, res) {
    return res.render(__dirname + "/views/index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
         return res.render(__dirname + "/views/study.html", { filters, subjects, weekdays })
    }

    //   console.log('não tem campos vazios')

    //converter horas em minutos 

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = ${filters.subject}
    `

    //caso haja erro na consulta do banco de datos

    try {
        const db = await Database
        const proffys = await db.all(query)

        return res.render('./study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res) {
    return res.render(__dirname + "/views/give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio

    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost

    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })


    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/created-success" + queryString)
        
    } catch (error) {
        console.log(error)
    }
}

function createdClasses(req, res) {
    return res.render(__dirname + "/views/created-success.html")
}
// function // (req, res) {
//     return res.render(__dirname + "/views/created-success.html")
// }

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    createdClasses
}
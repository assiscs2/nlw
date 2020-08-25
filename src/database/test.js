const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
// inserir dados
proffyValue = {
    name: 'Gustavo Assis',
    avatar: 'https://i.pinimg.com/564x/6c/20/a8/6c20a8cd088042ec5595e0776ab5d749.jpg',
    whatsapp: '(11)88877-6655',
    bio: 'otário com phd em ser trouxa'

}

classValue = {
    subject: 1, 
    cost: "20"
    // Proffy id é gerado pelo BD
}

classScheduleValues = [
    //class_id será gerado pelo BD
{
    weekday: 1,
    time_from: 720,
    time_to: 1220
},
{
    weekday: 0,
    time_from: 520,
    time_to: 1220
}
]

await createProffy(db, {proffyValue, classValue, classScheduleValues})

// consultar dados inseridos

// todos os proffys

const selectedProffys = await db.all("SELECT * FROM proffys")


// consultar as classes de um determinado professor e trazer os dados desse proffy

const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 6;
`)

//console.log(selectClassesAndProffys)

// o horário que a pessoa trabalha, é das 08h às 18hs
// o horário time_from (8H) precisa ser antes ou igual ao horário solitado
// o time_to precisa ser acima

const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "22"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "1300"
    AND class_schedule.time_to > "1300"
`)

//console.log(selectClassesSchedules)

// 

})
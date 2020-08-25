// const e = require("express")

//Procurar o botão
document.querySelector("#add-time")
    //Quando clicar no botão
    .addEventListener('click', cloneField)
//Executar uma ação


// Tentando impedir criação de novos horários se o anterior não foi preenchido
// function isEmpt (){
// 
//     fields.forEach(function (field) {
//         if (field.value = length > 0){
//             cloneField()
//         }
//         });
//     }

function cloneField() {
        //Duplicar os campos. que campos?
        const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(true) // boolean- true or false
        //limpar os campos. Que campos??
        const fields = newFieldsContainer.querySelectorAll('input')
        //Para cada campo, limpar.
        fields.forEach(function (field) {
            //Pega o field do momento e limpa ele
            field.value = ""     
        });   
//Colocar na página, onde??
document.querySelector('#schedule-items').appendChild(newFieldsContainer)          
    }

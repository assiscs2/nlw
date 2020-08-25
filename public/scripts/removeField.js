
document.querySelector("#remove-time")
.addEventListener('click', testeFunc)

function testeFunc() {
console.log('teste')
    //Duplicar os campos. que campos?
    const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(false) // boolean- true or false
     delete newFieldsContainer

    //Para cada campo, limpar.
}

// function deleteField() { 
//     const fieldRemover = document.querySelector('.schedule-item').removeAttributeNode(true) // boolean- true or false
//     //limpar os campos. Que campos??
//     const fields = fieldRemover.querySelectorAll('input')
// 
//     fields.forEach(function (field) {
//         //Pega o field do momento e limpa ele
//         field.value = ""
//     });
// 
// }
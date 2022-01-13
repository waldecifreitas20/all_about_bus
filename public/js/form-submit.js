const textTitle = document.querySelector('#title')
const textBody = document.querySelector('#textBody')
var title, body;
textTitle.addEventListener('keydown', () => {
    if (textTitle.value.length < 10) {
        title = textTitle.value 
    } else {
        textTitle.value = title
        alert('O título não pode conter mais que 10 caracteres!')
    }
})
textBody.addEventListener('keyup', () => {
    if (textBody.value.length < 500) {
        body = textBody.value 
    } else {
        textBody.value = body
        alert('O título não pode conter mais que 500 caracteres!')
    }
})


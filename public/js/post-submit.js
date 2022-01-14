const postTitle = document.querySelector('#title')
const postBody = document.querySelector('#textBody')
var title, body;

postTitle.addEventListener('keydown', () => {
    if (postTitle.value.length < 20) {
        title = postTitle.value 
    } else {
        postTitle.value = title
        alert('O título não pode conter mais que 10 caracteres!')
    }
})
postBody.addEventListener('keyup', () => {
    if (postBody.value.length < 500) {
        body = postBody.value 
    } else {
        postBody.value = body
        alert('O título não pode conter mais que 500 caracteres!')
    }
})

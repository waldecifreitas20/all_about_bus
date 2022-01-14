const btns_edit = document.querySelectorAll('.btn-edit')
const btns_delete = document.querySelectorAll('.btn-delete')

const user_id = document.getElementById('user_id').textContent
const input = document.createElement('input')

input.name = 'user_id'
input.type = 'hidden'
input.value = user_id


for (let i = 0; i < btns_edit.length; i++) {
    btns_edit[i].addEventListener('click', evt => {
        evt.preventDefault()
                
        const form_id = btns_edit[i].form.id
        const form_submit = document.getElementById(form_id)

        form_submit.action = "/users/post/edit"
        form_submit.appendChild(input)
        form_submit.submit()
    })    
}
for (let i = 0; i < btns_delete.length; i++) {
    btns_delete[i].addEventListener('click', evt => {
        evt.preventDefault()
               
        const form_id = btns_delete[i].form.id
        const form_submit = document.getElementById(form_id)

        form_submit.action = "/users/post/del"
        form_submit.appendChild(input)
        console.log(form_submit);
        form_submit.submit()
    })    
}


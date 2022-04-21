const modal = document.getElementById('modal')
// const openModal = document.getElementById('send')
const closeModal = document.getElementById('close-btn')
// const complainForm = document.forms["complain"]
const form = document.getElementById("complain")

form.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(form)
    const data = {
        Created: 'x-sheetmonkey-current-date-time',
        Name: formData.get('username'),
        RoomNumber: formData.get('roomnumber'),
        Complain: formData.get('message')
    }

    fetch('https://api.sheetmonkey.io/form/wKSohi1HAsTpXpjwrUZxVA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(results => {
        if(results.ok){
            openModal()
        }
    })
})

function clearForm() {
    complainForm['username'].value = null
    complainForm['roomnumber'].value = null
    complainForm['message'].value = null
}

function openModal() {
    modal.showModal()
    return false
}

modal.addEventListener('click', (e) => {
    clearForm()
   if(e.target.nodeName === "DIALOG") {
    modal.setAttribute('close', '')
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('close')
        modal.close()
    }, {once: true})
   }
})

closeModal.addEventListener('click', () => {
    clearForm()
    modal.setAttribute('close', '')
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('close')
        modal.close()
    }, {once: true})
})

// openModal.addEventListener('click', () => {
//     let username = complainForm["username"].value
//     let message = complainForm["message"].value

//     if(username == "" || message == ""){
//         console.log('empty')
//     }else {
//         modal.showModal()
//     }
// })
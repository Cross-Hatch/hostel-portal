const modal = document.getElementById('modal')
// const openModal = document.getElementById('send')
const closeModal = document.getElementById('close-btn')
const complainForm = document.forms["complain"]

// openModal.addEventListener('click', () => {
//     let username = complainForm["username"].value
//     let message = complainForm["message"].value

//     if(username == "" || message == ""){
//         console.log('empty')
//     }else {
//         modal.showModal()
//     }
// })

function openModal() {
    modal.showModal()
    return false
}

modal.addEventListener('click', (e) => {
   if(e.target.nodeName === "DIALOG") {
    modal.setAttribute('close', '')
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('close')
        modal.close()
    }, {once: true})
   }
})

closeModal.addEventListener('click', () => {
    modal.setAttribute('close', '')
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('close')
        modal.close()
    }, {once: true})
})
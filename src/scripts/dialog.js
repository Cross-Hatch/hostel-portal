const modal = document.getElementById('modal')
const openModal = document.getElementById('send')
const closeModal = document.getElementById('close-btn')

openModal.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () => {
    modal.close()
})
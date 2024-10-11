// MODAL

const modal = document.querySelector(".modal")
const modalTrigger = document.querySelector("#btn-get")
const closeIcon = document.querySelector(".modal_close")

const openModal = () => {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ""
}

modalTrigger.onclick = () => openModal()
closeIcon.onclick = () => closeModal()

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const scrollEnd = () => {
    const scrollPosition = window.innerHeight + window.scrollY
    const height = document.body.offsetHeight

    if (scrollPosition >= height) {
        openModal()
        window.removeEventListener("scroll", scrollEnd)
    }
}

window.addEventListener("scroll", scrollEnd)

setTimeout(() => {
    openModal()
}, 10000)
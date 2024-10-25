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


// POST DATA

const form = document.querySelector("form")

const chat_id = `@kurman_lesson7`
const token = `7819414054:AAG2yp4KNvHWvb2x4GiZgb2IfNz4tLbHDKc`
const api_url = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const user = {}
    formData.forEach((item, index) => {
        user[index] = item
    })
    const {name, phone} = user
    const text = `name: ${name}\nphone: ${phone}`

    
    fetch(api_url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id: chat_id, text})
    })
}
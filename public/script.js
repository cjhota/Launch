const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
        const videoId = card.getAttribute('id')
        window.location.href = `/video?id=${videoId}`

        // modalOverlay.classList.add('active')
        // modalOverlay.querySelector('iframe').src = `https://youtube.com/embed/${videoId}`

    })
}

// document.querySelector('.close-modal').addEventListener('clikc', function(){
//     modalOverlay.classList.remove('.active')
//     modalOverlay.querySelector('iframe').scr = ""
// })

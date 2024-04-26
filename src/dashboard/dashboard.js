var toggleStatus = false

function toggleChange() {
    var sideBar = document.getElementById("sidebar")
    var content = document.getElementById("content")
    var header = document.getElementById("header")

    if (toggleStatus){
        sideBar.classList.add("hidden")
        sideBar.classList.remove("block")
        content.classList.remove("hidden")
        content.classList.add("flex")
        content.classList.remove("md:w-[calc(100%-18rem)]")
        content.classList.add("md:pr-12")
        header.classList.remove("md:w-[calc(100%-18rem)]")
        toggleStatus = false
    } else {
        sideBar.classList.add("block")
        sideBar.classList.remove("hidden")
        content.classList.add("hidden")
        content.classList.remove("pr-12")
        content.classList.add("md:w-[calc(100%-18rem)]")
        content.classList.remove("flex")
        header.classList.add("md:w-[calc(100%-18rem)]")
        toggleStatus = true
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu').addEventListener("change",toggleChange)
})

let counter = 24
setInterval(() => {
		if(counter>0){
			counter--
		}
    document.getElementById('counterElement').style.setProperty('--value', counter)
}, 60000)
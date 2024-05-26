const all = document.querySelector('aaa')
const steps = document.getElementById("steps")
const page1 = document.getElementById("page1")
const page2 = document.getElementById("page2")
const page3 = document.getElementById("page3")
const page4 = document.getElementById("page4")
const form = document.getElementById("form")

var counter = 1

var finalForm = {
    username: undefined,
    email: undefined,
    password: undefined,
    province: undefined,
    intro_method: undefined
}

const hideFunc = (page, prev)=>{
    if (prev){
        prev.classList.remove('flex')
        prev.classList.add('hidden')
    }
    page.classList.add('flex')
    page.classList.remove('hidden')
    steps.getElementsByTagName('li')[counter-1].className='step step-primary'
} 

const setPage = ()=> {
    if (counter === 1){
        hideFunc(page1)
    } else if (counter === 2 ){
        hideFunc(page2, page1)
    } else if (counter === 3 ){
        hideFunc(page3, page2)
    } else if (counter === 4 ){
        hideFunc(page4, page3)
    } else if (counter === 5 ){
        hideFunc(form, page4)
    }
}

const setCount = (count)=> {
    counter = count
    setPage()
    console.log(finalForm)
}

page1.getElementsByTagName('button')[0].addEventListener('click', function() {setCount(2)})
page2.getElementsByTagName('button')[4].addEventListener('click', function() {setCount(3)})
page3.getElementsByTagName('form')[0].addEventListener('submit', function(event) {
    event.preventDefault() 
    setCount(4) 
    const formData = new FormData(page3.getElementsByTagName('form')[0]);
    finalForm.province = Object.fromEntries(formData.entries()).province;
})
page4.getElementsByTagName('form')[0].addEventListener('submit', function(event) {
    event.preventDefault()
    setCount(5)
    const formData = new FormData(page4.getElementsByTagName('form')[0]);
    finalForm.intro_method = Object.fromEntries(formData.entries()).intro_method;
})
form.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(form);
    finalForm.username = Object.fromEntries(formData.entries()).email;
    finalForm.email = Object.fromEntries(formData.entries()).email;
    finalForm.password = Object.fromEntries(formData.entries()).password;

    var url = "http://127.0.0.1:8000/auth/users/"
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalForm)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        window.location.replace("/src/login.html");
    })
    .catch(error => {
        console.error('Error:', error);
    })
})
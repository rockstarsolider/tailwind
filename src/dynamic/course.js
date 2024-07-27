const content = document.getElementById('content')
const steps = document.getElementById('steps')
const back = document.getElementById('back')

const startSec = '<div class="flex justify-between items-start w-[80%]">\
                    <div class="pr-[5%] flex flex-col justify-center items-start gap-10">\
                        <h2 class="font-bold card-title">هوش مصنوعی</h2>\
                        <p>به درس جدید خوش آمدید</p>\
                        <button class="btn btn-primary continue">شروع درس</button>\
                    </div>\
                    <img class="w-[50%] fixed left-0 top-0"/>\
                </div>'

const endSec = '<div class="card lg:card-side bg-base-100 shadow-xl w-[90%] my-10 lg:w-[50%]"> \
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure> \
                    <div class="card-body"> \
                        <h2 class="card-title">تبریک!</h2> \
                        <p>شما درس را به پایان رساندید.</p> \
                        <div class="card-actions justify-end gap-5">\
                            <button id="restart" class="btn">مرور دوباره</button> \
                        </div> \
                    </div> \
                </div>'

export function getFazeIdCookie() {
    const name = "fazeId=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
}

import {checkApi,getAccessCookie} from '../api.js'
checkApi()
const access = getAccessCookie()

fetch(`http://127.0.0.1:8000/task/sections/${getFazeIdCookie()}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json','Authorization':'JWT '+access},
})
.then(response => {
    return response.json();
})
.then(data => {
    const len = data[1].length
    const btn = document.createElement('button')
    btn.className ='btn btn-primary continue z-30'
    btn.onclick=()=>nextPage()
    for (let i = 0; i < len+2; i++) {
        const li = document.createElement('li')
        li.className= 'step'
        steps.append(li)
        if(i==0){
            btn.innerHTML='شروع درس'
            li.className='step step-primary'
            content.innerHTML = startSec
            content.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('h2')[0].innerHTML = data[0].name
            content.getElementsByTagName('div')[0].getElementsByTagName('img')[0].setAttribute('src',data[0].start_img_url)
            content.append(btn)
        }
    }
    var counter = 0
    btn.innerHTML='ادامه'
    const nextPage = ()=>{
        if (counter==len){
            content.innerHTML = endSec
            steps.getElementsByTagName('li')[counter+1].className='step step-primary'
            btn.onclick=()=>window.location.replace('course-road.html')
            btn.innerHTML='پایان درس'
            content.append(btn)
            const restart = document.getElementById('restart')
            restart.onclick = ()=> {
                counter=0
                nextPage()
                btn.innerHTML='ادامه'
                btn.onclick=()=>nextPage()
            }
            return
        }
        content.innerHTML=data[1][counter].html_code
        steps.getElementsByTagName('li')[counter+1].className='step step-primary'
        content.append(btn)
        counter+=1
    }
})
.catch(error => {
    console.error('Error:', error);
});
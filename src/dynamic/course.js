const content = document.getElementById('content')
const steps = document.getElementById('steps')
const back = document.getElementById('back')

const textSec = '<div class="card lg:card-side bg-base-100 shadow-xl w-[90%] my-10 lg:w-[60%]"> \
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure> \
                    <div class="card-body"> \
                        <h2 class="card-title">New album is released!</h2> \
                        <p>Click the button to listen on Spotiwhy app.</p> \
                        <div class="card-actions justify-end"> \
                            <button class="btn btn-primary continue">ادامه</button> \
                        </div> \
                    </div> \
                </div>'

const quizSec = '<div class="card lg:card-side bg-base-100 shadow-xl w-[90%] my-10 lg:w-[40%]"> \
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure> \
                    <div class="card-body"> \
                        <h2 class="card-title">گزینه صحیح را انتخاب کنید</h2> \
                        <div class="form-control"><label class="label cursor-pointer"><span class="label-text">یک</span> \
                            <input type="radio" name="radio-10" class="radio checked:bg-blue-500 "  /></label> \
                        </div> \
                        <div class="form-control"><label class="label cursor-pointer"><span class="label-text">دو</span> \
                            <input type="radio" name="radio-10" class="radio checked:bg-blue-500"  /></label> \
                        </div> \
                        <div class="form-control"><label class="label cursor-pointer"><span class="label-text">سه</span> \
                            <input type="radio" name="radio-10" class="radio checked:bg-blue-500"  /></label> \
                        </div> \
                        <div class="form-control"><label class="label cursor-pointer"><span class="label-text">چهار</span> \
                            <input id="answer" type="radio" name="radio-10" class="radio checked:bg-blue-500" /></label> \
                        </div> \
                        <div class="card-actions justify-end"> \
                            <button class="btn btn-primary continue">ادامه</button> \
                        </div> \
                    </div>\
                </div>'

const videoSec = '<video class="video-js w-[90%] lg:w-[50%] rounded-xl" src="/media/dynamic/file_example_MP4_640_3MG.mp4" controls></video>\
                <button class="btn btn-primary continue">ادامه</button>'

const startSec = '<div class="flex justify-between items-start w-[80%]">\
                    <div class="pr-[5%] flex flex-col justify-center items-start gap-10">\
                        <h2 class="font-bold card-title">هوش مصنوعی</h2>\
                        <p>به درس سوم دوره خوش آمدید</p>\
                        <button class="btn btn-primary continue">شروع درس</button>\
                    </div>\
                    <img class="w-[50%] fixed left-0 top-0" src="/media/dynamic/start.png"/>\
                </div>'

const endSec = '<div class="card lg:card-side bg-base-100 shadow-xl w-[90%] my-10 lg:w-[50%]"> \
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure> \
                    <div class="card-body"> \
                        <h2 class="card-title">تبریک!</h2> \
                        <p>شما درس را به پایان رساندید.</p> \
                        <div class="card-actions justify-end gap-5">\
                            <button id="restart" class="btn">مرور دوباره</button> \
                            <button class="btn btn-primary continue">اتمام درس</button> \
                        </div> \
                    </div> \
                </div>'

var counter = 1
content.innerHTML = startSec

const setPage = () => {
    if (counter == 1){
        content.innerHTML = startSec
    } else if (counter == 2){
        content.innerHTML = textSec
        steps.getElementsByTagName('li')[1].classList = "step step-primary"
    } else if(counter == 3){
        content.innerHTML = quizSec
        steps.getElementsByTagName('li')[2].classList = "step step-primary"
    } else if(counter == 4){
        content.innerHTML = videoSec
        steps.getElementsByTagName('li')[3].classList = "step step-primary"
    } else if (counter == 5){
        content.innerHTML = endSec
        steps.getElementsByTagName('li')[4].classList = "step step-primary"
        document.getElementById("restart").addEventListener('click', function(event){
            event.preventDefault()
            counter = 0
            counter +=1
            setPage()
        })
    }
    eventl()
}

const eventl = ()=> {
    content.querySelector('.continue').addEventListener('click', function(event){
        event.preventDefault()
        console.log('sdsd')
        if (counter==3 ) {
            if(document.getElementById('answer').checked){
                counter +=1
                setPage()
            }
        } else {
            counter +=1
            setPage()
        }
    })

    back.addEventListener('click', function(event){
        event.preventDefault()
        counter -= 1
        setPage()
    })
}

if (counter == 5){document.getElementById("restart").addEventListener('click', function(event){
    event.preventDefault()
    counter = 1
    counter +=1
    setPage()
})
}

eventl()
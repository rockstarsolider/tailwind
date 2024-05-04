export function getRefreshCookie() {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
}

export function getAccessCookie() {
    const name = "accessToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
}

export function getAccess(){
    const accessCookie = getAccessCookie()
    const refreshToken = getRefreshCookie()

    var url = "http://127.0.0.1:8000/auth/jwt/refresh/"
    const refresh = {refresh:refreshToken}
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refresh)
    })
    .then(response => {
        if (response.status === 401){
            window.location.replace("/src/login.html");
        } else if (response.ok) {
            
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        document.cookie = "accessToken="+data.access;

        return accessCookie
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

export function checkApi(){
    const accessCookie = getAccessCookie()
    const refreshToken = getRefreshCookie()

    if (!refreshToken){
        window.location.replace("/src/login.html");
    }

    const body = {token: accessCookie}
    const url = 'http://127.0.0.1:8000/auth/jwt/verify/'
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if(response.status === 401){
                getAccess()
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            
        })
        .catch(error => {
            console.error('Error:', error);
    })
}
export function checkApi(){
    function getAccessCookie() {
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
    const accessCookie = getAccessCookie()

    function getRefreshCookie() {
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
    const refreshToken = getRefreshCookie()

    if (!refreshToken){
        window.location.replace("/src/login.html");
    }

    if (accessCookie){
        return accessCookie
    } else {
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
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            document.cookie = "accessToken="+data.access;
            window.location.reload()
            return accessCookie
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
}
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook"),
    cookiewin = document.querySelector('.cookie_notice');

if (cookiecook != "no") {

    cookiewin.classList.remove("hidden");

    document.getElementById("cookie_close").addEventListener("click", function(e){
        e.preventDefault();
        cookiewin.classList.add("hidden");

        let date = new Date;
        date.setDate(date.getDate() + 1);
        document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
    });
}
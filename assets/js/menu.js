//Abre o menu mobile aravés do clique quando as dimensões das telas são alteradas 
 function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open-menu')) {
        menuMobile.classList.remove('open-menu');
        document.querySelector('.icon').src = "./assets/img/menu_green.svg";
    }else {
        menuMobile.classList.add('open-menu');
        document.querySelector('.icon').src = "./assets/img/close_green.svg";
    }
}
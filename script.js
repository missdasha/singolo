const MENU = document.getElementById('menu');
const DIVS = document.querySelectorAll('main>div');
const BUTTON = document.getElementById('button');
const CLOSE_BUTTON = document.getElementById('close-button');
const IMAGES = document.getElementById('images');
const TAGS = document.getElementById('tags');
const VERTICAL_SWITCH = document.getElementById('vertical-switch');
const HORIZONTAL_SWITCH = document.getElementById('horizontal-switch');
const SLIDER = document.querySelector('.slider');

//slider
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showSlide(direction) {
    slides[currentSlide].classList.add('following', direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('following', direction);
        this.classList.add('active');
        isEnabled = true;
    });
    SLIDER.classList.toggle('blue');
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n-1);
    showSlide('from-left');
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n+1);
    showSlide('from-right');
}

document.querySelector('.prev').addEventListener('click', function() {
    if(isEnabled) {
        previousSlide(currentSlide);
    }
});

document.querySelector('.next').addEventListener('click', function() {
    if(isEnabled) {
        nextSlide(currentSlide);
    }
});

//переключение элементов меню
document.addEventListener('scroll', event => {
    const curPos = window.scrollY;
    DIVS.forEach((el) => {
        if(el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            MENU.querySelectorAll('a').forEach((a) => {
                a.classList.remove('active');
                if(el.getAttribute('id') === a.getAttribute('href').substring(1))
                    a.classList.add('active');
            });
        }
    });
});

MENU.addEventListener('click', event => {
    MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
});

//отображение модального окна
BUTTON.addEventListener('click', event => {
    if(document.getElementById('form').checkValidity()) {
        event.preventDefault();

        const subject = document.getElementById('subject').value.toString();
        const describe = document.getElementById('describe').value.toString();

        document.getElementById('message-block').classList.remove('hidden');

        document.getElementById('theme').innerText = subject ?  subject : "Без темы";
        document.getElementById('description').innerText = describe ? describe : "Без описания";
    }
});

//закрытие модального окна и очистка формы
CLOSE_BUTTON.addEventListener('click', event => {
    event.preventDefault();

    document.getElementById('message-block').classList.add('hidden');

    document.getElementById('theme').innerText = "";
    document.getElementById('description').innerText = "";
    document.getElementById('form').reset();
});

//отображение рамки вокруг картинок
IMAGES.addEventListener('click', event => {
    IMAGES.querySelectorAll('img').forEach(elem => elem.classList.remove('bordered'));
    if(event.target.tagName === "IMG")
        event.target.classList.add('bordered');
});

//переключение табов
TAGS.addEventListener('click', event => {
    TAGS.querySelectorAll('span').forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    let array = Array.from(IMAGES.querySelectorAll('img'));
    let sorted = randomSort(array);
    IMAGES.querySelectorAll('img').forEach(elem => elem.classList.remove('bordered'));
    sorted.forEach(elem => IMAGES.append(elem));
});

//перемешивание картинок
const randomSort = items => items.sort(() => Math.random() - 0.5);

//aктивация экрана вертикального телефона
VERTICAL_SWITCH.addEventListener('click', event => {
    document.getElementById('vertical-black-screen').classList.toggle('hidden');
});

//aктивация экрана горизонтального телефона
HORIZONTAL_SWITCH.addEventListener('click', event => {
    document.getElementById('horizontal-black-screen').classList.toggle('hidden');
});


const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let primeiraCarta, segundaCarta;
let trancarTabuleiro = false;


//função para virar carta
function flipCard() {
    if(trancarTabuleiro) return;
    if(this === primeiraCarta) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    hasFlippedCard = false;
    checkForMatch();
};


//função que checa se as cartas são iguais
function checkForMatch() {
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
};

//função que desabilita as cartas
function disableCards() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);

    resetBoard();
};


//funcão que desvira as cartas
function unflipCards() {
    trancarTabuleiro = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
    }, 1100);
};

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, trancarTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
};

//função que embaralha as cartas
function embaralhar() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
        resetarCartas();     
    })
};

function resetarCartas(){
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        card.addEventListener('click', flipCard); 
             
    })
};


//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

document.getElementById("buttom").addEventListener("click", embaralhar);


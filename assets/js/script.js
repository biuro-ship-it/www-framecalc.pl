document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-oblicz');
    
    btn.addEventListener('click', () => {
        const szer = parseFloat(document.getElementById('szerokosc').value);
        const wys = parseFloat(document.getElementById('wysokosc').value);
        const rodzaj = document.getElementById('rodzaj').value;
        const wynikBox = document.getElementById('wynik-box');
        const wynikCena = document.getElementById('wynik-cena');

        if (!szer || !wys) {
            alert("Podaj wymiary ramy!");
            return;
        }

        // Przykładowy model wyceny
        let cenaM2 = 120; // Bazowa cena listwy
        if (rodzaj === 'alu') cenaM2 = 180;
        if (rodzaj === 'anty') cenaM2 = 60;

        // Liczymy obwód w metrach
        const obwod = ((szer + wys) * 2) / 100;
        // Liczymy powierzchnię w m2 (np. dla szkła)
        const pole = (szer * wys) / 10000;

        // Prosty wzór: (Obwód * cena listwy) + (Pole * cena szkła/plexi) + montaż
        let suma = (obwod * cenaM2) + (pole * 50) + 25;

        // Wyświetlamy wynik
        wynikBox.classList.remove('hidden');
        wynikCena.innerText = suma.toFixed(2) + " zł";
        
        // Efekt płynnego pojawiania się
        wynikBox.style.opacity = 0;
        setTimeout(() => {
            wynikBox.style.transition = "opacity 0.5s ease";
            wynikBox.style.opacity = 1;
        }, 10);
    });
});
/**
 * FrameCalc.pl - Logic Engine v2.0
 * Konfigurator dynamiczny: Sayart, Eurorama, Lira
 */

const DATA = {
    manufacturers: {
        "Sayart": [
            { id: "S-101", name: "Alu Profil Czarny Mat", price: 42 },
            { id: "S-102", name: "Alu Profil Srebrny Szczotkowany", price: 48 },
            { id: "S-103", name: "Alu Profil Złoty Połysk", price: 55 },
            { id: "S-104", name: "Alu Profil Biały Połysk", price: 42 }
        ],
        "Eurorama": [
            { id: "E-201", name: "Drewno Dąb Naturalny", price: 65 },
            { id: "E-202", name: "Drewno Orzech Włoski", price: 68 },
            { id: "E-203", name: "Drewno Bielone", price: 58 },
            { id: "E-204", name: "Drewno Czarny Słój", price: 60 }
        ],
        "Lira": [
            { id: "L-301", name: "Klasyczna Złota (Wąska)", price: 35 },
            { id: "L-302", name: "Barokowa Srebrna (Szeroka)", price: 95 },
            { id: "L-303", name: "Sosna Surowa (Skrzynkowa)", price: 28 },
            { id: "L-304", name: "Okleina Wenge", price: 44 }
        ]
    },
    materials: {
        glass: { "float": 45, "antyrefleks": 90, "brak": 0 },
        backs: { "hdf": 20, "pianka": 35, "brak": 0 },
        pp: { "brak": 0, "standard": 60, "bezkwasowe": 110 }
    },
    baseService: 25 // stała opłata za montaż
};

let selectedMfr = null;

// Funkcja wyboru producenta
function selectManufacturer(name) {
    selectedMfr = name;
    
    // Wizualna zmiana przycisków
    document.querySelectorAll('.manufacturer-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${name}`).classList.add('active');

    // Pokazanie i wypełnienie dropdownu listew
    const container = document.getElementById('listwa-container');
    const select = document.getElementById('kod-listwy');
    
    container.style.display = 'block';
    select.innerHTML = ''; // czyszczenie

    DATA.manufacturers[name].forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.id} - ${item.name}`;
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const btnOblicz = document.getElementById('btn-oblicz');
    
    btnOblicz.addEventListener('click', () => {
        if (!selectedMfr) {
            alert("Najpierw wybierz producenta!");
            return;
        }

        const szer = parseFloat(document.getElementById('szerokosc').value);
        const wys = parseFloat(document.getElementById('wysokosc').value);
        const kodListwy = document.getElementById('kod-listwy').value;
        const rodzajSzkla = document.getElementById('rodzaj-szkla').value;
        const rodzajTyly = document.getElementById('rodzaj-tyly').value;
        const rodzajPP = document.getElementById('rodzaj-paspartu').value;
        const extraCharge = parseFloat(document.getElementById('oplata-extra').value) || 0;

        if (!szer || !wys) {
            alert("Podaj wymiary obrazu!");
            return;
        }

        // 1. Cena listwy (Obwód)
        const itemObj = DATA.manufacturers[selectedMfr].find(i => i.id === kodListwy);
        const obwodMb = ((szer + wys) * 2) / 100;
        const kosztListwy = obwodMb * itemObj.price;

        // 2. Koszty powierzchniowe (Pole m2)
        const poleM2 = (szer * wys) / 10000;
        const kosztSzkla = poleM2 * DATA.materials.glass[rodzajSzkla];
        const kosztTyly = poleM2 * DATA.materials.backs[rodzajTyly];
        const kosztPP = poleM2 * DATA.materials.pp[rodzajPP];

        // 3. Suma
        const suma = kosztListwy + kosztSzkla + kosztTyly + kosztPP + extraCharge + DATA.baseService;

        // Wynik
        const wynikBox = document.getElementById('wynik-box');
        const wynikCena = document.getElementById('wynik-cena');

        wynikBox.classList.remove('hidden');
        wynikCena.innerText = suma.toFixed(2);
        
        // Przewinięcie do wyniku na mobile
        wynikBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
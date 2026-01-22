


const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultsContainer = document.getElementById('resultsContainer');


function searchPlaces() {

    let keyword = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            let results = [];

            // Lógica de filtrado basada en el JSON recibido
            if (keyword === 'temple' || keyword === 'temples') {
                results = data.temples;
            } 
            else if (keyword === 'beach' || keyword === 'beaches') {
                results = data.beaches;
            } 
            else if (keyword === 'country' || keyword === 'countries') {
                // Aplanamos el array de países para obtener solo las ciudades
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.push(city);
                    });
                });
            }

            // 5. MOSTRAR RESULTADOS
            if (results.length > 0) {
                homeHero.style.display = 'none';
                results.forEach(place => {
                    

                    const cardHTML = `
                        <div class="result-card">
                        <img src="${place.imageUrl}" alt="${place.name}" 
                        onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop'">
                            <div class="result-content">
                                <h3>${place.name}</h3>
                                
                                <p>${place.description}</p>
                            </div>
                        </div>
                    `;
                    resultsContainer.innerHTML += cardHTML;
                });
            } else {
                alert("Por favor busca: 'beach', 'temple' o 'country'");
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
            alert("Hubo un error al cargar los datos. Asegúrate de estar usando un servidor local (Live Server).");
        })
                
        
}

btnSearch.addEventListener("click",searchPlaces);

btnReset.addEventListener("click", ()=> {
    searchInput.value = '';
    resultsContainer.innerHTML = "";
    homeHero.style.display = 'flex';
})
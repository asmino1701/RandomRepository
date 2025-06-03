import * as constants from '../utils/constants.js';
export class API {
    constructor() {
        this.baseURL = constants.API_CONFIG.BASE_URL;
        this.stars = constants.API_CONFIG.MIN_STARS;
    }
    
    async getRandomRepository(language) {
        try {
            // Genera una página aleatoria (1-10) para obtener variedad
            const randomPage = Math.floor(Math.random() * 10) + 1;
            
            const query = `language:${language} stars:>${this.stars}`;
            const url = `${this.baseURL}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&page=${randomPage}&per_page=30`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.items || data.items.length === 0) {
                throw new Error(`No se encontraron repositorios para el lenguaje ${language}`);
            }
            
            // Selecciona un repositorio aleatorio de los resultados
            const randomIndex = Math.floor(Math.random() * data.items.length);
            return data.items[randomIndex];
            
        } catch (error) {
            if (error.message.includes('rate limit')) {
                throw new Error('Límite de solicitudes excedido. Intenta de nuevo en unos minutos.');
            } else if (error.message.includes('Failed to fetch')) {
                throw new Error('Error de conexión. Verifica tu conexión a internet.');
            } else {
                throw error;
            }
        }
    }
}
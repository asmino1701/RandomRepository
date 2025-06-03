export class Spinner {
    render() {
        return `
            <div class="loading-container">
                <div class="spinner"></div>
                <p class="loading-text">Buscando repositorio...</p>
            </div>
        `;
    }
}
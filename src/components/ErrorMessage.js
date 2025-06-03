export class ErrorMessage {
    render(errorMessage) {
        return `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3 class="error-title">Oops! Algo salió mal</h3>
                <p class="error-message">${errorMessage}</p>
                <button id="retry-btn" class="retry-btn">
                    🔄 Intentar de nuevo
                </button>
            </div>
        `;
    }
    
    attachEventListeners() {
        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('refreshRepository'));
            });
        }
    }
}
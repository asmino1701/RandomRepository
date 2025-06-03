export class RepositoryCard {
    render(repository) {
        const {
            name,
            description,
            stargazers_count,
            forks_count,
            open_issues_count,
            html_url,
            language,
            owner
        } = repository;
        
        return `
            <div class="repository-card">
                <div class="repo-header">
                    <div class="repo-owner">
                        <img src="${owner.avatar_url}" alt="${owner.login}" class="owner-avatar">
                        <span class="owner-name">${owner.login}</span>
                    </div>
                    <div class="repo-language">
                        <span class="language-badge">${language || 'N/A'}</span>
                    </div>
                </div>
                
                <h2 class="repo-name">
                    <a href="${html_url}" target="_blank" rel="noopener noreferrer">
                        ${name}
                    </a>
                </h2>
                
                <p class="repo-description">
                    ${description || 'Sin descripción disponible'}
                </p>
                
                <div class="repo-stats">
                    <div class="stat">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-value">${this.formatNumber(stargazers_count)}</span>
                        <span class="stat-label">Estrellas</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🍴</span>
                        <span class="stat-value">${this.formatNumber(forks_count)}</span>
                        <span class="stat-label">Forks</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🐛</span>
                        <span class="stat-value">${this.formatNumber(open_issues_count)}</span>
                        <span class="stat-label">Issues</span>
                    </div>
                </div>
                
                <div class="repo-actions">
                    <button id="refresh-btn" class="refresh-btn">
                        🔄 Buscar otro repositorio
                    </button>
                    <a href="${html_url}" target="_blank" rel="noopener noreferrer" class="view-btn">
                        👁️ Ver en GitHub
                    </a>
                </div>
            </div>
        `;
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    attachEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('refreshRepository'));
            });
        }
    }
}
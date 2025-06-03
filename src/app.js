import { LanguageSelector } from './components/LanguageSelector.js';
import { RepositoryCard } from './components/RepositoryCards.js';
import { Spinner } from './components/Spinner.js';
import { ErrorMessage } from './components/ErrorMessage.js';
import { API } from './services/API.js';

class GitHubRepoFinder {
    constructor() {
        this.currentLanguage = '';
        this.currentRepository = null;
        this.isLoading = false;
        this.currentError = null;
        
        this.languageSelector = new LanguageSelector();
        this.repositoryCard = new RepositoryCard();
        this.loadingSpinner = new Spinner();
        this.errorMessage = new ErrorMessage();
        this.githubAPI = new API();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.render();
    }
    
    setupEventListeners() {
        // Escuchar cambios en el selector de lenguaje
        document.addEventListener('languageSelected', (event) => {
            this.handleLanguageChange(event.detail.language);
        });
        
        // Escuchar clics en el botón de actualizar
        document.addEventListener('refreshRepository', () => {
            this.searchRandomRepository();
        });
    }
    
    async handleLanguageChange(language) {
        this.currentLanguage = language;
        await this.searchRandomRepository();
    }
    
    async searchRandomRepository() {
        if (!this.currentLanguage) return;
        
        this.setState({ isLoading: true, error: null, repository: null });
        
        try {
            const repository = await this.githubAPI.getRandomRepository(this.currentLanguage);
            this.setState({ 
                isLoading: false, 
                repository: repository,
                error: null 
            });
        } catch (error) {
            console.error('Error fetching repository:', error);
            this.setState({ 
                isLoading: false, 
                error: error.message,
                repository: null 
            });
        }
    }
    
    setState(newState) {
        if (newState.hasOwnProperty('isLoading')) {
            this.isLoading = newState.isLoading;
        }
        if (newState.hasOwnProperty('repository')) {
            this.currentRepository = newState.repository;
        }
        if (newState.hasOwnProperty('error')) {
            this.currentError = newState.error;
        }
        
        this.render();
    }
    
    async render() {
        // Renderizar selector de lenguaje
        const languageSelectorContainer = document.getElementById('language-selector-container');
        if (languageSelectorContainer) {
            languageSelectorContainer.innerHTML = await this.languageSelector.render();
            setTimeout(() => this.languageSelector.attachEventListeners(), 0);
        }
        
        // Renderizar estado de carga
        const loadingContainer = document.getElementById('loading-container');
        if (loadingContainer) {
            loadingContainer.innerHTML = this.isLoading ? this.loadingSpinner.render() : '';
        }
        
        // Renderizar error
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            if (this.currentError && !this.isLoading) {
                errorContainer.innerHTML = this.errorMessage.render(this.currentError);
                setTimeout(() => this.errorMessage.attachEventListeners(), 0);
            } else {
                errorContainer.innerHTML = '';
            }
        }
        
        // Renderizar repositorio
        const repositoryContainer = document.getElementById('repository-container');
        if (repositoryContainer) {
            if (this.currentRepository && !this.isLoading && !this.currentError) {
                repositoryContainer.innerHTML = this.repositoryCard.render(this.currentRepository);
                setTimeout(() => this.repositoryCard.attachEventListeners(), 0);
            } else {
                repositoryContainer.innerHTML = '';
            }
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GitHubRepoFinder();
});
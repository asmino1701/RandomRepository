export class LanguageSelector {
    constructor() {
        this.languages = [];
        this.selectedLanguage = null;
        this.languageUrl = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';
    }

    async fetchLanguages() {
        try {
            const response = await fetch(this.languageUrl);
            if (response.ok) {
                const languages = await response.json();
                this.setLanguages(languages);
            } else {
                console.error('Failed to fetch languages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }

    setLanguages(languages) {
        if (Array.isArray(languages)) {
            this.languages = languages;
        } else if (languages && typeof languages === 'object') {
            this.languages = Object.keys(languages);
        } else {
            console.error('Invalid languages data structure');
        }
    }


    async render() {
        if (this.languages.length === 0) {
            await this.fetchLanguages();
        }
        
        console.log('languages:', this.languages);
        
        // Agrega la opción por defecto]
        let options = '<option value="">Choose a language...</option>';
        options += this.languages.map(language => 
            `<option value="${language.title}">${language.value}</option>`
        ).join('');

        return `
            <div class="language-selector">
                <label for="language-select">Selecciona un lenguaje de programación:</label>
                <select id="language-select" class="language-select">
                    ${options}
                </select>
            </div>
        `;
    }

    attachEventListeners() {
        const select = document.getElementById('language-select');
        if (select) {
            select.addEventListener('change', (e) => {
                this.selectedLanguage = e.target.value;
                if (this.selectedLanguage) {
                    document.dispatchEvent(new CustomEvent('languageSelected', {
                        detail: { language: this.selectedLanguage }
                    }));
                }
            });
        }
    }

    getSelectedLanguage() {
        return this.selectedLanguage;
    }
}
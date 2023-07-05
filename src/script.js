import apiModule from './apiModule.js';
import { generateCard } from './cardModule.js';
import { registerTagsClickEvents } from './filterModule.js';
import { showLoadingIndicator, hideLoadingIndicator } from './loadingModule.js';

window.onload = init;

function init() {
    // Get the category filter element and tags
    const categoryFilter = document.getElementById('category-filter');
    const categoryTags = categoryFilter.querySelectorAll('.tag');

    // Get the language filter element and tags
    const languageFilter = document.getElementById('language-filter');
    const languageTags = languageFilter.querySelectorAll('.tag');

    // Store the currently selected categories and languages
    const selectedCategories = new Set(["category1"]);
    const selectedLanguages = new Set(["English"]);

    // Add event listeners to handle category selection
    registerTagsClickEvents(categoryTags, selectedCategories, () => { filterData(selectedCategories, selectedLanguages) });

    // Add event listeners to handle language selection
    registerTagsClickEvents(languageTags, selectedLanguages, () => { filterData(selectedCategories, selectedLanguages) });

    filterData(selectedCategories, selectedLanguages);
}

function filterData(selectedCategories, selectedLanguages) {
    
    const cardsContainer = document.getElementById('cards-container');

    // Show loading indicator
    showLoadingIndicator(cardsContainer);

    const rows = 10;
    apiModule
        .callApi(rows, Array.from(selectedCategories), Array.from(selectedLanguages))
        .then(data => {
            cardsContainer.innerHTML = '';

            if (data.length === 0) {
                // Handle case when no data matches the selected categories and languages
                const noDataMessage = document.createElement('div');
                noDataMessage.textContent = 'No data available for the selected categories and languages';
                noDataMessage.classList.add('no-data-message');
                cardsContainer.appendChild(noDataMessage);
            } else {
                data.forEach(item => {
                    const card = generateCard(item);
                    cardsContainer.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('API Request Failed:', error);
            // Handle the error
        })
        .finally(() => {
            // Hide loading indicator
            hideLoadingIndicator(cardsContainer);
        });
}

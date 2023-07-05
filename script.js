




window.onload = function () {

    // Get the cards container element
    const cardsContainer = document.getElementById('cards-container');
    // Get the category filter element and tags
    const categoryFilter = document.getElementById('category-filter');
    const categoryTags = categoryFilter.querySelectorAll('.tag');

    // Get the language filter element and tags
    const languageFilter = document.getElementById('language-filter');
    const languageTags = languageFilter.querySelectorAll('.tag');

    // Store the currently selected categories and languages
    const selectedCategories = new Set();
    selectedCategories.add("category1");
    const selectedLanguages = new Set();
    selectedLanguages.add("English");

    // Add event listeners to handle category selection
    categoryTags.forEach(tag => {
        tag.addEventListener('click', event => {
            event.target.classList.toggle('selected');
            const category = event.target.textContent.trim();
            if (event.target.classList.contains('selected')) {
                selectedCategories.add(category);
            } else {
                selectedCategories.delete(category);
            }
            filterData();
        });
    });

    // Add event listeners to handle language selection
    languageTags.forEach(tag => {
        tag.addEventListener('click', event => {
            event.target.classList.toggle('selected');
            const language = event.target.textContent.trim();
            if (event.target.classList.contains('selected')) {
                selectedLanguages.add(language);
            } else {
                selectedLanguages.delete(language);
            }
            filterData();
        });
    });


    filterData();

    // Function to filter data based on selected categories and languages
    function filterData() {
        // // Check if at least one category and one language are selected
        // if (selectedCategories.size === 0 && selectedLanguages.size === 0) {
        //     cardsContainer.innerHTML = ''; // Clear existing cards
        //     return;
        // }

        // Show loading indicator
        showLoadingIndicator();

        // Call API and generate cards with the selected categories and languages
        const rows = 10;
        apiModule
            .callApi(rows, Array.from(selectedCategories), Array.from(selectedLanguages))
            .then(data => {
                // Clear existing cards
                cardsContainer.innerHTML = '';

                // Generate and append cards for the filtered data
                data.forEach(item => {
                    const card = generateCard(item);
                    cardsContainer.appendChild(card);
                });

                // Handle case when no data matches the selected categories and languages
                if (data.length === 0) {
                    const noDataMessage = document.createElement('div');
                    noDataMessage.textContent = 'No data available for the selected categories and languages';
                    noDataMessage.classList.add('no-data-message');
                    cardsContainer.appendChild(noDataMessage);
                }
            })
            .catch(error => {
                console.error('API Request Failed:', error);
                // Handle the error
            }).finally(() => {
                // Hide loading indicator
                hideLoadingIndicator();
            });
    }



    // Generate circle with initials
    function generateCircleWithInitials(initials) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.textContent = initials.toUpperCase();
        return circle;
    }


    // Function to show the loading indicator
    function showLoadingIndicator() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('loading-indicator');
        loadingIndicator.textContent = 'Loading...';
        cardsContainer.innerHTML = '';
        cardsContainer.appendChild(loadingIndicator);
    }

    // Function to hide the loading indicator
    function hideLoadingIndicator() {
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }


    // Generate card element
    function generateCard(data) {
        const card = document.createElement('div');
        card.className = 'card';

        // Image container with circle initials
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const initials = data.fname.charAt(0) + data.lname.charAt(0);
        const circleElement = generateCircleWithInitials(initials);
        imageContainer.appendChild(circleElement);
        card.appendChild(imageContainer);

        // Data container
        const dataContainer = document.createElement('div');
        dataContainer.className = 'data-container';

        // Generate data items
        let count = 0;
        let dataColumn;

        for (const [key, value] of Object.entries(data)) {
            if (key !== 'fname' && key !== 'lname' && key !== 'category') {
                if (count % 2 === 0) {
                    dataColumn = document.createElement('div');
                    dataColumn.className = 'data-column';
                    dataContainer.appendChild(dataColumn);
                }

                const dataItem = document.createElement('div');
                dataItem.className = 'data-item';

                const keyElement = document.createElement('span');
                keyElement.className = 'key';
                keyElement.textContent = key + ':';

                const valueElement = document.createElement('span');
                valueElement.className = 'value';
                valueElement.textContent = value;

                dataItem.appendChild(keyElement);
                dataItem.appendChild(valueElement);

                dataColumn.appendChild(dataItem);
                count++;
            }
            else if (key === 'category') {
                const categorySpan = document.createElement('span');
                categorySpan.className = 'category-span';
                categorySpan.innerText = value;
                dataContainer.appendChild(categorySpan);
            }
        }

        card.appendChild(dataContainer);

        return card;
    }
}




// Assuming the existing `apiModule` object with the `callApi` method

const apiModule = {
    // Rest of the code...

    callApi(rows, selectedCategories, selectedLanguages) {
        // Convert the selected categories and languages arrays to strings
        let categoryParam = '';
        if (selectedCategories.length > 0) {
            categoryParam = selectedCategories.map(category => `"${category}"`).join(',');
        }

        let languageParam = '';
        if (selectedLanguages.length > 0) {
            languageParam = selectedLanguages.map(language => `"${language}"`).join(',');
        }

        // Construct the API URL with the selected categories and languages as parameters
        let apiUrl = `https://filltext.com/?rows=${rows}&fname={firstName}&lname={lastName}`;

        if (categoryParam !== '') {
            apiUrl += `&category=[${categoryParam}]`;
        }

        if (languageParam !== '') {
            apiUrl += `&language=[${languageParam}]`;
        }

        apiUrl += '&business={business}&country={country}&city={city}&pretty=true';

        debugger
        // Perform the API request
        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                return response.json();
                // Hide loading indicator
                hideLoadingIndicator();
            })
            .catch(error => {
                console.error('API Request Failed:', error);
                throw error;
            });
    },
};
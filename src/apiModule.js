const apiModule = {
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
      let apiUrl = `http://filltext.com/?rows=${rows}&fname={firstName}&lname={lastName}`;
  
      if (categoryParam !== '') {
        apiUrl += `&category=[${categoryParam}]`;
      }
  
      if (languageParam !== '') {
        apiUrl += `&language=[${languageParam}]`;
      }
  
      apiUrl += '&business={business}&country={country}&city={city}&pretty=true';
  
      // Perform the API request
      return fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('API request failed');
          }
          return response.json();
        })
        .catch(error => {
          console.error('API Request Failed:', error);
          throw error;
        });
    },
  };
  
  export default apiModule;
  
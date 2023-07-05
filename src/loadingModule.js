  function showLoadingIndicator(containerElement) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    containerElement.appendChild(loadingIndicator);
  }
  
  function hideLoadingIndicator(containerElement) {
    const loadingIndicator = containerElement.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  
  export { showLoadingIndicator, hideLoadingIndicator };
  
  
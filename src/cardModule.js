function generateCircleWithInitials(initials) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.textContent = initials.toUpperCase();
    return circle;
  }
  
  function generateCard(data) {
    const card = document.createElement('div');
    card.className = 'card fade-in';

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
  
  export { generateCircleWithInitials, generateCard };
  
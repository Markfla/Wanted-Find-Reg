document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');

  // Initialize the timer at 35 seconds
  let timeRemaining = 35;
  updateTimer();
  let score = 0;

  // Function to create a button
  function createButton(buttonID, imagePath, clickHandler) {
    const button = document.createElement('img');
    button.src = imagePath; // Set the image path
    button.id = buttonID;
    button.style.position = 'absolute';

      // Random position within canvas bounds
      const canvasRect = canvas.getBoundingClientRect(); // Get canvas position on the page
      const canvasWidth = canvas.width - 100;
      const canvasHeight = canvas.height - 100;
      const randomX = Math.floor(Math.random() * canvasWidth );
      const randomY = Math.floor(Math.random() * canvasHeight );

      // Calculate position relative to the canvas position on the page
      const buttonX = canvasRect.left + randomX;
      const buttonY = canvasRect.top + randomY;

      button.style.left = buttonX + 'px';
      button.style.top = buttonY + 'px';

      // Add button to game-container
      document.getElementById('game-container').appendChild(button);

      // Add event listener to the button
      button.addEventListener('click', clickHandler);
  }

  // Function to add 5 seconds to the timer when the button is clicked
  function addTimeButtonClickHandler() {
    timeRemaining += 5; // Add 5 seconds to the timer
    updateTimer(); // Update the timer display

    score++;
    updateScore();
    // Update positions of all buttons
    updateButtonPositions();

    // Additional functionality: Change the image of the "Add Time" button
    const addTimeButton = document.getElementById('addTimeButton');
  
    addTimeButton.src = './images/Reg/'+ getRandomRegImage()

    // Additional functionality: Create three new "Reduce Time" buttons
    createReduceTimeButtons(5);
  }

  // Function to remove 3 seconds from the timer when the button is clicked
  function reduceTimeButtonClickHandler() {
      timeRemaining -= 3; // Remove 3 seconds from the timer
      updateTimer(); // Update the timer display
  }

  // Function to update the score display
  function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
  }

  // Function to update the timer display
  function updateTimer() {
      const timerElement = document.getElementById('time');
      timerElement.textContent = timeRemaining;
  }

  // Function to create multiple reduce time buttons
  function createReduceTimeButtons(numberOfButtons) {
      for (let i = 0; i < numberOfButtons; i++) {
          createButton('reduceTimeButton', './images/notReg/'+getRandomNotRegImage(), reduceTimeButtonClickHandler);
      }
  }
  // Function to get a random image from the images folder
  function getRandomNotRegImage() {
    // Array containing image filenames
    const imageFilenames = ['image0.jpeg','image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg','image6.jpeg','image7.jpeg','image8.jpeg','image9.jpeg', 'image10.jpeg']; // Add more filenames as needed

    // Get a random index
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);

    // Return the selected image filename
    return imageFilenames[randomIndex];
  }
  // Function to get a random image from the images folder
  function getRandomRegImage() {
    // Array containing image filenames
    const imageFilenames = ['image0.jpeg','image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg']; // Add more filenames as needed
  
    // Get a random index
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
  
    // Return the selected image filename
    return imageFilenames[randomIndex];
  }

  // Function to create the add time button and additional reduce time buttons
  function createButtons() {
      createButton('addTimeButton', 'images/Reg/'+ getRandomRegImage() , addTimeButtonClickHandler);
      const numberOfButtons = Math.floor(Math.random() * 10) + 5; // Random number of reduce time buttons (1 to 4)
      createReduceTimeButtons(numberOfButtons);
  }

  function updateButtonPositions() {
    const buttons = document.querySelectorAll('img');
    buttons.forEach(button => {
        const canvasRect = canvas.getBoundingClientRect(); // Get canvas position on the page
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        // Calculate random position within a percentage of canvas width and height
        const randomXPercent = Math.random() * 0.8 + 0.1; // Random value between 10% and 90%
        const randomYPercent = Math.random() * 0.8 + 0.1; // Random value between 10% and 90%
        
        const randomX = Math.floor(randomXPercent * canvasWidth);
        const randomY = Math.floor(randomYPercent * canvasHeight);

        const buttonX = canvasRect.left + randomX;
        const buttonY = canvasRect.top + randomY;

        button.style.left = buttonX + 'px';
        button.style.top = buttonY + 'px';
    });
  }


  // Function to decrease the time remaining and update the timer display
  function countdown() {
    // Decrease the time remaining
    timeRemaining--;

    // Update the timer display
    updateTimer();

    // Check if time has run out
    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer
        alert('Time\'s up!'); // Display a message or perform any action when time is up
    }
  }

  // Start the countdown timer
  const timerInterval = setInterval(countdown, 1000); // Run countdown every second (1000 milliseconds)


  // Call the function to create the buttons
  createButtons();
});

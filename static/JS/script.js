document.getElementById('uploadLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    // Show the popup
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    // Hide the popup
    document.getElementById('popup').style.display = 'none';
});

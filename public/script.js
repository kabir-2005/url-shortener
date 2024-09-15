document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const longUrl = document.getElementById('longUrl').value;
    const resultDiv = document.getElementById('result');
    const shortUrlElement = document.getElementById('shortUrl');

    try {
        const response = await fetch('http://localhost:5000/shorten', {  // Ensure this URL matches your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longUrl })
        });

        const data = await response.json();
        if (response.ok) {
            shortUrlElement.href = data.shortUrl;
            shortUrlElement.textContent = data.shortUrl;
            resultDiv.classList.remove('hidden');
        } else {
            alert('Error shortening URL: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error shortening URL');
    }
});

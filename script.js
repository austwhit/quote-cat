async function getRandomContent() {
        try {
            // Fetch both the random quote and cat gif concurrently using async/await
            const [quoteResponse, catGifResponse] = await Promise.all([
                fetch('https://api.quotable.io/random'),
                fetch('https://cataas.com/cat/gif')
            ]);

            const [quoteData, catGifUrl] = await Promise.all([
                quoteResponse.json(),
                catGifResponse.url
            ]);

            // Display the quote and cat gif on the webpage
            displayContent(quoteData, catGifUrl);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    function displayContent(quote, catGifUrl) {
        // Display the quote
        const quoteContainer = document.getElementById('quote-container');
        quoteContainer.innerHTML = '';
        const quoteText = document.createElement('p');
        quoteText.textContent = `"${quote.content}"`;
        const quoteAuthor = document.createElement('p');
        quoteAuthor.textContent = `- ${quote.author}`;
        quoteContainer.appendChild(quoteText);
        quoteContainer.appendChild(quoteAuthor);

        // Display the cat gif
        const catContainer = document.getElementById('cat-container');
        catContainer.innerHTML = '';
        const catImage = document.createElement('img');
        catImage.src = catGifUrl;
        catImage.alt = 'Random Cat Gif';
        catContainer.appendChild(catImage);
    }
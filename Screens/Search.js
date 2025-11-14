let debounceTimer;

function debouncedSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchPodcasts();
    }, 300);
}

async function searchPodcasts() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('liveSearchResults');

    if (query.length === 0) {
        resultsContainer.innerHTML = ''; 
        resultsContainer.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://listen-api.listennotes.com/api/v2/search?q=${encodeURIComponent(query)}&type=podcast`, {
            method: 'GET',
            headers: {
                'X-ListenAPI-Key': 'cb2038d4dbd841b39dec5309c31b2d6a'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const podcasts = data.results;

            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'block'; 

            if (podcasts.length > 0) {
                podcasts.forEach(podcast => {
                    const podcastElement = document.createElement('div');
                    podcastElement.classList.add('search-result-item');
                    podcastElement.innerHTML = `
                        <img src="${podcast.thumbnail}" alt="${podcast.title_original}" class="search-result-img">
                        <div>
                            <h3>${podcast.title_original}</h3>
                            <p>${podcast.publisher_original}</p>
                        </div>
                    `;
                    podcastElement.addEventListener('click', () => {
                        fetchPodcastDetails(podcast.id); // Fetch podcast details and open modal
                        closeSearchResults(); // Close the search results after selection
                    });
                    resultsContainer.appendChild(podcastElement);
                });
            } else {
                resultsContainer.innerHTML = `<p>No results found.</p>`;
            }
        }
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        resultsContainer.innerHTML = '<p>Error fetching search results. Please try again later.</p>';
    }
}

function closeSearchResults() {
    const resultsContainer = document.getElementById('liveSearchResults');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'none';
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-bar')) {
        closeSearchResults();
    }
});

function fetchPodcastDetails(podcastId) {
    console.log("Fetching podcast details for:", podcastId); // For debugging

    // Fetching the podcast details from Listen Notes API
    fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}`, {
        method: 'GET',
        headers: {
            'X-ListenAPI-Key': 'cb2038d4dbd841b39dec5309c31b2d6a'
        }
    })
    .then(response => response.json())
    .then(podcast => {
        // Populate the modal content with podcast details
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${podcast.title}</h2>
                <span class="heart-icon" onclick="toggleFavorite(this, '${podcast.id}', '${podcast.title}', '${podcast.thumbnail}', '${podcast.publisher}')">&#9825;</span>
            </div>
            <img src="${podcast.thumbnail}" alt="${podcast.title}">
            <p><strong>Publisher:</strong> ${podcast.publisher}</p>
            <p><strong>Description:</strong> ${podcast.description}</p>
            <iframe src="https://www.listennotes.com/c/${podcast.id}/embed/" height="200px" width="100%" frameborder="0" scrolling="yes" loading="lazy"></iframe>
        `;
        // Show the modal
        document.getElementById('podcastModal').style.display = 'block';

        // Activate the audio player for the selected podcast
        activateAudioPlayer(podcast.id);
    })
    .catch(error => {
        console.error("Error fetching podcast details:", error);
    });
}

function closeModal() {
    document.getElementById('podcastModal').style.display = 'none';
    deactivateAudioPlayer(); // Stop the audio when modal is closed
}

function deactivateAudioPlayer() {
    const audioPlayer = document.getElementById('fixedPlayer');
    audioPlayer.style.display = 'none';
}

function activateAudioPlayer(podcastId) {
    const audioPlayer = document.getElementById('fixedPlayer');
    const iframe = document.getElementById('fixedPlayerIframe');
    iframe.src = `https://www.listennotes.com/c/${podcastId}/embed/`;
    audioPlayer.style.display = 'block'; // Show the player
}

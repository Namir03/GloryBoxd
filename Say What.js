const reviewsContainer = document.getElementById('reviews-container');

document.addEventListener('DOMContentLoaded', function() {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    storedReviews.forEach(reviewData => {
        addReviewToPage(reviewData);
    });
});

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh on form submission

    const movieTitle = document.getElementById('movie-title').value;
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;
    const rating = document.getElementById('rating').value;

    const reviewData = {
        movieTitle,
        reviewerName,
        reviewText,
        rating,
        likes: 0
    };

    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    storedReviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(storedReviews));

    addReviewToPage(reviewData);

    document.getElementById('reviewForm').reset();
});

function addReviewToPage(reviewData) {
    const review = document.createElement('div');
    review.classList.add('review');

    review.innerHTML = `
        <h3>${reviewData.reviewerName} <span class="movie-quote">(May the Force be with you)</span></h3>
        <div class="movie-title">${reviewData.movieTitle} (${reviewData.rating} ⭐)</div>
        <div class="review-text">${reviewData.reviewText}</div>
        <div class="reviewer-info">Reviewed by ${reviewData.reviewerName}</div>
        <button class="like-button" onclick="likeReview(this)">❤️ ${reviewData.likes}</button>
    `;

    reviewsContainer.appendChild(review);
}

function likeReview(button) {
    let currentLikes = parseInt(button.textContent.split(' ')[1]);
    button.textContent = `❤️ ${currentLikes + 1}`;

    const reviewText = button.previousElementSibling.previousElementSibling.textContent;
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewIndex = storedReviews.findIndex(review => review.reviewText === reviewText);
    if (reviewIndex > -1) {
        storedReviews[reviewIndex].likes = currentLikes + 1;
        localStorage.setItem('reviews', JSON.stringify(storedReviews));
    }
}

const postsGrid = document.querySelector("#posts-grid");
const resultCount = document.querySelector("#result-count");

function getPosts() {
  fetch("https://dummyjson.com/posts?limit=12")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load the posts.");
      }

      return response.json();
    })
    .then(function (data) {
      showPosts(data.posts);
    })
    .catch(function (error) {
      resultCount.textContent = "There was a problem";
      postsGrid.innerHTML = `<div class="status"><strong>Posts could not be loaded.</strong>${error.message}</div>`;
    });
}

function showPosts(posts) {
  resultCount.textContent = `${posts.length} stories`;
  postsGrid.innerHTML = "";

  posts.forEach(function (post) {
    const postCard = document.createElement("article");
    postCard.className = "post-card";

    postCard.innerHTML = `
      <div class="post-body">
        <div class="post-tag">${post.tags[0] || "journal"}</div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.body}</p>
        <div class="post-meta">
          <span>Post #${post.id}</span>
          <button class="read-button" type="button">Read story</button>
        </div>
      </div>
    `;

    postsGrid.appendChild(postCard);
  });
}
getPosts();

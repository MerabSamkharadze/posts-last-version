"use strict ";
const posts_container = document.querySelector(".posts_container");

function ajaxFncPosts(url, callback) {
  fetch(url, { method: "GET" })
    .then((responseInfo) => {
      if (!responseInfo.ok) throw responseInfo.status;
      return responseInfo.json();
    })
    .then((responseData) => {
      callback(responseData);
    })
    .catch((error) => {
      const h1 = document.createElement("h1");
      h1.innerText = "Server Problem 😣";
      posts_container.appendChild(h1);
    });
}

ajaxFncPosts("https://jsonplaceholder.typicode.com/posts", createPostsContent);
function createPostsContent(data) {
  data.forEach((element) => {
    createDivPosts(element);
  });
}
function createDivPosts(element) {
  console.log(element);
  const divPost = document.createElement("div");
  divPost.classList.add("post");
  divPost.setAttribute("id", element.id);

  const title = document.createElement("h2");
  title.textContent = element.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("delete_id", element.id);

  divPost.appendChild(title);
  divPost.appendChild(deleteBtn);
  posts_container.appendChild(divPost);
}

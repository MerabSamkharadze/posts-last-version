"use strict ";
const posts_container = document.querySelector(".posts_container");
const overlay = document.querySelector(".overlay");
const overlay_title = document.getElementById("overlay_title");
const overlay_body = document.getElementById("overlay_body");
const close_overlay = document.getElementById("close_overlay");
const add_post = document.querySelector(".add_post");
const addIcon = document.getElementById("addIcon");

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

  divPost.addEventListener("click", function (e) {
    overlay.classList.add("active");
    let divId = this.getAttribute("id");
    let link = `https://jsonplaceholder.typicode.com/posts/${divId}`;
    ajaxFncPosts(link, function (data) {
      overlay_title.textContent = data.title;
      overlay_body.textContent = data.body;
    });
  });

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    deleteBtn.classList.add("disabled");
    let id = this.getAttribute("delete_id");
    let link = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(link, {
      method: "DELETE",
    }).then(() => divPost.remove());
  });
  posts_container.appendChild(divPost);
}

close_overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  overlay_title.textContent = "";
  overlay_body.textContent = "";
});
overlay.addEventListener("click", function (e) {
  if (e.target === this) {
    overlay.classList.remove("active");
    overlay_title.textContent = "";
    overlay_body.textContent = "";
  }
});
addIcon.addEventListener("click", () => {
  add_post.classList.add("active");
});

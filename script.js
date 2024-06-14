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

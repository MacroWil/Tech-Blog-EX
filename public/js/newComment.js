async function newFormHandler(event) {
  event.preventDefault();

  const comment_body = document.querySelector("#textInput").value;
  const url = window.location.toString().split("/");
  const blogPost_id = url[url.length - 1];
  console.log(blogPost_id);

  if (comment_body) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        comment_body,
        blogPost_id,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/login");
      alert("Please Log in!");
    }
  }
}

document
  .querySelector("#commentForm")
  .addEventListener("submit", newFormHandler);

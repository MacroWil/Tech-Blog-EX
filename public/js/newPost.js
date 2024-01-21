//create new blog post
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#titleInput").value;
  const description = document.querySelector("#textInput").value;

  console.log(title, description);

  if (title && description) {
    const response = await fetch(`/api/blogposts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response.ok) {
      document.location.replace("/api/dashboard");
    } else {
      alert("Failed to add blog post");
    }
  }
}

document
  .querySelector("#userInputForm")
  .addEventListener("submit", newFormHandler);

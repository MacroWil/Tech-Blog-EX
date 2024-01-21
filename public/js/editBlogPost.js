async function updateFormHandler(event) {
    event.preventDefault();
    console.log(event)
    
    const pathArray = window.location.pathname.split("/")
    const id = Number(pathArray[pathArray.length - 1])

  
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;

  
    if (title && description && id) {
      const response = await fetch(`/api/blogposts/${id}`, {
        method: "PUT",
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
        alert("Failed to update blog post");
      }
    }
  }
  
  document
    .querySelector("#updatePost")
    .addEventListener("submit", updateFormHandler);
  
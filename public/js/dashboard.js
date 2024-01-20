//create new blog post
async function newFormHandler(event) {
    event.preventDefault();


const title = document.querySelector('#postTitle').value;
const description = document.querySelector('#postContent').value;

console.log("Request Payload:", { title, description });

const response = await fetch(`/api/blogposts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add blog post');
  }

}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

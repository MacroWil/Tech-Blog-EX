//create new blog post
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#titleInput').value;
    const description = document.querySelector('#textInput').value;
    console.log(title, description)

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
    // if (response.ok) {
    //     document.location.replace('/');
    // } else {
    //     alert('Failed to add blog post');
    // }

}

document.querySelector('#userInputForm').addEventListener('submit', newFormHandler);

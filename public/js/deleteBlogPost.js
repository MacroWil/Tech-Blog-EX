async function deletePost(blogId) {
    console.log(blogId)
    await fetch(`/api/blogposts/${blogId}`, {
      method: "DELETE",
    });
    window.location.reload();
  }
  
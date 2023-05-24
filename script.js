const blogContainer = document.getElementById('blog-container');

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(blogs => {
    blogs.forEach(blog => {
      const blogElement = document.createElement('div');
      blogElement.classList.add('blog');
      blogElement.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.body}</p>
        <button class="delete-btn">Delete</button>
      `;
      blogContainer.appendChild(blogElement);
    });
  });


  const addBlogForm = document.getElementById('add-blog-form');

  addBlogForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
    const title = titleInput.value;
    const content = contentInput.value;
  
    const newBlog = {
      title: title,
      body: content
    };
  
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    })
      .then(response => response.json())
      .then(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('blog');
        blogElement.innerHTML = `
          <h2>${blog.title}</h2>
          <p>${blog.body}</p>
          <button class="delete-btn">Delete</button>
        `;
        blogContainer.appendChild(blogElement);
  
        titleInput.value = '';
        contentInput.value = '';
      });
  });
  

  blogContainer.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
      const blogElement = event.target.parentNode;
      const blogId = blogElement.dataset.id;
  
      fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
        method: 'DELETE'
      })
        .then(() => {
          blogElement.remove();
        });
    }
  });
  
export const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const filteredData = data.slice(0, 10);
    return filteredData;
}

export const addPost = async (message) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: message,
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await response.json();
  return data;
}
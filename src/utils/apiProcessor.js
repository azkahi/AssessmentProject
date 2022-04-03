const baseUrl = 'https://api.artic.edu/api/v1';
const headers = {
  'Content-Type': 'application/json',
};

export const fetchHomeData = async (pageNumber = 0, limit = 15) => {
  const url = `${baseUrl}/artworks`;
  const response = await fetch(`${url}?page=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: headers,
  }).catch(err => {
    console.error(err);
    return err;
  });

  return response.json();
};

export const searchData = async (query = '', page = 0, limit = 15) => {
  console.log({page});
  const url = `${baseUrl}/artworks/search`;
  const response = await fetch(
    `${url}?q=${query}&page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: headers,
    },
  ).catch(err => {
    console.error(err);
    return err;
  });

  return response.json();
};

export const fetchUrlDetail = async (url = '') => {
  return fetch(url, {
    method: 'GET',
    headers: headers,
  });
};

import { useState, useEffect } from "react";

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const url = 'http://media.mw.metropolia.fi/wbma/media/';

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(apiUrl + 'media');
    const json = await response.json();

    const result = await Promise.all(json.map(async (item) => {
      const response = await fetch(url + item.file_id);
      return await response.json();
    }));

    setData(result);
    setLoading(false);

  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

const login = async (data) => {
  const response = await fetch(apiUrl + "login/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    })
  });
  return response.json();
};

const register = async (data) => {
  const response = await fetch(apiUrl + "users/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      email: data.email,
      full_name: data.fullname,
    })
  });
  return response.json();
};

export { getAllMedia, login, register };

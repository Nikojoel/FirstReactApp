import { useState, useEffect } from "react";
import {AsyncStorage} from "react-native";

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

const getProfPic = async (user) => {
  const response = await fetch (apiUrl + "tags/avatar_" + user);
  return response.json();
};

const checkUserName = async (userName) => {
  const response = await fetch (apiUrl + "users/username/" + userName);
  return response.json();
};

const uploadImage = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await fetch ('http://media.mw.metropolia.fi/wbma/media', {
    method: "POST",
    body: data,
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  });
  return response.json();
};

const getUser = async (userId) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await fetch (apiUrl + "users/" + userId, {
    headers: {
      "x-access-token": token,
    }
  });
  return response.json();
};


export { getAllMedia, login, register, getProfPic, checkUserName, uploadImage, getUser};

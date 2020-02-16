import {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const url = 'http://media.mw.metropolia.fi/wbma/media/';

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    try {
      const response = await fetch(apiUrl + 'media');
      const json = await response.json();

      const result = await Promise.all(json.map(async (item) => {
        const response = await fetch(url + item.file_id);
        return await response.json();
      }));

      setData(result);
      setLoading(false);
    } catch (e) {
      console.log("fetch url error", e);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

const getAllUserMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = await fetch(url + 'user/', {
        headers: {
          "x-access-token": token,
        }
      });
      const json = await data.json();

      const result = await Promise.all(json.map(async (item) => {
        const response = await fetch(url + item.file_id);
        return await response.json();
      }));

      setData(result);
      setLoading(false);
    } catch (e) {
      console.log("fetchmedia error", e);
    }
  };
  useEffect(() => {
    fetchMedia();
  }, []);
  return [data, loading];
};

const login = async (data) => {
  try {
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
  } catch (e) {
    console.log("login error", e);
  }
};

const register = async (data) => {
  try {
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
  } catch (e) {
    console.log("register error")
  }
};

const getProfPic = async (user) => {
  try {
    const response = await fetch(apiUrl + "tags/avatar_" + user);
    return response.json();
  } catch (e) {
    console.log("get profpic error", e);
  }
};

const checkUserName = async (userName) => {
  try {
    const response = await fetch(apiUrl + "users/username/" + userName);
    return response.json();
  } catch (e) {
    console.log("check username error", e);
  }
};

const uploadImage = async (data) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media', {
      method: "POST",
      body: data,
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": token,
      },
    });
    return response.json();
  } catch (e) {
    console.log("upload image error", e);
  }
};

const getUser = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(apiUrl + "users/" + userId, {
      headers: {
        "x-access-token": token,
      }
    });
    return response.json();
  } catch (e) {
    console.log("get user error", e);
  }
};

const deleteFile = async (fileId) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(url + fileId, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      }
    });
    return response.json();
  } catch (e) {
    console.log("delete file error", e);
  }
};

const updatePost = async (data) => {
  let formBody = [];
  for (let property in data.data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data.data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(url + data.fileId, {
      method: "PUT",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody,
    });
    return response.json();
  } catch (e) {
    console.log("update post error", e);
  }
};

export {
  getAllMedia,
  login,
  register,
  getProfPic,
  checkUserName,
  uploadImage,
  getUser,
  getAllUserMedia,
  deleteFile,
  updatePost
};

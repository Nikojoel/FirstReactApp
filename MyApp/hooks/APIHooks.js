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

export { getAllMedia };

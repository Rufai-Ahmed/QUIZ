import axios from "axios";

const URL: string = "http://localhost:4000/api/v1";

export const getKids = async () => {
  try {
    return await axios.get(`${URL}/viewKids`).then((res) => {
      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const sortedKids = async () => {
  try {
    return await axios.get(`${URL}/sortedKids`).then((res) => {
      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};

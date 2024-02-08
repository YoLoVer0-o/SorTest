import axios from "axios";

const loginAPI = {
  login: async (formData) => {
    try {
      const urlEncodedData = new URLSearchParams(formData).toString();

      const response = await axios.post(
        `http://192.168.10.111:8000/auth/token`,
        urlEncodedData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },

  getUser: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/auth/users/me/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      // console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },
};

export default loginAPI;

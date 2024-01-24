import axios from "axios";

const loginAPI = {
  login: async (formData) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/auth/token`,
        formData
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default loginAPI;

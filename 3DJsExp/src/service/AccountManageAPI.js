import axios from "axios";

const AccountManageAPI = {
  getProfile: async (token) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_profile/`,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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
  getGroupProfile: async (token) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_group_profile/`,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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
  upDateLabelProfile: async (url,token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/update_label_profile/?url=${url}`,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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
  upDateLabelGroupProfile: async (content,token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/update_label_group_profile/?url=${content}`,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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

export default AccountManageAPI;

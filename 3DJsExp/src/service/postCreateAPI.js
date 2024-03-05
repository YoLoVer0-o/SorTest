import axios from "axios";

const postCreateAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////
  fbGetBotConfig: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/facebook/get_bot_config_with_status/",
        {
          headers: {
            Authorization: "Bearer " + token.token,
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

  fbPostAction: async (post, token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/action_to_post/`,
        post,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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

  fbPostActionToGroup: async (post, token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/action_to_postGroup/`,
        post,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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

  fbUploadFile: async (files,token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload-image/`,
        files,
        {
          headers: {
            Authorization: "Bearer " + token.token,
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default postCreateAPI;

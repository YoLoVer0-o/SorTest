import axios from "axios";

const RPAUserAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////
  fbGetBotConfig: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/facebook/get_bot_config_with_status/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbDownloadUser: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/download/user_format/`
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbUploadUser: async (file) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload/user_format/`,
        file
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbAddUser: async (user) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/insert_bot_config/",
        user
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbUpdateBotConfig: async (bot_name, bot_config) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/facebook/update_bot_config/${bot_name}`,
        bot_config
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbDeleteBotConfig: async (bot_name) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/facebook/update_bot_config/${bot_name}`
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPAUserAPI;

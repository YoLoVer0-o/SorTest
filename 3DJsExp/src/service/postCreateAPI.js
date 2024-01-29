import axios from "axios";

const postCreateAPI = {
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

  fbPostAction: async (post) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/action_to_post/`,
        post
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default postCreateAPI;

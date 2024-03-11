import axios from "axios";

const twitterCreatePostAPI = {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  twitterPostAction: async (post, token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/action_to_post/`,
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

  twitterUploadFile: async (files, token) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/upload-image/`,
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

export default twitterCreatePostAPI;

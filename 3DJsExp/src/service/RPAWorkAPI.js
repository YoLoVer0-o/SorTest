import axios from "axios";

const RPAWorkAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  fbDownloadWork: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/download/work_format_file/`,
        {
          responseType: "blob",
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

  fbUploadWork: async (file) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload/work_format/`,
        file
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

  fbScrapTimeLineTask: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/scrap_timeline_with_task/${payload.botname}?task=${payload.task}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
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

  fbScrapPostTask: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/scrap_facebook_post_with_task/${payload.botname}?task=${payload.task}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
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

  fbScrapProfileTask: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/scrap_profile_with_task/${payload.botname}?task=${payload.task}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
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

  fbScrapInteractionTask: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/scrap_interaction_with_task/${payload.botname}?task=${payload.task}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
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

export default RPAWorkAPI;

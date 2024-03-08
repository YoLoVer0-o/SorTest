import axios from "axios";

const RPAWorkAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  fbGetActionLog: async (token) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_action_log/`,
        {
          headers: {
            Authorization: "Bearer " + token,
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

  fbGetAllBot: async (token) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_all_bot/`,
        {
          headers: {
            Authorization: "Bearer " + token,
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

  ////////////////////////////////////////twitter/////////////////////////////////////////////////////////////////

  // twGetActionLog: async (token) => {
  //   try {
  //     const response = await axios.get(
  //       `http://192.168.10.111:8000/facebook/get_action_log/`,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     // console.log(error);
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //     throw error;
  //   }
  // },

  twGetAllBot: async (token) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/twitter/get_all_bot/`,
        {
          headers: {
            Authorization: "Bearer " + token,
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

  twDownloadWork: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/twitter/download/work_format_file/`,
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

  twUploadWork: async (file) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/upload/work_format/`,
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

  twScrapHastag: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/scrap_hashtag/{botname}/${payload.botname}?search_raw=${payload.task}`,
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

  ////////////////////////////////////////tiktok/////////////////////////////////////////////////////////////////

  ttGetAllWork: async (token, pageIndex) => {
    try {
      const response = await axios.get(
        `http://192.168.10.112:8000/tiktok/status/?page=${pageIndex.current}&items_per_page=${pageIndex.pageSize}`
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

  ttCreateURL: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.112:8000/tiktok/urls/`,
        payload
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

  ////////////////////////////////////////youtube/////////////////////////////////////////////////////////////////

  ytGetAllWork: async (token, pageIndex) => {
    try {
      const response = await axios.get(
        `http://192.168.10.112:8000/youtube/status/?page=${pageIndex.current}&items_per_page=${pageIndex.pageSize}`
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

  ytCreateURL: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.112:8000/youtube/urls/`,
        payload
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

  ////////////////////////////////////////instagram/////////////////////////////////////////////////////////////////

  igGetAllWork: async (token, pageIndex) => {
    try {
      const response = await axios.get(
        `http://192.168.10.112:8000/ig/status/?page=${pageIndex.current}&items_per_page=${pageIndex.pageSize}`
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

  igCreateURL: async (token, payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.112:8000/ig/urls/`,
        payload
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
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

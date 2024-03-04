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

  fbGetBotGroup: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/facebook/get_all_groups/",
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

  fbAddBotGroup: async (token, group) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/add_group/",
        group,
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

  fbDeleteBotGroup: async (token, id) => {
    try {
      const response = await axios.delete(
        "http://192.168.10.111:8000/facebook/delete_group/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: id,
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

  fbDownloadUser: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/download/user_format_file/`,
        {
          responseType: "blob",
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

  fbUploadUser: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload/user_format/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  fbAddUser: async (token, user) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/insert_bot_config/",
        user,
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

  fbUpdateBotConfig: async (token, bot_name, bot_config) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/facebook/update_bot_config/${bot_name}`,
        bot_config,
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

  fbDeleteBotConfig: async (token, bot_name) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/facebook/delete_bot_config/${bot_name}`,
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
  twGetBotConfig: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/twitter/get_bot_config_with_status/",
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

  twGetBotGroup: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/twitter/get_all_groups/",
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

  twAddBotGroup: async (token, group) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/twitter/add_group/",
        group,
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

  twDeleteBotGroup: async (token, id) => {
    try {
      const response = await axios.delete(
        "http://192.168.10.111:8000/twitter/delete_group/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: id,
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

  twDownloadUser: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/twitter/download/user_format_file/`,
        {
          responseType: "blob",
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

  twUploadUser: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/upload/user_format/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  twAddUser: async (token, user) => {
    try {
      const response = await axios.put(
        "http://192.168.10.111:8000/twitter/insert_bot_config/",
        user,
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

  twUpdateBotConfig: async (token, bot_name, bot_config) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/twitter/update_bot_config/${bot_name}`,
        bot_config,
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

  twDeleteBotConfig: async (token, bot_name) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/twitter/delete_bot_config/${bot_name}`,
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

export default RPAUserAPI;

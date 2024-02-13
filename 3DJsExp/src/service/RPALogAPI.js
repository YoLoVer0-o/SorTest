import axios from "axios";

const RPALogAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  fbErrlog: async (token, start, end) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_activity_log/?log_level_limit=ERROR&start_datetime=${start}&end_datetime=${end}`,
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

  fbInfolog: async (token, start, end) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_activity_log/?log_level_limit=INFO&start_datetime=${start}&end_datetime=${end}`,
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPALogAPI;

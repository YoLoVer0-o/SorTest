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
    } catch (e) {
      console.log(e);
      throw e;
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPALogAPI;

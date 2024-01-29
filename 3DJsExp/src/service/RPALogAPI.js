import axios from "axios";

const RPALogAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  fbErrlog: async (date) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_activity_log/?log_level_limit=ERROR&start_datetime=${date.start}&end_datetime=${date.end}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbInfolog: async (date) => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/get_activity_log/?log_level_limit=INFO&start_datetime=${date.start}&end_datetime=${date.end}`
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

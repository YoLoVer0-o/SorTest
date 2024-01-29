import axios from "axios";

const RPAWorkAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  fbDownloadWork: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/download/work_format/`
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbUploadWork: async (file) => {
    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload/work_format/`,
        file
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPAWorkAPI;

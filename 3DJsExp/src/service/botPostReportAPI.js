import axios from "axios";

const botPostReportAPI = {
  getBotPost: async () => {
    try {
      const response = await axios.get("http://192.168.10.122/getBotPost");
      return response.data; // Return the response data
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

  getBotPostById: async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getBotPostByID?post_id=${id}`
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

  getComment: async (type, topic, page) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122//getComment?type=${type}&topic=${topic}&current_page=2`
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
};

export default botPostReportAPI;

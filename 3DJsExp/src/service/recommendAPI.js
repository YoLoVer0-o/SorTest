import axios from "axios";

const recommendAPI = {
  recommend: async (search) => {
    try {
      const response = await axios.post(
        `http://192.168.10.123/recommend`,
        search
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

  engagement: async (rowperpage) => {
    try {
      const response = await axios.post(
        `http://192.168.10.123/engagement`,
        rowperpage
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

export default recommendAPI;

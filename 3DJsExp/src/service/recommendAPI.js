import axios from "axios";

const recommendAPI = {
  getWordCloud: async (start_date, end_date, topic) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getWordCloud?start_date=${start_date}&end_date=${end_date}&topic=${topic}`,
        {
          responseType: "arraybuffer",
        }
      );
      // console.log(response);
      // const blob = await response.blob();
      // return blob;
      return response.data;
      // Return the response data
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

  getHashTag: async () => {
    try {
      const response = await axios.get(`http://192.168.10.122/getHashTag`);
      return response.data;
      // Return the response data
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },

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
        `http://192.168.10.123/engagement?top=${rowperpage}`
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

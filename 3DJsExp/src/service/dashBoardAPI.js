import axios from "axios";

const dashBoardAPI = {
  getAllDailyPost: async (start_date, end_date) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getAllDailyPost?start_date=${start_date}&end_date=${end_date}`
      );
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

  getTopicDailyPost: async (start_date, end_date, topic) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getTopicDailyPost?start_date=${start_date}&end_date=${end_date}&topic=${topic}`
      );
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

  getAllSentiment: async (start_date, end_date) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getAllSentiment?start_date=${start_date}&end_date=${end_date}`
      );
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

  getTopicSentiment: async (start_date, end_date, topic) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getTopicSentiment?start_date=${start_date}&end_date=${end_date}&topic=${topic}`
      );
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

  getStat: async (search) => {
    try {
      const response = await axios.post(
        `http://192.168.10.121:8000/stat/data`,
        search
      );
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

  getSocial: async (search) => {
    try {
      const response = await axios.post(
        `http://192.168.10.121:8000/stat/social`,
        search
      );
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

  getMaxEngagement: async (search) => {
    try {
      const response = await axios.post(
        `http://192.168.10.121:8000/report/maxengagement`,
        search
      );
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

  getPostImage: async (payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.121:8000/report/images?size=300`,
        payload
      );
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

  getHashTag: async (payload) => {
    try {
      const response = await axios.post(
        `http://192.168.10.121:8000/stat/gettrends`,
        payload
      );
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
};

export default dashBoardAPI;

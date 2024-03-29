import axios from "axios";

const botPostReportAPI = {
  getBotPost: async (page, isbot, start, end, text) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getBotPost?current_page=${page}` +
          `${isbot !== "" ? `&is_bot=${isbot}` : ""}` +
          `${start !== "" ? `&start_date=${start}` : ""}` +
          `${end !== "" ? `&end=${end}` : ""}` +
          `${text !== "" ? `&search_text=${text}` : ""}`
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

  getComment: async (type, topic, id, page) => {
    try {
      const response = await axios.get(
        `http://192.168.10.122/getComment?type=${type}&topic=${topic}&post_id=${id}&current_page=${page}`
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

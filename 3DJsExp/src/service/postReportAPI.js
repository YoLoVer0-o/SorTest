import axios from "axios";

const postReportAPI = {
  getTagetPost: async (search) => {
    try {
      const response = await axios.post(
        "http://192.168.10.121:8000/report/list",
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

  getTags: async () => {
    try {
      const response = await axios.get("http://192.168.10.121:8000/report/tag");
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

  getFB: async () => {
    try {
      const response = await axios.get("http://192.168.10.121:8000/report/fb");
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

  //   getPostById: async ($oid) => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/posts/${$oid}`);
  //       return response.data;
  //     } catch (e) {
  //       console.log(e);
  //       throw e;
  //     }
  //   },
};

export default postReportAPI;

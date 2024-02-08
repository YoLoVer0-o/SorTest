import axios from "axios";

const postReportAPI = {
  getAllPost: async () => {
    try {
      const response = await axios.get("http://localhost:3000/list");
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

import axios from "axios";

const RPAManagementAPI = {
    
  getAllPost: async () => {
    try {
      const response = await axios.get("http://localhost:3000/list");
      return response.data; // Return the response data
    } catch (e) {
      console.log(e);
      throw e;
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

export default RPAManagementAPI;

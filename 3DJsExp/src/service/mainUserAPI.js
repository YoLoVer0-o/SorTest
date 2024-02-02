import axios from "axios";

const mainUserAPI = {
  getAllRole: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/auth/get_all_roles/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data; // Return the response data
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default mainUserAPI;

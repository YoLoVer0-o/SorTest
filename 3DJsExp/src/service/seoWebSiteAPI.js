import axios from "axios";

const seoWebSiteAPI = {
  getWebPosition: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.113:8000/SEO/website_position/`
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

  imagePosition: async (data) => {
    try {
      const response = await axios.get(
        `http://192.168.10.113:8000/SEO/website_position_image/?web_id=${data.web_id}&web_position=${data.web_position}&web_image=${data.web_image}`,
      
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
  seoWebSiteContent: async (data) => {
    try {
      const response = await axios.post(
        `http://192.168.10.113:8000/SEO/website_content/`,
        data
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
  webSiteUploadFile: async (files, imagePost) => {
    try {
      const response = await axios.post(
        `http://192.168.10.113:8000/SEO/website_uploadfile?web_id=${imagePost.web_id}&web_position=${imagePost.web_position}`,
        files
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

export default seoWebSiteAPI;

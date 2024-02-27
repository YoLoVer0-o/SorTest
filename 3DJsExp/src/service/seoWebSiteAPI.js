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
        `http://192.168.10.113:8000/SEO/website_position_image/`,
        data,
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
        data,
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
  webSiteUploadFile: async (data) => {
    try {
      const response = await axios.post(
        `http://192.168.10.113:8000/SEO/website_uploadfile/`,
        data, 
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

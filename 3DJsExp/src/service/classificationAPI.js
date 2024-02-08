import axios from "axios";

const classificationAPI = {
  getAllCat: async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.121:8000/contentkeyword/categories?page=1&items_per_page=10"
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

  getCatWord: async (cid, page, item) => {
    try {
      const response = await axios.get(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/keywords?page=${page}&items_per_page=${item}`
      );
      return response.data;
    }  catch (error) {
      // console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },

  createCat: async (cat) => {
    try {
      const response = await axios.post(
        "http://192.168.10.121:8000/contentkeyword/categories/",
        cat
      );
      return response;
    }  catch (error) {
      // console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },

  addKeyWord: async (cid, keywords) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/add_keyword`,
        keywords
      );
      return response;
    }  catch (error) {
      // console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      throw error;
    }
  },

  removeKeyWord: async (cid, keywords) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/remove_keyword?keyword=${keywords}`
      );
      return response;
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

  editKeyWord: async (cid, keywords, newStat) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/edit_keyword/${keywords}`,
        newStat
      );
      return response;
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

  deleteCat: async (cid) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}`
      );
      return response;
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

export default classificationAPI;

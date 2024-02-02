import axios from "axios";

const classificationAPI = {
  getAllCat: async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.121:8000/contentkeyword/categories?page=1&items_per_page=10"
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  getCatWord: async (cid, page, item) => {
    try {
      const response = await axios.get(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/keywords?page=${page}&items_per_page=${item}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  createCat: async (cat) => {
    try {
      const response = await axios.post(
        "http://192.168.10.121:8000/contentkeyword/categories/",
        cat
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  addKeyWord: async (cid, keywords) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/add_keyword`,
        keywords
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  removeKeyWord: async (cid, keywords) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/remove_keyword?keyword=${keywords}`
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  editKeyWord: async (cid, keywords, newStat) => {
    try {
      const response = await axios.put(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}/edit_keyword/${keywords}`,
        newStat
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  deleteCat: async (cid) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.121:8000/contentkeyword/categories/${cid}`
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default classificationAPI;

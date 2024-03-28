import axios from "axios";

const UserManageAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////

  getAllUser: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/auth/get_all_user_with_permission/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  addUser: async (token, payload) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/auth/signup",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  editUser: async (token, payload) => {
    try {
      const response = await axios.put(
        "http://192.168.10.111:8000/auth/edit_user/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  deleteUser: async (token, user) => {
    try {
      const response = await axios.delete(
        "http://192.168.10.111:8000/auth/delete_user/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: user,
        }
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

  addRole: async (token, payload) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/auth/add_role/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  assignRole: async (token, payload) => {
    try {
      const response = await axios.put(
        "http://192.168.10.111:8000/auth/assign_roles/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  editRole: async (token, payload) => {
    try {
      const response = await axios.put(
        "http://192.168.10.111:8000/auth/edit_role/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  deleteRole: async (token, user) => {
    try {
      const response = await axios.delete(
        "http://192.168.10.111:8000/auth/delete_role/",
        user,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default UserManageAPI;

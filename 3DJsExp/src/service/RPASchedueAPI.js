import axios from "axios";

const RPASchedueAPI = {
  ////////////////////////////////////////facebook/////////////////////////////////////////////////////////////////
  fbGetSchedule: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/facebook/get_schedule_task/",
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

  fbDownloadSchedule: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/facebook/download/schedule_format_file/`,
        {
          responseType: "blob",
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

  fbUploadSchedule: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/facebook/upload/schedule_format/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  fbAddSchedule: async (token, schedule) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/insert_schedule_task/",
        schedule,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  fbUpdateSchedule: async (token, task_id, task) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/facebook/update_schedule_task/${task_id}`,
        task,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  fbDeleteSchedule: async (task_id) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/facebook/delete_schedule_task/${task_id}`
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////twitter/////////////////////////////////////////////////////////////////
  twGetSchedule: async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.10.111:8000/twitter/get_schedule_task/",
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

  twDownloadSchedule: async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.111:8000/twitter/download/schedule_format_file/`,
        {
          responseType: "blob",
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

  twUploadSchedule: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://192.168.10.111:8000/twitter/upload/schedule_format/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  twAddSchedule: async (token, schedule) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/twitter/insert_schedule_task/",
        schedule,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  twUpdateSchedule: async (token, task_id, task) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/twitter/update_schedule_task/${task_id}`,
        task,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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

  twDeleteSchedule: async (task_id) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/twitter/delete_schedule_task/${task_id}`
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPASchedueAPI;

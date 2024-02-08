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
        `http://192.168.10.111:8000/facebook/download/schedule_format/`,
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

  fbAddSchedule: async (schedule) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/insert_schedule_task/",
        schedule
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

  fbUpdateSchedule: async (task_id, task) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/facebook/update_schedule_task/${task_id}`,
        task
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
};

export default RPASchedueAPI;

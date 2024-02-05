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
    } catch (e) {
      console.log(e);
      throw e;
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
    } catch (e) {
      console.log(e);
      throw e;
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbAddSchedule: async (schedule) => {
    try {
      const response = await axios.post(
        "http://192.168.10.111:8000/facebook/insert_schedule_task/",
        schedule
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbUpdateSchedule: async (task_id, task) => {
    try {
      const response = await axios.put(
        `http://192.168.10.111:8000/facebook/update_schedule_task/${task_id}`,
        task
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  fbDeleteSchedule: async (task_id) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.111:8000/facebook/delete_schedule_task/${task_id}`
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default RPASchedueAPI;

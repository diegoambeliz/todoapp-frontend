import axios, { AxiosHeaders } from "axios";
import { TaskCreate, TaskEdit, TaskView } from "./models/Task";
import { TaskGroupView } from "./models/TaskGroup";
import toast from "react-hot-toast";

const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

export async function taskGetAll(apiUrl:string): Promise<void | TaskGroupView[]>{
  return axios<TaskGroupView[]>({
        method: 'get',
        url: `${apiUrl}/Task`,
        responseType: 'json',
        httpsAgent
      })
        .then(function (response) {
          return response.data;
        })
        .catch(error => {
          toast.error("Error: " + error.message, {
            id: "error",
            position: "bottom-right"
          })
        })
}

export function taskCreate(apiUrl: string, task: TaskCreate){
  return axios({
      method: 'post',
      url: `${apiUrl}/Task`,
      data: task,
      httpsAgent
    })
      .then(function (response) {
        return true;
      })
      .catch(error => {
        toast.error("Error: " + error.message, {
          id: "error",
          position: "bottom-right"
        })
      })
}

export function taskUpdate(apiUrl: string, task: TaskEdit){
  return axios({
      method: 'put',
      url: `${apiUrl}/Task`,
      httpsAgent,
      data: task
    })
      .then(function (response) {
        return true;
      })
      .catch(error => {
        toast.error("Error: " + error.message, {
          id: "error",
          position: "bottom-right"
        })
      })
}

export function taskRemove(apiUrl: string, id: string){
  return axios({
      method: 'delete',
      url: `${apiUrl}/Task/${id}`,
      httpsAgent
    })
      .then(function (response) {
        return true;
      })
      .catch(error => {
        toast.error("Error: " + error.message, {
          id: "error",
          position: "bottom-right"
        })
      })
}
import axios from "axios";
import { Router } from "express";
import { Agent } from "https";
import { areParametersValid, getAxiosAuthConfig, getAxiosBaseUrl } from "../utils/route-utils";

const instance = axios.create(
    {httpsAgent: new Agent({rejectUnauthorized: false}), proxy: false}
    )
const todoRouter = Router()
    .get("/", async (req, res) => {
        try {
            console.log(req.headers)
            const options = getAxiosAuthConfig(req.headers.authorization)
            const result = await instance.get(`${process.env.TODO_TODO_SERVICE_PATH}/service/todo/`, options)
            return res.status(result.status).json(result.data);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Server error"})
        }
    })
    .post("/", async (req, res) => {
        try {
            const { startDate, endDate, title, priority, isDone } = req.body;
            if (!areParametersValid(startDate, endDate, title, priority, isDone)) {
                return res.status(400).json({message: "Parameters are not valid"})
            }
            const options = getAxiosAuthConfig(req.headers.authorization)
            const result = await instance.post(`${process.env.TODO_TODO_SERVICE_PATH}/service/todo/`, {startDate: startDate, endDate: endDate, title: title, priority: priority, isDone: isDone}, options)
            return res.status(result.status).json(result.data);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Server error"})
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const { startDate, endDate, title, priority, isDone } = req.body;
            const options = getAxiosAuthConfig(req.headers.authorization)
            const result = await instance.put(`${process.env.TODO_TODO_SERVICE_PATH}/service/todo/${req.params.id}`, {startDate: startDate, endDate: endDate, title: title, priority: priority, isDone: isDone}, options)
            return res.status(result.status).json(result.data);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Server error"})
        }
    })
    .put("/:id/status", async (req, res) => {
        try {
            const { status } = req.body;
            if (!areParametersValid(status)) {
                return res.status(400).json({message: "is_done is not valid"})
            }
            const options = getAxiosAuthConfig(req.headers.authorization)
            const result = await instance.put(`${process.env.TODO_TODO_SERVICE_PATH}/service/todo/${req.params.id}/status`, {status: status}, options)
            return res.status(result.status).json(result.data);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Server error"})
        }
    })
    .put("/:id/cancel", async (req, res) => {
        try {
            const options = getAxiosAuthConfig(req.headers.authorization)
            const result = await instance.put(`${process.env.TODO_TODO_SERVICE_PATH}/service/todo/${req.params.id}/cancel`, null, options)
            return res.status(result.status).json(result.data);
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Server error"})
        }
    })


export { todoRouter }
import axios from "axios";

axios.interceptors.request.use((config) => {
    config.headers["request-startTime"] = JSON.stringify(process.hrtime());
    return config;
});

axios.interceptors.response.use((response) => {
    const start = response.config.headers["request-startTime"];
    const end = process.hrtime(JSON.parse(start as string));
    const milliseconds = Math.round(end[0] * 1000 + end[1] / 1000000);
    response.headers["request-duration"] = milliseconds.toString();
    console.log(`Request took ${milliseconds}ms`);
    return response;
});

export { axios };

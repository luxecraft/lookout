import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
    minTime: 1000,
    maxConcurrent: 50,
});

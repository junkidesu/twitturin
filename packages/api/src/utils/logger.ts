import env from "./config";

const log = (...args: unknown[]) => {
    if (env.NODE_ENV !== "test") {
        console.log(...args);
    }
};

const error = (...args: unknown[]) => {
    if (env.NODE_ENV !== "test") {
        console.error(...args);
    }
};

export default {
    log, error
};
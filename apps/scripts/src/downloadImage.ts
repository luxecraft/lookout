import retry from "async-retry";
import { AxiosResponse } from "axios";
import { axios } from "./axios";
import fs from "fs";

export async function downloadImage(url: string, filepath: string) {
    const response = await retry(
        () =>
            axios({
                url,
                method: "GET",
                responseType: "stream",
                headers: {
                    accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9",
                    dnt: 1,
                    "sec-ch-ua": `"Not?A_Brand";v="8", "Chromium";v="108"`,
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "macOS",
                    "sec-fetch-dest": "image",
                    "sec-fetch-mode": "no-cors",
                    "sec-fetch-site": "same-site",
                    "user-agent":
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                },
            }),
        {
            retries: 5,
        }
    );
    return new Promise((resolve, reject) => {
        (response as AxiosResponse<any, any>).data
            .pipe(fs.createWriteStream(filepath))
            .on("error", () => {
                console.log(`Error downloading ${url}`);
                reject();
            })
            .once("close", () => resolve(filepath));
    });
}

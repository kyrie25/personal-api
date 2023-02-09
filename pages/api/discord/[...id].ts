import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { isSnowflake } from "../../../src/snowflake";

type Data = {
    id?: string | string[];
    error?: any;
    code?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let getUser;
    const userId = req.query?.id[0];

    if (!isSnowflake(userId))
        return res.send({
            error: `That is not a valid snowflake ID!`,
        });

    try {
        getUser = await axios(`https://discord.com/api/v9/users/${userId}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
        });
    } catch (error: any) {
        if (error.response.data && error.response.data.error.message)
            return res
                .status(404)
                .send({ error: error.response.data.error.message, code: error.response.data.error.code });

        if (error.response.status === 404) return res.status(404).send({ error: "Invalid user!" });

        console.log(error); // Only console log the error if its not a 404

        return res.status(400).send({
            error: `Something went wrong! Please try again later.`,
        });
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("access-control-allow-origin", "*");

    res.status(200).send(getUser.data);
}

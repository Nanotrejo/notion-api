import { Request, Response } from "express";
const { google } = require("googleapis");

const videos = (req: Request, res: Response) => {
    google.youtube('v3').playlistItems.list({
        part: 'snippet',
        key: process.env.YOUTUBE_API_KEY,
        playlistId: process.env.YOUTUBE_ID,
        maxResults: 100
    }).then((response: any) => {
        return res.json(response.data);
    })
}

module.exports = {
    videos,
};



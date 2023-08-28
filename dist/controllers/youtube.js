"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { google } = require("googleapis");
const videos = (req, res) => {
    google.youtube('v3').playlistItems.list({
        part: 'snippet',
        key: process.env.YOUTUBE_API_KEY,
        playlistId: process.env.YOUTUBE_ID,
        maxResults: 100
    }).then((response) => {
        return res.json(response.data);
    });
};
module.exports = {
    videos,
};
//# sourceMappingURL=youtube.js.map
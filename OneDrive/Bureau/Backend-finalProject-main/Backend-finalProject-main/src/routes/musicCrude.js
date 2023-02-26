const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
/////////////////// maybe get song by type
const {
    addSongToPlaylist,
    removeSongFromPlaylist,
    getSongById,
    getAllSongs,
    getSongsByIds,
    getSongsByType
    
}= require("../controllers/MusicControllers")


router.put("/addSongToPlaylist" ,isAuth ,addSongToPlaylist)//the request headers must contain a key = playlistid and the playlist's id as a value and a key = songid and the songid you want to add as its value
router.put("/removeSongFromPlaylist",isAuth ,removeSongFromPlaylist)//the request headers must contain a key = playlistid and the playlist's id as a value and a key = songid and the songid you want to remove as its value
router.get("/getSongById/:songid",isAuth ,getSongById)//only get the songid as params
router.get("/getAllSongs",isAuth ,getAllSongs) //does not get anything
router.get("/getSongsByIds",isAuth ,getSongsByIds)//the request body will take an array named songIds containing the ids as strings like the example below
router.get("/getSongsByType",getSongsByType) //the request body will take an array named types containing the music types as string there is an example below



module.exports = router;

//request body
//{
    // "types": [
    //     "pop",
    //     "rock",
    //     "hip-hop",
    //     "popmusic"
    //   ]
    // }


const express = require("express");

const{
    getArtistAlbums,
    addAlbum,
    deleteAlbum,
    updateAlbum,
} = require("../controllers/AlbumsControllers");

const{
    getUserPlaylists,
    addPlaylist,
    deletePlaylist,
    updatePlaylist,
    getplaylist
} = require("../controllers/PlaylistsControllers");

// get a playlist 
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isArtist = require("../middlewares/isArist")

router.post("/addPlaylist",isAuth, addPlaylist);
router.get("/getUserPlaylists/:userID",isAuth, getUserPlaylists);
router.delete("/deletePlaylist/:playlistId" ,isAuth, deletePlaylist)
router.put("/updatePlaylist/:playlistId",isAuth, updatePlaylist)
router.get("/getPlaylist/:playlistID" ,isAuth, getplaylist)
module.exports = router;











    


  

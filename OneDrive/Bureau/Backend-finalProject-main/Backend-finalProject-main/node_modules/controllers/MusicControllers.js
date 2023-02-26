const Song = require("../models/SongSchema")
const playlist = require("../models/playlistSchema");


const  addSongToPlaylist = async (req,res)=>{   
    const playlistId = req.headers["playlistid"]
    const songid = req.headers["songid"]
    
    try {
         //check if the playlist exists in the data base 
        const findPlaylist = await playlist.findById(playlistId)
        
        if (!findPlaylist){
            res.status(400).json({msg:"playlist does not exist"})
        }
        //check if the song exists in the data base 
        const findSong = await Song.findById(songid)
        
        if(!findSong){
            res.status(400).json({msg:"something wrong with the song's id or qong does not exist"})
        }
        playlist.updateOne(
            {_id:playlistId},{ $push: { songsIds: songid } },(err)=>{
                if (err) {
                  return res.status(500).json({ msg: "Something went wrong " });
                }
                
                res.status(200).json({msg:"song added to the playlist"})}
        )

        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
        
    }

}
const removeSongFromPlaylist = async(req,res)=>{
    const playlistId = req.headers["playlistid"]
    const songid = req.headers["songid"]
    try {
        //check if the playlist exists in the data base 
        const findPlaylist = playlist.findById(playlistId) 
        if (!findPlaylist){
            res.status(400).json({msg:"playlist does not exist"})
        }
        //check if the song exists in the data base
        const findSong = await Song.findById(songid)  
        // if(!findSong){
        //     res.status(400).json({msg:"something wrong with the song's id or qong does not exist"})
        // }
        playlist.updateOne(
            {_id:playlistId},{ $pull: { songsIds: songid } },(err)=>{
                if (err) {
                  return res.status(500).json({ msg: "Something went wrong " });
                }
                
                res.status(200).json({msg:"song deleted from the playlist"})}
        )     
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    

}

const getSongById = async(req,res)=>{
    const songid = req.params.songid
    try {
        Song.findById(songid,(err,song)=>{
            if(err){
                res.status(400).json({msg:"the song does not exist"})
            }
            if(!song){
                res.status(400).json({msg:"song does not exist"})
            }
            res.status(200).json(song)
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getAllSongs = async(req,res)=>{
    try {
        Song.find((err,songs)=>{
            if(err){
                res.status(400).json({msg:"something went wrong"})
            }
            res.status(200).json(songs)
        })
        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
const getSongsByIds = async(req,res)=>{
    
    const songIds = req.body.songIds;
  try {
    const songs = await Promise.all(songIds.map(async id => await Song.findById(id)));
    res.send(songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.message });
  }
}
const getSongsByType = async (req, res) => {
    try {
      const { types } = req.body;
  
      const songs = await Song.find({ songType: { $in: types } });
  
      return res.status(200).json(songs);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
      
    }
  };
module.exports = {
    getSongsByIds,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getSongById,
    getAllSongs,
    getSongsByType
  };
  
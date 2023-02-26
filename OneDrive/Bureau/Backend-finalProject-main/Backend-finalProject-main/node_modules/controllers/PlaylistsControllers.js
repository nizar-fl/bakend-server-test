const playlist = require("../models/playlistSchema");

const getUserPlaylists = async (req ,res )=>{
  const  userID = req.headers["userid"]
  try {
    playlist.find({userID: userID},(err, playlists) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error accessing collection");
      } else {
        
        res.status(200).json(playlists);
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

const addPlaylist = async (req , res)=>{
    try {
    const newPlaylist = new playlist({ ...req.body});
    newPlaylist.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong or some informations are missing" });
      }
      res.status(201).json({ msg: "newPlaylist created successfully" });
    });
        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }

}
const deletePlaylist = async (req,res)=>{
    const { playlistId } = req.params;
    try {
      const findplaylist = await playlist.findById(playlistId);
      if(!findplaylist){
        res.status(400).json({msg: "playlist doesn't exist"})
      }
      playlist.deleteOne({_id: playlistId},(err) => {
        if (err) {
          return res.status(500).json({ msg: "Something went wrong" });
        }
        res.status(200).json({ msg: "playlist deleted" });
      })    
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }


}
const updatePlaylist = async (req,res)=>{
  const { playlistId } = req.params;
  try {
    const findplaylist = await playlist.findById(playlistId);
      if(!findplaylist){
        res.status(400).json({msg: "playlist doesn't exist"})
      }
      playlist.updateOne( {
        _id: playlistId,
      },
      { ...req.body },
      (err) => {
        if (err) {
          return res.status(500).json({ msg: "Something went wrong " });
        }
        res.status(200).json({ msg: "playlist updated" });
      })
    
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

}
const getplaylist = async (req,res)=>{
    const playlistId = req.params.playlistID
    try {
      playlist.findById(playlistId,(err,playlist)=>{
        if(err){
          console.log(err)
          res.status(400).json({msg:"playlist not found"})
        }
        res.status(200).json(playlist)          
      })
    
      

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

}







module.exports = {
  addPlaylist,
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
  getplaylist
};
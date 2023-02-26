const Album = require("../models/albumschema")
const Song = require("../models/SongSchema")

const getAllAlbums = async (req,res)=>{
    try {
        Album.find((err,Albums)=>{
            if(err){
                res.status(400).json({msg:"something went wrong"})
            }
            res.status(200).json(Albums)
        })
        
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }

}
const getArtistAlbums = async (req,res)=>{
    const artistId = req.headers["artistid"]
    try {
        Album.find({artistId:artistId},(err,ArtistsAlbum)=>{
            if(err){
                res.status(400).json({msg:"something went wrong"})
            }
            res.status(200).json(ArtistsAlbum)
        })
        
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }

}
const addAlbum = async(req,res)=>{
    try {
        // Get the data from the request body
        const { albumName, artistId, songs } = req.body;
    
        // Create new instances of the songs
        const songPromises = songs.map(song => {
          const newSong = new Song(song);
          return newSong.save();
        });
    
        // Wait for all the songs to be saved
        Promise.all(songPromises)
          .then(songs => {
            // Get the IDs of the songs that were just saved
            const songsIds = songs.map(song => song._id);
    
            // Create a new album instance and add the song IDs
            const album = new Album({
              albumName,
              artistId,
              songsIds
            });
    
            // Save the album
            album.save()
              .then(() => {
                res.status(200).json({ message: 'Data saved successfully!' });
              });
          })
          .catch(error => {
            throw error;
          });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
const deleteAlbum = async (req,res)=>{
    const albumId= req.params.albumid
    // const Artistid = req.headers["Artistid"] //i may add a verification middleware to check if its the artist that is sending the request 
    try {
        const findAlbum = Album.findById(albumId)
        if (!findAlbum){
            res.status(400).json({msg:"Album does not exist"})
        }
        console.log(albumId)
        Album.deleteOne({_id: albumId},(err) => {
            if (err) {
              return res.status(500).json({ msg: "Something went wrong" });
            }
            res.status(200).json({ msg: "Album deleted" });
          })    

    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
}

const addSongsToAlbum = async (req,res)=>{
    const {songs} = req.body
    const albumid = req.params.albumid
    try {
        
        const songPromises = songs.map(song => {
            const newSong = new Song(song);
            return newSong.save();
          });
          const findAlbum = Album.findById(albumid)
        if (!findAlbum){
            res.status(400).json({msg:"Album does not exist"})
        }
        Promise.all(songPromises)
        .then(songs => {
          // Get the IDs of the songs that were just saved
          const songsIds = songs.map(song => song._id);
  
          Album.updateOne(
            {_id:albumid},{ $push: { songsIds: songsIds } },(err)=>{
                if (err) {
                  return res.status(500).json({ msg: "Something went wrong " });
                }
                
                res.status(200).json({msg:"song added to the Album"})}
        )
          
        }).catch(error => {
            throw error;
          });
        

        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const removeSongFromAlbum = async (req,res)=>{
    const songId = req.headers["songid"]
    const albumid = req.params
    try {
        const findSong = Song.findById(songId)
        if (!findSong){
            res.status(400).json({msg:"song does not exist"})
        }
        const findAlbum = Album.findById(albumid)
        if (!findAlbum){
            res.status(400).json({msg:"Album does not exist"})
        }
        Album.updateOne(
            {_id:albumid},{ $pull: { songsIds: songId } },(err)=>{
                if (err) {
                  return res.status(500).json({ msg: "Something went wrong " });
                }
                
                res.status(200).json({msg:"song deleted to the Album"})}
        )

        
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
} 
const getAlbumById = async (req,res)=>{
    const AlbumId = req.params.albumid
    console.log(AlbumId)
    try {
      Album.findById(AlbumId,(err,album)=>{
        if(err){
          console.log(err)
          res.status(400).json({msg:"album not found"})
        }
        res.status(200).json(album)          
      })
    
      

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }


}


module.exports = {
    getAlbumById,
    getAllAlbums,
    getArtistAlbums,
    addAlbum,
    deleteAlbum,// delete by id
    addSongsToAlbum,//here we are working only with the song id // update the Album
    removeSongFromAlbum//here we are working only with the song id 
  };
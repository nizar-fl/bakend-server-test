
const isArtist = async (req, res, next)=>{
    const role = req.headers["role"]?req.headers["role"]:null
    console.log(role)
    if(role!=="artist"){
        return res.status(401).json({ msg: "You are not an artist " });
    }
    next();

}
module.exports = isArtist;
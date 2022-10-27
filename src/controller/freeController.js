const {getTestIpUserByIpAddressService} = require("../services/testIpUserServices")

const getRequesterIpAddress = (req) =>{
    let ip = null;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else if(req.socket && req.socket.remoteAddress){
        ip = req.socket.remoteAddress;
    } else if( req.connection?.socket?.remoteAddress){
        ip = req.connection.socket.remoteAddress;
    } else {
        ip = req.ip;
    }
    return ip;
}

async function getTestIpCtl (req,res,next) {
    
    try {
        // const reqIP = req.headers['x-forwarded-for'] || 
        //             req.connection.remoteAddress || 
        //             req.socket.remoteAddress ||
        //             req.connection.socket.remoteAddress;

        const reqIP = getRequesterIpAddress(req);
        
        const ipinfo = await getTestIpUserByIpAddressService(reqIP);
        if (ipinfo?._id) {
            delete ipinfo.ip; // delete the ip address
            res.status(200).json({error:false,message:"",data:ipinfo})
        }else if(!ipinfo){
            res.status(200).json({error:false,message:"",data:ipinfo})
        }else{
            throw new Error(ipinfo.message)
        }
    } catch (error) {
        res.status(500).json({error:true,message: error.message ?? "Fail to send IP address info!"})
    }
}

module.exports = {
    getTestIpCtl
}
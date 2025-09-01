import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).json({
            success:false,
            message: "Unauthorized- no token found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
};
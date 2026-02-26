const ErroMiddleware = (err, req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).json({message:err.message || "server error"});
    next();
};

export default ErroMiddleware;
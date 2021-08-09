'use strict';


const validator = (req,res,next)=>{
  const name = req.query.name;
  console.log(name);
  
  if(name){
    next();
  }else{
    next('no user name is found');
  }
  
};

module.exports= validator;
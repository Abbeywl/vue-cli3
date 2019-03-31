let router = require("express").Router();
var mgdb = require('../../common/mgdb');
router.get("/",(req,res)=>{
    mgdb({collection:'home'},
        ({collection,client,ObjectID})=>{
            collection.find({_id:ObjectID(req.query.id)}).toArray((err,result)=>{
                let r= result[0];
                mgdb({collection:"cart"},
                    ({collection,client,ObjectID})=>{
                        collection.insertOne({
                            title:r.title,
                            des:r.des,
                            time:r.time,
                            detail:{
                                auth:r.detail.auth,
                                content:r.detail.content,
                                auth_icon:r.detail.auth_icon
                            }
                        },(err,result)=>{
                            if(!err){
                                res.send({error:0,msg:"加入购物车成功"})
                            }else{
                                res.send({error:1,msg:"加入购物车失败"})
                            }
                        })
                    })
            })
        })
});
//读取购物车里面的东西
router.get("/read",(req,res)=>{
    mgdb({collection:'home'},
        ({collection,client,ObjectID})=>{
            collection.find({}).toArray((err,result)=>{
                if(!err){
                    res.send({result,error:0})
                }
            })
        })
})
module.exports = router;
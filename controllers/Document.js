import Document from "../models/DocumentModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getDocuments = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Document.findAll({
                attributes:['uuid','description','documentType','fileurl','version','status'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Document.findAll({
                attributes:['uuid','description','documentType','fileurl','version','status'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDocumentById = async(req, res) =>{
    try {
        const product = await Document.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Document.findOne({
                attributes:['uuid','description','documentType','fileurl','version','status'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Document.findOne({
                attributes:['uuid','description','documentType','fileurl','version','status'],
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createDocument = async(req, res) =>{
    const {description, price,documentType, fileurl,version, status} = req.body;
    try {
        await Product.create({
            description: description,
            price: price,
             documentType: documentType,
            fileurl: fileurl,
             version: version,
               status: status,
            
            userId: req.userId
        });
        res.status(201).json({msg: "document Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDocument = async(req, res) =>{
    try {
        const product = await Document.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {description, price,documentType, fileurl,version, status} = req.body;
        if(req.role === "admin"){
            await Document.update({description, price,documentType, fileurl,version, status},{
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Document.update({description, price,documentType, fileurl,version, status},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "document updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDocument = async(req, res) =>{
    try {
        const product = await Document.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {description, price,documentType, fileurl,version, status} = req.body;
        if(req.role === "admin"){
            await Document.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "document deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
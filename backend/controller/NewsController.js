const newsModel = require("../model/NewsModel")

const createNew = async (req, res) => {
    try {
        const { name,  desc } = req.body
        const newData = newsModel({
            name: name,
            desc:desc,
            prImage: req.file.filename,
        })
        await newData.save()
        res.send(newData)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


//read
const readNew = async(req,res) => {
    try{
        const {category} = req.body || {}

        let filterData = {}

        if(category){
            filterData = {category}
        }
        const readData = await newsModel.find(filterData)
        if(readData){
            res.send(readData)
        }
    } catch(error) {
        res.status(400).json({message: error.message})

    }
}
//read-single

const readSingleNew = async(req,res) => {
    try{
        const getData = await newsModel.find({_id: req.params.id})
        if(getData){
        res.send(getData)
    }
    } catch(error){
        res.status(400).json({message: error.message})

    }
}

//update

const updateNew = async(req,res) => {
    try{
        const { name,  desc} = req.body
        const updateData = await newsModel.updateOne(
            {_id: req.params.id},
            {$set: {
                name: name,
                desc: desc,
                prImage: req.file ? req.file.filename : undefined,

            }}
        )
        if(updateData){
            res.send("succes update")
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

// delete

const deleteNew = async(req,res) => {
    try{
        const deleteData = await newsModel.deleteOne({_id:req.params.id})
        if(deleteData){
            res.send("succes delete")
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
}
module.exports = { createNew, readNew, readSingleNew, updateNew, deleteNew }

const router =require('express').Router()
// import todo model
const todoItemModel =require('../models/todoitems')

// Lets create our first route..we will add Todo item to our database

router.post('/api/item',async(req,res)=>{
    try{
        const newItem =new todoItemModel({
           item:req.body.item 
        })
        // save this item in database
        const saveItem =await newItem.save()
        res.status(200).jso(saveItem)

    }catch(err){
        res.json(err)
    }
})
// Lets create second route --get data from database
router.get('/api/items',async(req,res)=>{
    try{
        const allTodoItems=await todoItemModel.find({})
        res.status(200).json(allTodoItems)

    }catch(err){
        res.json(err)
    }
})

// Lets update item
router.put('/api/item/:id',async(req,res)=>{
    try{
// find the item by its id and update it
const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id,{$set:req.body})
res.status(200).json('Item Updated')
    }catch(err){
        res.json(err)
    }
})

// Lets Delete item from database

router.delete('/api/item/:id', async (req,res)=>{
    try{
        // find the item by its id and delete it
        const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item Deleted')

    }catch(err){
        res.json(err)
    }
})



// export router
module.exports =router
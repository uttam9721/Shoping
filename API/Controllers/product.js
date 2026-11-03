import { Products } from "../Models/Product.js";
// import { Products } from './../Models/Product';
// add product
export const addProduct = async (req,res) => {
    const { title, description,price,category,imgSrc,qty,createdAt}= req.body;
    try {
        let product = await Products.create({
            title:title,
            description:description,
            price:price,
            category:category,
            imgSrc:imgSrc,
            qty:qty,
            createdAt:createdAt,
            });
            res.json({message:'Product added successfully...',product})
        
        
    } catch (error) {
        res.json(error.message);
        
    }
}


// get products
export const getProducts = async (req,res) =>{
    try {
        let page = parseInt(req.query?.page ) || 1;
        let limit = parseInt(req.query?.limit) || 10; // fetch all by default if limit not restricted
        let skip=(page-1)*limit;
        let totalProducts= await Products.countDocuments();
        let products= await Products.find().sort({createdAt:-1}).skip(skip).limit(limit);
        res.json({
            message:'All products',
            products,
            totalPage:Math.ceil(totalProducts/limit),
            totalProducts
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// find product by id 
export const getProductById = async (req,res) =>{
    try {
        const id = req.params.id;
        let product= await Products.findById(id);
        if(!product) return res.status(404).json({message:'Product not found'});
        res.json({message:'specific product',product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// update product ById;
export const updateProductById = async (req,res) =>{
    try {
        const id = req.params.id;
        let product= await Products.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.status(404).json({message:'Product not found'});
        res.json({message:'Product has been updated',product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// delete productById
export const deleteProductById = async (req,res) =>{
    try {
        const id = req.params.id;
        let product= await Products.findByIdAndDelete(id);
        if(!product) return res.status(404).json({message:'Product not found'});
        res.json({message:'Product has been deleted',product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
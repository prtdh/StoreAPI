const Product=require('../models/product')


const getAllProductsStatic= async(req,res)=>{
    const products=await Product.find({
        name:'albany sectional'
    })
    res.status(200).json({products,nbhits:products.length}
        )
}

const getAllProducts= async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilter}=req.query;
    const queryObject={}
    if(featured){
        queryObject.featured=featured==='true'? true:false
    }

    if(company){
        queryObject.company=company;
    }

    if(name){
        queryObject.name={$regex:name,$options:'i'};
    }
    let result= Product.find(queryObject);
    
    if (numericFilter) {
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx=/\b(<|>|<=|>=|=)\b/g
        let filters=numericFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        console.log(filters);

    }


//sort
if(sort){
    const sortList=sort.split(',').join(' ');
    result=result.sort(sortList);
}
else{
    result=result.sort('createdAt');
}

if(fields){
    const fieldList=fields.split(',').join(' ');
    result=result.select(fieldList);
}


const page=Number(req.query.page)||1
const limit=Number(req.query.limit)||10
const skip=(page-1)*limit;
result=result.skip(skip).limit(limit);


const products=await result;

    res.status(200).json({products,nbhits:products.length})
}
module.exports={getAllProducts,getAllProductsStatic}
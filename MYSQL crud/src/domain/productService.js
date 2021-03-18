const { response } = require("express");
const moment = require('moment');
const {options} = require('../mariaDB');
const knex = require('knex')(options);



async function getProductById(id) {
    const response = await knex.from('product').select('*').where('id',id);
    return response[0];
    }

async function getAll() {
    const response = await knex.from('product').select('*');
    return response;
}

async function addProduct(body) {
    let timestamp = moment().format('lll');
    const { title, price, thumbnail, code, stock, description } = body;
    const item = {
        title,
        price,
        stock,
        code,
        thumbnail,
        timestamp,
        description
    }
    try {
        await knex('product').insert(item);
        return 'product added successfully';
    } catch (error) {
        return error;
    }
}

async function update(id,body) {
    try{
        await knex('product').where('id',id).update(body);
        return 'Product uploaded successfully';
    }catch(err){
        return err;
    }
}

async function deleteProduct(id) {
    try{
        await knex('product').where('id',id).del();
        return 'Product deleted successfully';
    }catch(err){
        return err;
    }
}


module.exports = {
    getProductById,
    getAll,
    addProduct,
    update,
    deleteProduct
}
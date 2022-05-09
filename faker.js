const { faker } = require('@faker-js/faker');

const fakerProducts = [];

for(let i = 0; i < 5 ;i++){
    const product = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.business()
    }
    fakerProducts.push(product);
}

exports.default = fakerProducts;

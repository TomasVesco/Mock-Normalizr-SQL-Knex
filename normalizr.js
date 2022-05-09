const { normalize, denormalize, schema } = require('normalizr');
const util = require('util');

const originalData = {
    id: '999',
    posts: [
        {
            id: '123',
            author: 
            {
                id: '1',
                nombre: 'pablo',
                apellido: 'perez',
                DNI: '20442654',
                direccion: 'CABA 123',
                telefono: '1567876547'
            },
            title: 'My awesome blog post',
            comments: [
                {
                    id: '323',
                    commenter: {
                    id: '2',
                    nombre: 'nicole',
                    apellido: 'gonzalez',
                    DNI: '20442638',
                    direccion: 'CABA 456',
                    telefono: '1567811543'
                }},
                {
                    id: '325',
                    commenter: {
                        id: '3',
                        nombre: 'pablo',
                        apellido: 'mei',
                        DNI: '20446938',
                        direccion: 'CABA 789',
                        telefono: '1567291542'
                    }
                }
            ]
        },
        {
            id: '1123',
            author: 
            {
                id: '2',
                nombre: 'nicole',
                apellido: 'gonzalez',
                DNI: '20442638',
                direccion: 'CABA 456',
                telefono: '1567811543'
            },
            title: 'My awesome blog post',
            comments: [
                {
                    id: '1324',
                    commenter: {
                    id: '1',
                    nombre: 'pablo',
                    apellido: 'perez',
                    DNI: '2044264',
                    direccion: 'CABA 123',
                    telefono: '1567876547'
                }},
                {
                    id: '1325',
                    commenter: {
                        id: '3',
                        nombre: 'pedro',
                        apellido: 'mei',
                        DNI: '20446938',
                        direccion: 'CABA 789',
                        telefono: '1567291542'
                    }
                }
            ]
        }
    ]
}

const userSchema = new schema.Entity('users');

const commentSchema = new schema.Entity('comments', {
    commenter: userSchema
});

const postSchema = new schema.Entity('posts', {
    author: userSchema,
    comments: [commentSchema]
});

const articleSchema = new schema.Entity('articles', {
    posts: [postSchema]
})

const dataNormalizada = normalize(originalData, articleSchema);
const dataDenormalizada = denormalize(dataNormalizada.result, articleSchema, dataNormalizada.entities);

const originalDataSize = JSON.stringify(originalData).length;
const normalizeDataSize = JSON.stringify(dataNormalizada).length;
const denormalizeDataSize = JSON.stringify(dataDenormalizada).length;

const percentNormalizeData = (1 - normalizeDataSize / originalDataSize) * 100

console.log(`Tamaño data original: ${originalDataSize}\nTamaño data normalizada: ${normalizeDataSize}\nTamaño data denormalizada: ${denormalizeDataSize}`);
console.log(`Porcentaje reducido: %${percentNormalizeData}`);
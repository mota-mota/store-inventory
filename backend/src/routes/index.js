const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');

function routerApi(app) {
    app.use('/api/v1/', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/categories', categoryRoutes);
    app.use('/api/v1/products', productRoutes);
}

module.exports = routerApi;

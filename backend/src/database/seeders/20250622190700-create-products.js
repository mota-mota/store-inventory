'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      // Electrodomésticos (Categoría 1)
      {
        name: 'Refrigeradora Mabe 20 pies cúbicos',
        description: 'Refrigeradora de dos puertas, con congelador superior, color plateado, eficiencia energética A+',
        price: 5899.00,
        SKU: 'REF-MAB-GT001',
        quantity: 15,
        categoryId: 1,
        image: 'refrigeradora-mabe.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavadora Mabe Carga Superior 16kg',
        description: 'Lavadora con agitador, 10 ciclos de lavado, panel digital, color blanco',
        price: 3499.00,
        SKU: 'LAV-MAB-GT002',
        quantity: 12,
        categoryId: 1,
        image: 'lavadora-mabe.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Horno Eléctrico Mabe 24"',
        description: 'Horno de empotrar con parrilla, 4.8 pies cúbicos, temporizador, color negro',
        price: 2899.00,
        SKU: 'HOR-MAB-GT003',
        quantity: 8,
        categoryId: 1,
        image: 'horno-electrico.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Microondas Mabe 1.2 pies cúbicos',
        description: 'Microondas de 900W con 10 niveles de potencia y función descongelar',
        price: 799.00,
        SKU: 'MIC-MAB-GT004',
        quantity: 22,
        categoryId: 1,
        image: 'microondas-mabe.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Licuadora Oster Clásica',
        description: 'Licuadora de 600W, vaso de vidrio de 1.25L, 10 velocidades, color negro',
        price: 499.00,
        SKU: 'LIC-OST-GT005',
        quantity: 30,
        categoryId: 1,
        image: 'licuadora-oster.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Tecnología (Categoría 2)
      {
        name: 'Laptop HP 15-dw2058la',
        description: 'Laptop HP 15.6", Intel Core i5, 8GB RAM, 512GB SSD, Windows 11',
        price: 5899.00,
        SKU: 'LAP-HP-GT006',
        quantity: 15,
        categoryId: 2,
        image: 'laptop-hp.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart TV Samsung 50" 4K UHD',
        description: 'Smart TV Crystal UHD con HDR, Tizen OS, 3 puertos HDMI, WiFi',
        price: 4899.00,
        SKU: 'TV-SAM-GT007',
        quantity: 10,
        categoryId: 2,
        image: 'tv-samsung.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartphone Samsung Galaxy A34 128GB',
        description: 'Smartphone Samsung Galaxy A34, pantalla Super AMOLED 6.6", 8GB RAM, 128GB',
        price: 3899.00,
        SKU: 'CEL-SAM-GT008',
        quantity: 12,
        categoryId: 2,
        image: 'samsung-a34.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tablet Samsung Galaxy Tab A8',
        description: 'Tablet de 10.5" con 4GB RAM, 64GB almacenamiento, Android 11',
        price: 2499.00,
        SKU: 'TAB-SAM-GT009',
        quantity: 8,
        categoryId: 2,
        image: 'tablet-samsung-a8.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Consola PlayStation 5 Digital Edition',
        description: 'Consola de videojuegos de última generación sin lector de disco',
        price: 5699.00,
        SKU: 'CON-PS5-GT010',
        quantity: 5,
        categoryId: 2,
        image: 'ps5-digital.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Hogar (Categoría 3)
      {
        name: 'Juego de Sábanas Algodón 200 hilos',
        description: 'Juego de sábanas de algodón peruano 200 hilos, cama queen, varios colores',
        price: 349.00,
        SKU: 'HOG-SAB-GT011',
        quantity: 25,
        categoryId: 3,
        image: 'sabanas-algodon.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juego de Ollas de Aluminio',
        description: 'Set de 8 piezas de ollas y sartenes de aluminio forjado con recubrimiento antiadherente',
        price: 1299.00,
        SKU: 'HOG-LLA-GT012',
        quantity: 8,
        categoryId: 3,
        image: 'ollas-aluminio.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sofá Seccional 3 Plazas',
        description: 'Sofá seccional en L, tela poliéster anti-manchas, color gris oscuro, incluye cojines',
        price: 4899.00,
        SKU: 'HOG-SOF-GT013',
        quantity: 4,
        categoryId: 3,
        image: 'sofa-seccional.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juego de Toallas de Baño',
        description: 'Set de 4 toallas de baño 100% algodón (2 toallas de baño, 1 toallón, 1 toalla de mano)',
        price: 449.00,
        SKU: 'HOG-TOA-GT014',
        quantity: 35,
        categoryId: 3,
        image: 'toallas-bano.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mesa de Centro de Vidrio Templado',
        description: 'Mesa de centro moderna con base metálica y vidrio templado de 10mm',
        price: 2489.99,
        SKU: 'HOG-MES-015',
        quantity: 8,
        categoryId: 3,
        image: 'mesa-centro.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

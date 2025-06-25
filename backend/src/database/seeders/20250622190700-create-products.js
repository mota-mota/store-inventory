'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      // Electrodomésticos (Categoría 1)
      {
        name: 'Refrigeradora Samsung 25 pies cúbicos',
        description: 'Refrigeradora con tecnología Twin Cooling Plus, 4 puertas, color negro',
        price: 1299.99,
        SKU: 'REF-SAMS-001',
        quantity: 15,
        categoryId: 1,
        image: 'refrigeradora-samsung.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavadora LG Carga Frontal 20kg',
        description: 'Lavadora inteligente con WiFi, 8 ciclos de lavado, tecnología AI DD',
        price: 899.99,
        SKU: 'LAV-LG-002',
        quantity: 12,
        categoryId: 1,
        image: 'lavadora-lg.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Horno Eléctrico Mabe 30"',
        description: 'Horno de empotrar, 5.8 pies cúbicos, autolimpiante, color negro',
        price: 749.99,
        SKU: 'HOR-MAB-003',
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
        name: 'Microondas Panasonic 1.6 pies cúbicos',
        description: 'Microondas de 1100W con descongelamiento automático',
        price: 149.99,
        SKU: 'MIC-PAN-004',
        quantity: 22,
        categoryId: 1,
        image: 'microondas-panasonic.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Licuadora Oster Xpert Series',
        description: 'Licuadora profesional de 1200W, vaso de vidrio de 1.75L',
        price: 129.99,
        SKU: 'LIC-OST-005',
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
        name: 'Laptop HP Pavilion 15"',
        description: 'Laptop HP Pavilion 15.6", Intel Core i7, 16GB RAM, 512GB SSD',
        price: 899.99,
        SKU: 'LAP-HP-006',
        quantity: 25,
        categoryId: 2,
        image: 'laptop-hp.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart TV Samsung 55" 4K UHD',
        description: 'Smart TV Crystal UHD con HDR, Tizen OS, 3 puertos HDMI',
        price: 699.99,
        SKU: 'TV-SAM-007',
        quantity: 18,
        categoryId: 2,
        image: 'tv-samsung.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartphone iPhone 14 Pro 128GB',
        description: 'iPhone 14 Pro con pantalla Super Retina XDR, cámara de 48MP',
        price: 999.99,
        SKU: 'CEL-APP-008',
        quantity: 15,
        categoryId: 2,
        image: 'iphone-14-pro.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tablet Samsung Galaxy Tab S8',
        description: 'Tablet de 11" con S Pen incluido, 8GB RAM, 128GB almacenamiento',
        price: 699.99,
        SKU: 'TAB-SAM-009',
        quantity: 12,
        categoryId: 2,
        image: 'tablet-samsung.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Consola PlayStation 5',
        description: 'Consola de videojuegos de última generación con lector Blu-ray',
        price: 499.99,
        SKU: 'CON-PS5-010',
        quantity: 7,
        categoryId: 2,
        image: 'ps5.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Hogar (Categoría 3)
      {
        name: 'Juego de Sábanas Algodón Egipcio',
        description: 'Juego de sábanas de algodón egipcio 600 hilos, cama queen, color blanco',
        price: 89.99,
        SKU: 'HOG-SAB-011',
        quantity: 40,
        categoryId: 3,
        image: 'sabanas-algodon.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juego de Ollas de Acero Inoxidable',
        description: 'Set de 10 piezas de ollas y sartenes de acero inoxidable 18/10',
        price: 199.99,
        SKU: 'HOG-LLA-012',
        quantity: 10,
        categoryId: 3,
        image: 'ollas-acero.jpg',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sofá Seccional 3 Plazas',
        description: 'Sofá seccional en L, tela resistente, color gris, incluye cojines',
        price: 799.99,
        SKU: 'HOG-SOF-013',
        quantity: 5,
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
        description: 'Set de 6 toallas de baño 100% algodón, tamaño baño y toallones',
        price: 59.99,
        SKU: 'HOG-TOA-014',
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
        price: 249.99,
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

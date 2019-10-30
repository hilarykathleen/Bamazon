DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick 4K", "Electronics", 49.99, 200),
("LE LED Headlamp", "Tools", 7.99, 100),
("Fujifilm INSTAX Mini Film", "Electronics", 14.73, 50),
("Chuckit! Ultra Dog Ball", "Pets", 4.91, 230),
("Spalding NBA Street Basketball", "Sports", 14.99, 10),
("Mario Badescu Facial Spray", "Beauty", 12.00, 150),
("Danby Compact Refrigerator", "Appliances", 157.64, 5),
("Samsung 65-Inch 4K Smart TV", "TVs", 799.99, 45),
("Bioderma Sensibio HO Micellar Water", "Beauty", 14.90, 100),
("Multipet Duckworth Duck Large Dog Toy", "Pets", 15.98, 50);


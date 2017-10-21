DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(40) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Frisbee","Sports", 10.99, 10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Hand Coffee Grinder","Home Goods", 11.50, 15);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Toothpaste","Personal Care", 5.50 ,15);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Joggers","Clothing", 20.99,11);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Sweatshirt","Clothing", 12.99, 4);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Mouthwash","Personal Care", 4.99 ,20);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Blanken","Home Goods", 9.99, 16);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Jump Rope","Sports", 14.99, 3);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Beans","Grocery", 1.99 ,12 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Lettuce","Grocery", 3.99 , 20);


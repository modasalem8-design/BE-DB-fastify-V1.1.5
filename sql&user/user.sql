--Active: 1775241830997@@localhost@6000@app
-- CREATE TABLE app(
-- id SERIAL PRIMARY KEY ,
-- name_company VARCHAR (100)NOT NULL,
-- type_company VARCHAR (100)NOT NULL,
-- pass VARCHAR(100) NOT NULL);
-- INSERT INTO app (name,pass)VALUES
-- (salem,1234),
-- (mohamed,1234)
SELECT * FROM app;
SELECT * FROM product;

-- -- 
-- CREATE TABLE product (
--     id SERIAL PRIMARY KEY,
--     product_name VARCHAR(100) NOT NULL,
--     tet_product TEXT NOT NULL  ,
--     price  NUMERIC(10,2) NOT NULL DEFAULT 0.00,
--   	sku VARCHAR (50) UNIQUE,
--   	s_q INTEGER DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
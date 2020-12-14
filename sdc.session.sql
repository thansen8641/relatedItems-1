-- DROP DATABASE relatedItems;

-- CREATE DATABASE relateditems;

-- \c relateditems;

CREATE TABLE Game (
  imgUrl varchar(255),
  item varchar(100),
  price varchar(10),
  system varchar(100),
  index int
);

CREATE INDEX game_idx
ON Game (index);


-- psql -d relateditems -U postgres
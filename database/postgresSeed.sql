\c relateditems

\COPY Game(imgUrl, item, price, system, index)
FROM '/Users/timothyhansen/hackReactor/SDC/relatedItems/mockData.csv'
DELIMITER ','
CSV HEADER;


CREATE INDEX game_index
ON game(index);




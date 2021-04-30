BEGIN TRANSACTION;

DROP TABLE IF EXISTS high_scores;

CREATE TABLE high_scores (
  id serial,
  name varchar(50) NOT NULL,
  score integer NOT NULL,
  completion_time numeric NOT NULL,
  date timestamp NOT NULL,
  regions text[] NOT NULL
);

COMMIT TRANSACTION;
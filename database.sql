CREATE TABLE Records
(
    timestamp INT PRIMARY KEY NOT NULL,
    nickname TEXT NOT NULL,
    content TEXT NOT NULL,
    remark TEXT
);
CREATE UNIQUE INDEX Records_timestamp_uindex ON Records (timestamp);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  userId varchar(12),
  nameKanji varchar(34) COMMENT '名前(漢字)',
  nameKana varchar(50) COMMENT '名前(カナ)',
  dateOfBirth date COMMENT '生年月日',
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='ユーザテーブル';

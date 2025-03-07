-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para tasks
CREATE DATABASE IF NOT EXISTS `tasks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tasks`;

-- Copiando estrutura para procedure tasks.insert_tasks
DELIMITER //
CREATE PROCEDURE `insert_tasks`()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 300 DO
        INSERT INTO tasks (task_name, task_description, task_stats) 
        VALUES (CONCAT('Tarefa ', i), CONCAT('Descrição da tarefa ', i), 
        ELT(FLOOR(1 + (RAND() * 3)), 'pendente', 'em andamento', 'concluída'));
        SET i = i + 1;
    END WHILE;
END//
DELIMITER ;

-- Copiando estrutura para procedure tasks.insert_taskss
DELIMITER //
CREATE PROCEDURE `insert_taskss`()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 300 DO
        INSERT INTO task (task_name, task_description, task_stats) 
        VALUES (CONCAT('Tarefa ', i), CONCAT('Descrição da tarefa ', i), 
        ELT(FLOOR(1 + (RAND() * 3)), 'pendente', 'em andamento', 'concluída'));
        SET i = i + 1;
    END WHILE;
END//
DELIMITER ;

-- Copiando estrutura para tabela tasks.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(100) DEFAULT NULL,
  `task_description` varchar(1000) DEFAULT NULL,
  `task_stats` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tasks.task: ~1 rows (aproximadamente)
INSERT INTO `task` (`id`, `task_name`, `task_description`, `task_stats`) VALUES
	(335, 'Revisar código', 'Realizar revisão do código desenvolvido.', 'in_progress'),
	(336, 'Escrever documentação', 'Escrever a documentação do projeto.', 'pending'),
	(337, 'Testar API', 'Executar testes na API REST.', 'completed'),
	(338, 'Atualizar banco de dados', 'Aplicar migrações no banco de dados.', 'completed'),
	(339, 'Criar wireframe', 'Desenvolver o wireframe para nova funcionalidade.', 'pending'),
	(340, 'Otimizar consultas', 'Melhorar a performance das consultas SQL.', 'in_progress'),
	(341, 'Fazer backup', 'Gerar backup completo do sistema.', 'completed'),
	(342, 'Ajustar layout', 'Corrigir detalhes no layout responsivo.', 'pending'),
	(343, 'Configurar ambiente', 'Preparar ambiente de desenvolvimento.', 'completed'),
	(344, 'Validar inputs', 'Implementar validação em todos os formulários.', 'in_progress');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

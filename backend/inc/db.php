<?php

define('MYSQL_CONFIG', [
    'host' => 'localhost',
    'user' => 'root',
    'password' => '',
    'db' => 'tasks'
]);

$connection = mysqli_connect(
    MYSQL_CONFIG['host'], 
    MYSQL_CONFIG['user'], 
    MYSQL_CONFIG['password'], 
    MYSQL_CONFIG['db'] 
);

if(!$connection){
    echo "
        Ocorreu um erro durante a conexão com o banco de dados, por favor, verifique as credenciais:
        " . 
        mysqli_connect_error();
    exit();
}
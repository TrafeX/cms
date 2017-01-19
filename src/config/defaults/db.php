<?php

/**
 * DO NOT EDIT THIS FILE.
 *
 * This file is subject to be overwritten by a Craft update at any time.
 *
 * If you want to change any of these settings, copy it into `config/db.php`, and make your change there.
 */

return [

    /**
     * The database server name or IP address. Usually 'localhost' or '127.0.0.1'.
     */
    'server' => 'localhost',
    /**
     * The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.
     */
    'port' => '',
    /**
     * The database username to connect with.
     */
    'user' => 'root',
    /**
     * The database password to connect with.
     */
    'password' => '',
    /**
     * The name of the database to select.
     */
    'database' => '',
    /**
     * The database driver to use. Either 'mysql' for MySQL or 'pgsql' for PostgreSQL.
     */
    'driver' => 'mysql',
    /**
     * PostgreSQL only. Set the schema to use for this installation.
     *
     * https://www.postgresql.org/docs/8.2/static/ddl-schemas.html
     */
    'schema' => 'public',
    /**
     * If you're sharing Craft installs in a single database (MySQL) or a single
     * database and using a shared schema (PostgreSQL), then you can set a table
     * prefix here to avoid table naming conflicts per install. This can be no more than 5
     * characters, and must be all lowercase.
     */
    'tablePrefix' => '',
    /**
     * The charset to use when creating tables.
     */
    'charset' => 'utf8',
    /**
     * MySQL only. If this is set, then the CLI connection string (used for yiic) will
     * connect to the Unix socket, instead of the server and port. If this is
     * specified, then 'server' and 'port' settings are ignored.
     */
    'unixSocket' => '',
    /**
     * An array of key => value pairs of PDO attributes to pass into the PDO constructor.
     *
     * For example, when using the MySQL PDO driver (https://secure.php.net/manual/en/ref.pdo-mysql.php),
     * if you wanted to enable a SSL database connection (assuming SSL is enabled in MySQL
     * (https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html) and `'user'`
     * can connect via SSL, you'd set these:
     *
     *     [
     *         PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
     *         PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
     *         PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
     *     ],
     */
    'attributes' => [],
    /**
     * If you want to manually specify your PDO DSN connection string you can do so here.
     * MySQL: https://secure.php.net/manual/en/ref.pdo-mysql.connection.php
     * PostgreSQL: https://secure.php.net/manual/en/ref.pdo-pgsql.connection.php
     *
     * If you set this, then the 'server', 'port', 'user', 'password', 'database',
     * 'driver' and 'unixSocket' config settings will be ignored.
     */
    'dsn' => '',
];

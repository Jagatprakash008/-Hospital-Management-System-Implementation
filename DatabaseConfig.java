
package com.healthsync.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseConfig {
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/healthcare_db";
    private static final String DB_USER = "postgres";
    private static final String DB_PASSWORD = "password";
    
    private static DatabaseConfig instance;
    private Connection connection;
    
    private DatabaseConfig() {
        try {
            Class.forName("org.postgresql.Driver");
            Properties connectionProps = new Properties();
            connectionProps.setProperty("user", DB_USER);
            connectionProps.setProperty("password", DB_PASSWORD);
            connectionProps.setProperty("ssl", "false");
            connectionProps.setProperty("sslmode", "disable");
            
            this.connection = DriverManager.getConnection(DB_URL, connectionProps);
            System.out.println("Database connection established successfully.");
        } catch (ClassNotFoundException | SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
            throw new RuntimeException("Failed to initialize database connection", e);
        }
    }
    
    public static synchronized DatabaseConfig getInstance() {
        if (instance == null) {
            instance = new DatabaseConfig();
        }
        return instance;
    }
    
    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                // Re-establish connection if closed
                Properties connectionProps = new Properties();
                connectionProps.setProperty("user", DB_USER);
                connectionProps.setProperty("password", DB_PASSWORD);
                this.connection = DriverManager.getConnection(DB_URL, connectionProps);
            }
        } catch (SQLException e) {
            System.err.println("Failed to re-establish database connection: " + e.getMessage());
        }
        return connection;
    }
    
    public void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Database connection closed.");
            } catch (SQLException e) {
                System.err.println("Error closing database connection: " + e.getMessage());
            }
        }
    }
}

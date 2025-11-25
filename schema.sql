-- Hospital Management System Database Schema

CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Patients table
CREATE TABLE patients (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    medical_condition VARCHAR(200),
    admission_date DATE,
    status ENUM('admitted', 'discharged', 'critical') DEFAULT 'admitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE doctors (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(50),
    department VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    years_of_experience INT,
    status ENUM('active', 'on-leave', 'unavailable') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20),
    doctor_id VARCHAR(20),
    appointment_date DATE,
    appointment_time TIME,
    reason TEXT,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Emergency cases table
CREATE TABLE emergency_cases (
    id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20),
    condition VARCHAR(200),
    priority ENUM('Low', 'Medium', 'High', 'Critical'),
    doctor_id VARCHAR(20),
    admission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'resolved') DEFAULT 'active',
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Sample data
INSERT INTO patients (id, name, age, gender, email, phone, address, medical_condition, admission_date, status) VALUES
('PT-1001', 'John Smith', 45, 'Male', 'john.smith@email.com', '555-0101', '123 Main St', 'Hypertension', '2023-06-15', 'admitted'),
('PT-1002', 'Sarah Johnson', 32, 'Female', 'sarah.j@email.com', '555-0102', '456 Oak Ave', 'Diabetes', '2023-06-18', 'admitted'),
('PT-1003', 'Michael Brown', 58, 'Male', 'm.brown@email.com', '555-0103', '789 Pine Rd', 'Cardiac Arrest', '2023-06-20', 'critical');

INSERT INTO doctors (id, name, specialization, department, email, phone, years_of_experience, status) VALUES
('DR-1001', 'Dr. James Anderson', 'Cardiology', 'Cardiology', 'j.anderson@hospital.com', '555-1001', 15, 'active'),
('DR-1002', 'Dr. Maria Garcia', 'Neurology', 'Neurology', 'm.garcia@hospital.com', '555-1002', 12, 'active'),
('DR-1003', 'Dr. David Lee', 'Pediatrics', 'Pediatrics', 'd.lee@hospital.com', '555-1003', 8, 'active');

package com.hospital.model;

import java.time.LocalDate;

public class Patient {
    private String id;
    private String name;
    private int age;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private String medicalCondition;
    private LocalDate admissionDate;
    private String status; // admitted, discharged, critical
    
    public Patient(String id, String name, int age, String gender, String email, 
                  String phone, String address, String medicalCondition) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.medicalCondition = medicalCondition;
        this.admissionDate = LocalDate.now();
        this.status = "admitted";
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public String getMedicalCondition() { return medicalCondition; }
    public LocalDate getAdmissionDate() { return admissionDate; }
    public String getStatus() { return status; }
    
    public void setStatus(String status) { this.status = status; }
    public void setMedicalCondition(String condition) { this.medicalCondition = condition; }
    
    @Override
    public String toString() {
        return String.format("Patient{id='%s', name='%s', condition='%s', status='%s'}", 
                           id, name, medicalCondition, status);
    }
}

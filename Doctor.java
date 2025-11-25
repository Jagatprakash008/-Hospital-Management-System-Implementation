package com.hospital.model;

public class Doctor {
    private String id;
    private String name;
    private String specialization;
    private String department;
    private String email;
    private String phone;
    private int yearsOfExperience;
    private String status; // active, on-leave, unavailable
    
    public Doctor(String id, String name, String specialization, String department, 
                  String email, String phone, int yearsOfExperience) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.department = department;
        this.email = email;
        this.phone = phone;
        this.yearsOfExperience = yearsOfExperience;
        this.status = "active";
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getSpecialization() { return specialization; }
    public String getDepartment() { return department; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public int getYearsOfExperience() { return yearsOfExperience; }
    public String getStatus() { return status; }
    
    public void setStatus(String status) { this.status = status; }
    
    @Override
    public String toString() {
        return String.format("Dr. %s (%s) - %s", name, specialization, department);
    }
}

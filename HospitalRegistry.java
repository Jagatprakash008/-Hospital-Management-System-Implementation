package com.hospital.collections;

import com.hospital.model.Patient;
import com.hospital.exceptions.PatientNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

public class HospitalRegistry<T extends Patient> {
    private Map<String, T> patientRegistry;
    private Set<String> admittedPatientIds;
    private List<String> auditLog;
    
    public HospitalRegistry() {
        this.patientRegistry = new HashMap<>();
        this.admittedPatientIds = new HashSet<>();
        this.auditLog = new ArrayList<>();
    }
    
    // Generic method to add patient
    public void registerPatient(T patient) {
        patientRegistry.put(patient.getId(), patient);
        auditLog.add("Patient registered: " + patient.getName() + " (ID: " + patient.getId() + ")");
    }
    
    // Generic method to find patient
    public T findPatient(String patientId) throws PatientNotFoundException {
        T patient = patientRegistry.get(patientId);
        if (patient == null) {
            throw new PatientNotFoundException("Patient with ID " + patientId + " not found");
        }
        return patient;
    }
    
    // Get admitted patients using streams
    public List<T> getAdmittedPatients() {
        return patientRegistry.values().stream()
                .filter(patient -> "admitted".equals(patient.getStatus()))
                .collect(Collectors.toList());
    }
    
    public List<T> getCriticalPatients() {
        return patientRegistry.values().stream()
                .filter(patient -> "critical".equals(patient.getStatus()))
                .collect(Collectors.toList());
    }
    
    public void admitPatient(String patientId) throws PatientNotFoundException {
        T patient = findPatient(patientId);
        patient.setStatus("admitted");
        admittedPatientIds.add(patientId);
        auditLog.add("Patient admitted: " + patient.getName());
    }
    
    public void dischargePatient(String patientId) throws PatientNotFoundException {
        T patient = findPatient(patientId);
        patient.setStatus("discharged");
        admittedPatientIds.remove(patientId);
        auditLog.add("Patient discharged: " + patient.getName());
    }
    
    public int getTotalPatients() {
        return patientRegistry.size();
    }
    
    public int getAdmittedCount() {
        return getAdmittedPatients().size();
    }
}

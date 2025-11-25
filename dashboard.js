// Data for the dashboard (simulates backend data)
let dashboardData = {
    stats: {
        patients: 1254,
        doctors: 86,
        appointments: 324,
        emergency: 18
    },
    patients: [
        { id: "PT-1001", name: "John Smith", age: 45, gender: "Male", condition: "Hypertension", admissionDate: "2023-06-15", status: "admitted" },
        { id: "PT-1002", name: "Sarah Johnson", age: 32, gender: "Female", condition: "Diabetes", admissionDate: "2023-06-18", status: "admitted" },
        { id: "PT-1003", name: "Michael Brown", age: 58, gender: "Male", condition: "Cardiac Arrest", admissionDate: "2023-06-20", status: "critical" },
        { id: "PT-1004", name: "Emma Davis", age: 28, gender: "Female", condition: "Pneumonia", admissionDate: "2023-06-22", status: "admitted" },
        { id: "PT-1005", name: "Robert Wilson", age: 65, gender: "Male", condition: "Fracture", admissionDate: "2023-06-25", status: "discharged" }
    ],
    doctors: [
        { id: "DR-1001", name: "Dr. James Anderson", specialization: "Cardiology", department: "Cardiology", contact: "555-1001", status: "active" },
        { id: "DR-1002", name: "Dr. Maria Garcia", specialization: "Neurology", department: "Neurology", contact: "555-1002", status: "active" },
        { id: "DR-1003", name: "Dr. David Lee", specialization: "Pediatrics", department: "Pediatrics", contact: "555-1003", status: "active" },
        { id: "DR-1004", name: "Dr. Lisa Chen", specialization: "Orthopedics", department: "Orthopedics", contact: "555-1004", status: "active" }
    ],
    appointments: [
        { id: "AP-1001", patientId: "PT-1001", doctorId: "DR-1001", date: "2023-06-26", time: "09:00", reason: "Follow-up", status: "scheduled" },
        { id: "AP-1002", patientId: "PT-1002", doctorId: "DR-1002", date: "2023-06-26", time: "10:30", reason: "Consultation", status: "scheduled" },
        { id: "AP-1003", patientId: "PT-1004", doctorId: "DR-1003", date: "2023-06-26", time: "11:15", reason: "Check-up", status: "scheduled" }
    ],
    emergency: [
        { id: "EM-1001", patientId: "PT-1003", condition: "Cardiac Arrest", priority: "High", doctorId: "DR-1005", time: "08:15" },
        { id: "EM-1002", patientId: "PT-1006", condition: "Accident Injury", priority: "High", doctorId: "DR-1005", time: "09:45" }
    ],
    analytics: {
        departments: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Emergency'],
        departmentCounts: [320, 180, 240, 150, 120],
        monthlyAdmissions: [280, 320, 410, 380, 450, 520]
    },
    notifications: [
        { id: "NT-001", icon: "exclamation-circle", color: "#f44336", title: "Critical Patient", content: "Patient in ICU requires immediate attention", time: "15 minutes ago" },
        { id: "NT-002", icon: "ambulance", color: "#ff9800", title: "Emergency Case", content: "New emergency case arrived", time: "1 hour ago" },
        { id: "NT-003", icon: "pills", color: "#2196f3", title: "Low Stock Alert", content: "Insulin stock running low", time: "2 hours ago" }
    ]
};

// Initialize the dashboard
function initDashboard() {
    // Initialize stats with animation
    animateStats();
    
    // Initialize charts
    initCharts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render tables
    renderPatientsTable();
    renderAppointmentsTable();
    renderNotifications();
}

// Render patients table on dashboard
function renderPatientsTable() {
    const tbody = document.getElementById('patientsTable').querySelector('tbody');
    tbody.innerHTML = '';
    
    dashboardData.patients.slice(0, 5).forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.condition}</td>
            <td><span class="status ${patient.status}">${patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Render appointments table
function renderAppointmentsTable() {
    const tbody = document.getElementById('appointmentsTable').querySelector('tbody');
    tbody.innerHTML = '';
    
    dashboardData.appointments.slice(0, 5).forEach(appointment => {
        const patient = dashboardData.patients.find(p => p.id === appointment.patientId);
        const doctor = dashboardData.doctors.find(d => d.id === appointment.doctorId);
        
        if (patient && doctor) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.time}</td>
                <td>${patient.name}</td>
                <td>${doctor.name}</td>
                <td>${doctor.department}</td>
                <td><span class="status ${appointment.status}">${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span></td>
            `;
            tbody.appendChild(row);
        }
    });
}

// Render notifications
function renderNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = '';
    
    dashboardData.notifications.forEach(notification => {
        const item = document.createElement('li');
        item.className = 'notification-item';
        item.style.padding = '10px';
        item.style.borderBottom = '1px solid #eee';
        item.innerHTML = `
            <i class="fas fa-${notification.icon}" style="color: ${notification.color}; margin-right: 10px;"></i> 
            <strong>${notification.title}:</strong> ${notification.content}
            <div style="font-size: 12px; color: var(--gray); margin-top: 5px;">${notification.time}</div>
        `;
        list.appendChild(item);
    });
}

// Animate the statistic counters
function animateStats() {
    const stats = dashboardData.stats;
    animateValue(document.getElementById('patientsCount'), 0, stats.patients, 1500);
    animateValue(document.getElementById('doctorsCount'), 0, stats.doctors, 1500);
    animateValue(document.getElementById('appointmentsCount'), 0, stats.appointments, 1500);
    animateValue(document.getElementById('emergencyCount'), 0, stats.emergency, 1500);
}

// Animate a value from start to end
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize charts
function initCharts() {
    // Department Chart (Pie)
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');
    new Chart(departmentCtx, {
        type: 'pie',
        data: {
            labels: dashboardData.analytics.departments,
            datasets: [{
                data: dashboardData.analytics.departmentCounts,
                backgroundColor: [
                    '#2196f3', '#ff9800', '#4caf50', '#9c27b0', '#f44336'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Patient Distribution by Department'
                }
            }
        }
    });

    // Admission Chart (Bar)
    const admissionCtx = document.getElementById('admissionChart').getContext('2d');
    new Chart(admissionCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Patient Admissions',
                data: dashboardData.analytics.monthlyAdmissions,
                backgroundColor: '#4caf50'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            }
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.addEventListener('click', () => {
            // Update active nav item
            document.querySelectorAll('.nav-links li').forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            document.querySelectorAll('.dashboard-section').forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Notification modal
    document.getElementById('notificationBtn').addEventListener('click', () => {
        document.getElementById('notificationModal').style.display = 'flex';
    });
    
    document.getElementById('closeNotification').addEventListener('click', () => {
        document.getElementById('notificationModal').style.display = 'none';
    });
    
    // Add patient modal
    document.getElementById('addPatientBtn').addEventListener('click', () => {
        document.getElementById('addPatientModal').style.display = 'flex';
    });
    
    document.getElementById('closeAddPatient').addEventListener('click', () => {
        document.getElementById('addPatientModal').style.display = 'none';
    });
    
    // Patient form submission
    document.getElementById('patientForm').addEventListener('submit', handlePatientSubmit);
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', refreshDashboard);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('notificationModal')) {
            document.getElementById('notificationModal').style.display = 'none';
        }
        if (e.target === document.getElementById('addPatientModal')) {
            document.getElementById('addPatientModal').style.display = 'none';
        }
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Search in patients table
    const patientRows = document.getElementById('patientsTable').querySelectorAll('tbody tr');
    patientRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
    
    // Search in appointments table
    const appointmentRows = document.getElementById('appointmentsTable').querySelectorAll('tbody tr');
    appointmentRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Handle patient form submission
function handlePatientSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const condition = document.getElementById('patientCondition').value;
    const phone = document.getElementById('patientPhone').value;
    const address = document.getElementById('patientAddress').value;
    
    // Generate new patient ID
    const newId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Add to patients data
    const newPatient = {
        id: newId,
        name: name,
        age: age,
        gender: gender,
        condition: condition,
        phone: phone,
        address: address,
        admissionDate: new Date().toISOString().split('T')[0],
        status: "admitted"
    };
    
    dashboardData.patients.unshift(newPatient);
    
    // Update patients count
    dashboardData.stats.patients += 1;
    animateValue(document.getElementById('patientsCount'), parseInt(document.getElementById('patientsCount').textContent), dashboardData.stats.patients, 500);
    
    // Re-render patients table
    renderPatientsTable();
    
    // Show success message
    showToast(`Patient "${name}" has been added successfully!`, 'success');
    
    // Reset form and close modal
    document.getElementById('patientForm').reset();
    document.getElementById('addPatientModal').style.display = 'none';
}

// Refresh dashboard
function refreshDashboard() {
    // Simulate fetching new data
    showToast('Dashboard data refreshed!', 'success');
    
    // Add a small visual effect to the stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.opacity = '0.5';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 300);
    });
}

// Show toast notification
function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

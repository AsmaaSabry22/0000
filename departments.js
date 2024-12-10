let departments = [];
let doctors = [];

// إضافة قسم جديد
document.getElementById('departmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const departmentName = document.getElementById('departmentName').value;
    departments.push(departmentName);

    displayDepartments();
    updateDepartmentSelect();
    document.getElementById('departmentForm').reset();
});

// عرض قائمة الأقسام
function displayDepartments() {
    const departmentsList = document.getElementById('departmentsList');
    departmentsList.innerHTML = '';
    departments.forEach((department, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${department}
            <button onclick="deleteDepartment(${index})">حذف</button>`;
        departmentsList.appendChild(listItem);
    });
}

// تحديث قائمة الأقسام في قائمة الأطباء
function updateDepartmentSelect() {
    const departmentSelect = document.getElementById('departmentSelect');
    departmentSelect.innerHTML = '';
    departments.forEach((department, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
}

// إضافة طبيب جديد
document.getElementById('doctorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const departmentIndex = document.getElementById('departmentSelect').value;
    const doctorName = document.getElementById('doctorName').value;
    const specialization = document.getElementById('specialization').value;

    const doctor = {
        department: departments[departmentIndex],
        name: doctorName,
        specialization
    };

    doctors.push(doctor);
    displayDoctors();
    document.getElementById('doctorForm').reset();
});

// عرض قائمة الأطباء
function displayDoctors() {
    const doctorsList = document.getElementById('doctorsList');
    doctorsList.innerHTML = '';
    doctors.forEach((doctor, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `الاسم: ${doctor.name}, التخصص: ${doctor.specialization}, القسم: ${doctor.department}
            <button onclick="deleteDoctor(${index})">حذف</button>`;
        doctorsList.appendChild(listItem);
    });
}

// حذف قسم
function deleteDepartment(index) {
    departments.splice(index, 1);
    displayDepartments();
    updateDepartmentSelect();
}

// حذف طبيب
function deleteDoctor(index) {
    doctors.splice(index, 1);
    displayDoctors();
}

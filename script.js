const departments = {
    "طب الأطفال": { doctors: ["د. أحمد علي", "د. سارة محمد"], price: 100 },
    "الجلدية": { doctors: ["د. خالد حسن", "د. نورا جمال"], price: 150 },
    "العظام": { doctors: ["د. عماد سليمان", "د. هالة يوسف"], price: 200 },
};

let currentBooking = null;

// تعبئة الأقسام الطبية عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const departmentSelect = document.getElementById("departmentSelect");

    for (let department in departments) {
        const option = document.createElement("option");
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    }
});

// تحديث قائمة الأطباء عند اختيار القسم
document.getElementById("departmentSelect").addEventListener("change", function () {
    const doctorSelect = document.getElementById("doctorSelect");
    const selectedDepartment = this.value;

    doctorSelect.innerHTML = "<option value=''>اختر الطبيب</option>";
    if (selectedDepartment) {
        departments[selectedDepartment].doctors.forEach((doctor) => {
            const option = document.createElement("option");
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
});

// تأكيد الحجز
document.getElementById("patientForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const condition = document.getElementById("condition").value;
    const department = document.getElementById("departmentSelect").value;
    const doctor = document.getElementById("doctorSelect").value;
    const date = document.getElementById("appointmentDate").value;

    if (!department || !doctor || !date) {
        alert("يرجى إكمال جميع الحقول!");
        return;
    }

    const price = departments[department].price;

    currentBooking = {
        name,
        age,
        phone,
        condition,
        department,
        doctor,
        date,
        price,
    };

    displayBookingDetails();
    alert("تم تأكيد الحجز بنجاح!");
    this.reset();
});

// عرض تفاصيل الحجز
function displayBookingDetails() {
    const bookingDetails = document.getElementById("bookingDetails");
    if (currentBooking) {
        bookingDetails.innerHTML = `
            <p><strong>الاسم:</strong> ${currentBooking.name}</p>
            <p><strong>العمر:</strong> ${currentBooking.age}</p>
            <p><strong>رقم الهاتف:</strong> ${currentBooking.phone}</p>
            <p><strong>الحالة الصحية:</strong> ${currentBooking.condition}</p>
            <p><strong>القسم:</strong> ${currentBooking.department}</p>
            <p><strong>الطبيب:</strong> ${currentBooking.doctor}</p>
            <p><strong>الموعد:</strong> ${currentBooking.date}</p>
            <p><strong>السعر:</strong> ${currentBooking.price} جنيه</p>
        `;
    } else {
        bookingDetails.innerHTML = "<p>لا يوجد حجز حالياً.</p>";
    }
}

// إلغاء الحجز
document.getElementById("cancelBooking").addEventListener("click", function () {
    if (currentBooking) {
        const confirmCancel = confirm("هل أنت متأكد من إلغاء الحجز؟");
        if (confirmCancel) {
            currentBooking = null;
            displayBookingDetails();
            alert("تم إلغاء الحجز بنجاح!");
        }
    } else {
        alert("لا يوجد حجز لإلغائه.");
    }
});

// تأجيل الحجز
document.getElementById("rescheduleBooking").addEventListener("click", function () {
    if (currentBooking) {
        const newDate = prompt("أدخل موعد التأجيل الجديد (YYYY-MM-DDTHH:MM):", currentBooking.date);
        if (newDate) {
            currentBooking.date = newDate;
            displayBookingDetails();
            alert("تم تأجيل الحجز إلى الموعد الجديد!");
        }
    } else {
        alert("لا يوجد حجز لتأجيله.");
    }
});

// إرسال رسالة WhatsApp
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const message = document.getElementById("message").value;
    if (!message) {
        alert("يرجى إدخال رسالتك قبل الإرسال.");
        return;
    }

    const whatsappUrl = `https://wa.me/0123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
});

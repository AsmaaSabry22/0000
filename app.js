// مصفوفة لتخزين المواعيد
const appointments = [];

// وظيفة لحجز الموعد
function bookAppointment() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;

    // التحقق من تعبئة الحقول
    if (name && date) {
        // إضافة الموعد إلى المصفوفة
        appointments.push({ name, date });

        // عرض المواعيد
        displayAppointments();

        // رسالة نجاح
        alert("تم حجز الموعد بنجاح!");

        // تفريغ الحقول بعد الحجز
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
}

// وظيفة لعرض المواعيد
function displayAppointments() {
    const list = document.getElementById("appointmentsList");

    // مسح القائمة القديمة
    list.innerHTML = "<h2>قائمة المواعيد</h2>";

    // إضافة المواعيد الجديدة
    appointments.forEach((appointment, index) => {
        const item = document.createElement("div");

        // استخدام template literals لعرض المعلومات بشكل صحيح
        item.textContent = `${index + 1}. ${appointment.name} - ${appointment.date}`;
        
        // إضافة العنصر إلى القائمة
        list.appendChild(item);
    });
}

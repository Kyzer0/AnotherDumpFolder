const sectionName = document.getElementById('section-name')
const studentCount = document.getElementById('student-count')
const createBtn = document.getElementById('create-btn')

const sectionNameError = document.getElementById('section-name-error')
const studentCountError = document.getElementById('student-count-error')
const submitError = document.getElementById('submit-error')

sectionName.addEventListener('keyup', validateSectionName)
studentCount.addEventListener('keyup', validateStudentCount)
createBtn.addEventListener('click', validateForm)

function validateSectionName() {
    const sectionNameValue = sectionName.value.trim()

    if (!/[a-z]/.test(sectionNameValue)) {
        sectionNameError.innerHTML = '<p>Section name must not contain lowercase letters</p>';
        return false;
    }

    sectionNameError.innerHTML = `<p class="valid">Section name valid</p>`
    return true
}

function validateStudentCount() {
    const studentCountValue = studentCount.value.trim()

    if (!studentCountValue.match(/^\d+$/)) {
        studentCountError.innerHTML = '<p>Student count must be a number</p>'
        return false
    }

    studentCountError.innerHTML = `<p class="valid">Student count valid</p>`
    return true
}


function validateForm(e) {
    e.preventDefault()

    const isSectionNameValid = validateSectionName()
    const isStudentCountValid = validateStudentCount()

    if (!isSectionNameValid || !isStudentCountValid) {
        submitError.innerHTML = '<p>Fill all the blanks correctly</p>'
        submitError.style.display = 'block'

        setTimeout(() => {
            submitError.style.display = 'none'
        }, 2000)
        return false
    }

    // If validation passes, submit the form
    form.submit()
}
document.addEventListener('DOMContentLoaded', function() {
    const formDashboard = document.getElementById('create-section-form-dashboard');
    const sectionNameDashboard = document.getElementById('section-name-dashboard');
    const studentCountDashboard = document.getElementById('student-count-dashboard');
    const createBtnDashboard = document.getElementById('create-btn-dashboard');

    const sectionNameErrorDashboard = document.getElementById('section-name-error-dashboard');
    const studentCountErrorDashboard = document.getElementById('student-count-error-dashboard');
    const submitErrorDashboard = document.getElementById('submit-error-dashboard');

    sectionNameDashboard.addEventListener('keyup', validateSectionNameDashboard);
    studentCountDashboard.addEventListener('keyup', validateStudentCountDashboard);
    createBtnDashboard.addEventListener('click', validateFormDashboard);

    function validateSectionNameDashboard() {
        const sectionNameValue = sectionNameDashboard.value.trim();

        if (!/[a-z]/.test(sectionNameValue)) {
            sectionNameErrorDashboard.innerHTML = '<p>Section name must not contain lowercase letters</p>';
            return false;
        }

        sectionNameErrorDashboard.innerHTML = `<p class="valid">Section name valid</p>`;
        return true;
    }

    function validateStudentCountDashboard() {
        const studentCountValue = studentCountDashboard.value.trim();

        if (!studentCountValue.match(/^\d+$/)) {
            studentCountErrorDashboard.innerHTML = '<p>Student count must be a number</p>';
            return false;
        }

        studentCountErrorDashboard.innerHTML = `<p class="valid">Student count valid</p>`;
        return true;
    }

    function validateFormDashboard(e) {
        e.preventDefault();

        const isSectionNameValid = validateSectionNameDashboard();
        const isStudentCountValid = validateStudentCountDashboard();

        if (!isSectionNameValid || !isStudentCountValid) {
            submitErrorDashboard.innerHTML = '<p>Fill all the blanks correctly</p>';
            submitErrorDashboard.style.display = 'block';

            setTimeout(() => {
                submitErrorDashboard.style.display = 'none';
            }, 2000);
            return false;
        }

        // If validation passes, submit the form
        formDashboard.submit();
    }

    formDashboard.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(formDashboard);
        fetch(formDashboard.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': '{{ csrf_token }}'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = '{% url "teacher_dashboard" %}';
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
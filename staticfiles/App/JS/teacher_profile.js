document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('manage-profile-form');
    const deleteBtn = document.getElementById('delete-profile-btn');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            action: 'update',
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value
        };

        fetch('/teacher/profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                // Redirect to dashboard after successful update
                window.location.href = '/teacher/dashboard/';
            } else {
                alert(data.error || 'Update failed');
            }
        });
    });

    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
            fetch('/teacher/profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ action: 'delete' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = '/teacher/login/';
                } else {
                    alert(data.error || 'Delete failed');
                }
            });
        }
    });
});

function loadProfilePic(event) {
    const image = document.getElementById('profile-pic');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = () => URL.revokeObjectURL(image.src); // Free up memory after loading
}

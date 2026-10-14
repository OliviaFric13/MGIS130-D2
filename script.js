// ==========================================
// GPA Calculator - JavaScript Logic & Processing Layer
// ==========================================

// Grade point mapping dictionary
const gradePointsMap = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "D": 1.0,
    "F": 0.0
};

// State: Load courses from browser localStorage or initialize empty array
let courses = JSON.parse(localStorage.getItem('gpa_courses')) || [];

// DOM Elements
const courseForm = document.getElementById('course-form');
const courseNameInput = document.getElementById('course-name');
const courseCreditsInput = document.getElementById('course-credits');
const courseGradeInput = document.getElementById('course-grade');
const courseListElement = document.getElementById('course-list');
const totalCreditsElement = document.getElementById('total-credits');
const totalQualityPointsElement = document.getElementById('total-quality-points');
const cumulativeGpaElement = document.getElementById('cumulative-gpa');
const clearAllBtn = document.getElementById('clear-all-btn');

// Initialize app when DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});

// Handle Form Submission (Add Course)
courseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const courseName = courseNameInput.value.trim();
    const credits = parseInt(courseCreditsInput.value);
    const grade = courseGradeInput.value;

    if (!courseName || isNaN(credits) || !grade) return;

    const newCourse = {
        id: Date.now().toString(),
        courseName,
        credits,
        grade
    };

    courses.push(newCourse);
    saveAndRender();
    courseForm.reset();
    courseCreditsInput.value = "3"; // Reset default
});

// Delete Individual Course
window.deleteCourse = function(id) {
    courses = courses.filter(course => course.id !== id);
    saveAndRender();
};

// Clear All Courses
clearAllBtn.addEventListener('click', () => {
    if (courses.length === 0) return;
    if (confirm("Are you sure you want to clear all courses?")) {
        courses = [];
        saveAndRender();
    }
});

// Save to LocalStorage and Update UI
function saveAndRender() {
    localStorage.setItem('gpa_courses', JSON.stringify(courses));
    renderApp();
}

// Processing & Render Function
function renderApp() {
    courseListElement.innerHTML = '';

    if (courses.length === 0) {
        courseListElement.innerHTML = `
            <tr id="empty-state">
                <td colspan="4" class="empty-message">No courses added yet. Add a course above to get started!</td>
            </tr>
        `;
        totalCreditsElement.textContent = '0';
        totalQualityPointsElement.textContent = '0.0';
        cumulativeGpaElement.textContent = '0.00';
        return;
    }

    let totalCredits = 0;
    let totalQualityPoints = 0;

    courses.forEach(course => {
        const gp = gradePointsMap[course.grade] || 0;
        const qualityPoints = gp * course.credits;

        totalCredits += course.credits;
        totalQualityPoints += qualityPoints;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(course.courseName)}</strong></td>
            <td>${course.credits}</td>
            <td>${course.grade} (${gp.toFixed(1)})</td>
            <td><button class="btn-secondary" onclick="deleteCourse('${course.id}')">Delete</button></td>
        `;
        courseListElement.appendChild(tr);
    });

    const cumulativeGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

    totalCreditsElement.textContent = totalCredits;
    totalQualityPointsElement.textContent = totalQualityPoints.toFixed(1);
    cumulativeGpaElement.textContent = cumulativeGPA;
}

// XSS Sanitizer Helper
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

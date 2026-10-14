# MGIS130-D2
# Academic GPA Calculator

A responsive single-page web application designed to calculate cumulative Grade Point Averages (GPA), manage enrolled courses dynamically, and persist user records locally in the browser. 

This project was built to demonstrate the **Three-Layer Architecture** of information systems.

---

## 🏗️ Three-Layer Architecture Breakdown

This application strictly separates concerns into three distinct layers:

### 1. Data Layer (Information Storage)
* **User Inputs:** Captures course names, credit weights (1–5 credits), and assigned letter grades via interactive HTML form controls.
* **Local Persistence:** Utilizes browser `localStorage` to save and retrieve course objects formatted in JSON format (`{ id, courseName, credits, grade }`).
* **Data State:** Records automatically load when the page is refreshed or re-opened, eliminating data loss without requiring external databases.

### 2. Processing Layer (Business Logic)
* **Grade Point Conversion:** Maps letter grades (`A` to `F`) to standard 4.0 numerical quality values via a JS key-value dictionary.
* **Quality Point Calculation:** Computes points for each course ($\text{Quality Points} = \text{Credits} \times \text{Grade Value}$).
* **Aggregation & Division:** Sums total credits and quality points across all entries, computing cumulative GPA ($\text{Cumulative GPA} = \frac{\text{Total Quality Points}}{\text{Total Credits}}$).
* **Validation & Safeguards:** Prevents division-by-zero errors when no courses exist and handles input form validation.

### 3. User Interface Layer (Presentation)
* **Semantic HTML5:** Built with clean, accessible form structures, table elements, and summary dashboard containers.
* **Modern CSS Styling:** Styled using custom CSS variables, a cohesive color palette, clear visual hierarchy, and full responsive grid/flexbox layouts for desktop and mobile.
* **Dynamic DOM Updates:** Interactively renders new courses, updates calculation metrics instantly, and provides empty-state feedback using JavaScript DOM manipulation.

---

## 🚀 Features

* ➕ **Add Courses:** Dynamic form input for course code, credit hours, and letter grades.
* 🗑️ **Remove Entries:** Easily delete individual courses or use the **Clear All** button to reset.
* ⚡ **Real-Time Calculation:** Cumulative GPA, Total Credits, and Total Quality Points recalculate instantly upon any change.
* 💾 **Automatic Local Storage:** Saved records persist across page reloads.
* 📱 **Fully Responsive:** Styled cleanly for both mobile devices and desktop screens.

---

## 🛠️ Built With

* **HTML5** – UI Structure & Forms
* **CSS3** – Styling, Layout, and Responsive Design
* **JavaScript (ES6+)** – Application Logic & DOM Manipulation
* **Google Gemini AI** – Architecture Planning & Development Assistance
* **GitHub Pages** – Web Hosting & Deployment

---

## 🌐 Live Demo

You can access the deployed application here:
👉 `https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 📖 How to Run Locally

1. Clone this repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

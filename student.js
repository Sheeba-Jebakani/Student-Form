function submitForm() {
    let inputs = document.querySelectorAll('#page1 input');
    let valid = true;

    // Remove all previous invalid highlights first
    inputs.forEach(input => input.classList.remove("invalid"));

    // Basic empty check
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add("invalid");
            valid = false;
        }
    });
    if (!valid) return;

    // Get values
    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const college = document.getElementById('college').value.trim();
    const degree = document.getElementById('degree').value.trim();
    const percentage = parseFloat(document.getElementById('percentage').value);
    const year = parseInt(document.getElementById('year').value, 10);

    // Age validation
    if (isNaN(age) || age < 1 || age > 120) {
        document.getElementById('age').classList.add("invalid");
        valid = false;
    }

    // Percentage validation
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        document.getElementById('percentage').classList.add("invalid");
        valid = false;
    }

    // Year validation (between 1950 and current year)
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1950 || year > currentYear) {
        document.getElementById('year').classList.add("invalid");
        valid = false;
    }

    // Email validation using regex (simple)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email').classList.add("invalid");
        valid = false;
    }

    // DOB validation: must be a valid date and not in the future
    const dobDate = new Date(dob);
    if (!dob || dobDate.toString() === "Invalid Date" || dobDate > new Date()) {
        document.getElementById('dob').classList.add("invalid");
        valid = false;
    }

    if (!valid) return;

    let data = {
        Name: name,
        Age: age,
        DOB: dobDate.toLocaleDateString(),
        Email: email,
        College: college,
        Degree: degree,
        Percentage: percentage,
        Year: year
    };

    let tableHTML = '';
    for (let key in data) {
        tableHTML += `<tr><th>${key}</th><td>${data[key]}</td></tr>`;
    }
    document.getElementById('resultTable').innerHTML = tableHTML;

    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.remove('hidden');
}
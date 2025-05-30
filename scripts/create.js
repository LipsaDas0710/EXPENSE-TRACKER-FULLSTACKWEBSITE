window.onload = () => {

    const toggleBtn =document.querySelector(".toggle-button");
        const dropdown =document.querySelector(".dropdown-menu");        
        toggleBtn.addEventListener("click",()=>{
            dropdown.classList.toggle('top-16');
        });

const form = document.getElementById("expenseForm");
const editCheckbox = document.getElementById("editCheckbox");
const shareCheckbox = document.getElementById("shareCheckbox");
const expenseId = document.getElementById("expenseId").value;
const passwordCheckbox = document.getElementById("passwordCheckbox");
const passwordField = document.getElementById("passwordField");
const editAndShare = document.getElementById("editAndShare");


passwordCheckbox.addEventListener("change", () => {
    if (passwordCheckbox.checked) {
        // Show the password field and edit/share section
        passwordField.classList.remove("hidden");
        passwordField.querySelector("input").disabled = false; // Enable the password input
    } else {
        // Hide the password field and edit/share section
        passwordField.classList.add("hidden");
        passwordField.querySelector("input").disabled = true; // Disable the password input
        
    }
});

expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const edit = editCheckbox.checked;
    const share = shareCheckbox.checked;
    const encrypt = passwordCheckbox.checked;
    const password = passwordCheckbox.checked
            ? document.getElementById("passwordInput").value
            : null;

            if (!passwordCheckbox.checked) {
                passwordInput.disabled = true;
            } else {
                passwordInput.disabled = false;
            }

            const data = {
                title,
                content,
                encrypt,
                share,
                edit,
                _id: expenseId,
                
            };
            
            if (password) {
                data.password=password;
            }


    try {
        // AJAX request to save/update expense
        const response = await fetch(`/create/save/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert("Expense saved successfully!");
            window.location.href = `/expense/${username}`;
        } else {
            console.error("Failed to save expense:", response.statusText);
        }
    } catch (err) {
        console.error("Error during submission:", err);
        
    }
});

        
}


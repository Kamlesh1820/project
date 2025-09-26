const API_URL = "http://127.0.0.1:8000/tasks";

const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    tasksList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title}: ${task.description}`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editTask(task);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        tasksList.appendChild(li);
    });
}

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    taskForm.reset();
    fetchTasks();
});

async function editTask(task) {
    const newTitle = prompt("Edit title:", task.title);
    const newDesc = prompt("Edit description:", task.description);
    if (newTitle && newDesc) {
        await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, description: newDesc })
        });
        fetchTasks();
    }
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Load tasks on page load
fetchTasks();


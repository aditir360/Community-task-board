const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const deadlineInput = document.getElementById('deadline');
const contactInput = document.getElementById('contact');
const taskList = document.getElementById('task-list');

let tasks = [
    { id: 1, description: 'Grocery shopping for elderly neighbor', deadline: '2024-06-30', contact: 'john@example.com', taken: false },
    { id: 2, description: 'Help with garden weeding', deadline: '2024-07-02', contact: 'jane@example.com', taken: false },
    { id: 3, description: 'Dog walking for sick owner', deadline: '2024-07-05', contact: 'smith@example.com', taken: false }
];

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskDescription = taskInput.value;
    const deadline = deadlineInput.value;
    const contact = contactInput.value;

    if (!taskDescription || !deadline || !contact) return;

    const task = {
        id: generateID(),
        description: taskDescription,
        deadline: deadline,
        contact: contact,
        taken: false
    };

    tasks.push(task);
    updateTaskList();
    taskInput.value = '';
    deadlineInput.value = '';
    contactInput.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function updateTaskList() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span>${task.description} (Due: ${task.deadline}) - Contact: ${task.contact}</span>
            <button class="take-btn" onclick="takeTask(${task.id})">Take Task</button>
        `;

        if (task.taken) {
            item.querySelector('.take-btn').innerText = 'Task Taken';
            item.querySelector('.take-btn').disabled = true;
        }

        taskList.appendChild(item);
    });
}

function takeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.taken = true;
    }
    updateTaskList();
}

updateTaskList();

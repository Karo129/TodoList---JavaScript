let taskInput //miejsce, gdzie użytkownik wpisuje zadanie do wykonania
let errorInfo //informacja o braku tekstu w inpucie
let todoBtn //dodanie nowego taska do listy
let ul // lista zadań
let createdTask //nowo dodane li, nowe zadania
let popup // popup
let popupInfo //tekst w popupie jak nie wpiszemy tekstu tylko będzie puste pole
let taskDoEdit // next chapter
let popupInput //input w popupie
let acceptBtnPopup 
let cancelBtnPopup

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = ()=> {
    taskInput= document.querySelector('.taskInput');
    errorInfo= document.querySelector('.error-info');
    todoBtn= document.querySelector('.todo-btn');
    ul= document.querySelector('.todo ul');
    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-body-info');
    popupInput = document.querySelector('.popup-body input');
    acceptBtnPopup = document.querySelector('.accept');
    cancelBtnPopup = document.querySelector('.cancel');
}

 const prepareDOMEvents = () => {
   todoBtn.addEventListener('click', createTask);
   ul.addEventListener('click', chosenTool);
   cancelBtnPopup.addEventListener('click', closePopup);
   acceptBtnPopup.addEventListener('click', changeTask);
 }

const createTask= ()=> {
    if(taskInput.value !== ''){
       createdTask=document.createElement('li');
       createdTask.textContent = taskInput.value;
       createAllTools();
       ul.append(createdTask);

       taskInput.value = '';
       errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter your task';
    }
}
const createAllTools=()=> {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    createdTask.append(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.textContent = 'DONE';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent= 'DELETE';

    toolsPanel.append(completeBtn, editBtn, deleteBtn);
}

const chosenTool =e=>{
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')){
        editTask(e);
    } else if (e.target.matches('.delete')){
        deleteTask(e);
    }

}

const editTask = (e) => {
    taskDoEdit =e.target.closest('li');
    popupInput.value = taskDoEdit.firstChild.textContent;
    popup.style.display= 'flex';
}
const closePopup = () => {
   popup.style.display = 'none'; 
   popupInfo.textContent = '';
}

const changeTask= () =>{
    if(popupInput.value !== ''){
    taskDoEdit.firstChild.textContent=  popupInput.value;
    popup.style.display= 'none';
}else{
    popupInfo.textContent = 'Enter your change!';
}
}
deleteTask = (e) => {
   e.target.closest('li').remove();

   const allTasks = document.querySelectorAll('li');

   if(allTasks.length === 0){
    errorInfo.textContent ='no tasks to show :)';
   }
}

const clickEnter =(e)=> {
    if(e.key === 'enter'){
        createTask();
    }

}


 document.addEventListener('DOMContentLoaded', main);
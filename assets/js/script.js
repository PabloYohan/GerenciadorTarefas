(function () {
  
  function criaTarefa(text, ul) {
    const li = document.createElement("li");
    li.textContent += text;
    createButtonCheck(li);
    li.classList.add("disabled");
    ul.appendChild(li);
    salvaTarefa();
  }

  function createButtonCheck(li) {
    const check = document.createElement("button");
    check.textContent = "✔";
    check.classList.add("notChecked");
    li.appendChild(check);
  }

  function salvaTarefa() {
    const li = document.querySelectorAll("li");
    const vetTarefas = [];
    for (let node of li) {
      vetTarefas.push(node.textContent.replace("✔", "").trim());
    }
    localStorage.setItem("tarefas", JSON.stringify(vetTarefas));
  }

  function addTarefaSalva() {
    const tarefas = localStorage.getItem("tarefas");
    const vetTarefas = JSON.parse(tarefas);

    for (let tarefa of vetTarefas) {
      criaTarefa(tarefa, lista);
    }
  }

  const form = document.querySelector(".envio");
  const input = document.querySelector(".input");
  const lista = document.querySelector(".lista");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value){
      criaTarefa(input.value, lista);
    }
    form.reset();
  });

  document.addEventListener("click", e =>{
    if(e.target.classList.contains("remover")){
      const selected = document.querySelectorAll(".checked");
      for(let node of selected){
        node.parentElement.remove();
      }
      salvaTarefa();
    }
    
    if(e.target.classList.contains("notChecked")){
      e.target.classList.remove('notChecked');
      e.target.classList.add('checked');
      e.target.parentElement.classList.add("enabled");
      return;
    }

    if(e.target.classList.contains("checked")){
      e.target.classList.remove('checked');
      e.target.classList.add('notChecked');
      e.target.parentElement.classList.remove("enabled");
    }
  })
  addTarefaSalva();
})();

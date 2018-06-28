<template>
<div>
    <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand"> Aplicación Tareas </a>
    </nav>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">      
                    <div class="card-body">
                        <form @submit.prevent="addTask">
                            <div class="form-group">
                            <input type="hidden" id="id" v-model="task._id">
                                <input type="text" 
                                       name="title" 
                                       id="title" 
                                       class="form-control" 
                                       placeholder="Titulo de tarea"
                                       v-model="task.title">
                            </div>
                            <div class="form-group">
                                <textarea name="description" 
                                          id="description" 
                                          cols="30" rows="10" 
                                          class="form-control" 
                                          placeholder="Descripción de la tarea"
                                          v-model="task.description"
                                          ></textarea>
                            </div>
                            <button class="btn btn-primary btn-block"> Enviar </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <button class="btn btn-info btn block" @click="getTasks"> Pedir Tareas </button>
                <div v-if="tasks">
                    <div v-for="(task,index) in tasks.tasks" :key="index">
                        <div class="card">
                            <div class="card card-title">
                                <h4 class="ml-10">{{index + 1}}-{{task.title}}</h4>    
                            </div>
                            <div class="card-body">
                                <p>{{task.description}}</p>
                                <p>{{task._id}}</p>
                                
                                <button class="btn btn-warning btn-block" @click="getTask(task._id)">Modificar</button>
                                <button class="btn btn-danger btn-block" @click="deletedTask(task._id)">Eliminar</button>   
                            </div>
                        </div>
                    </div>      
                 </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
    };
  },
  methods: {
    addTask() {
        if(this.task._id != null){
            this.updatedTask(this.task)
        }else {
            
            fetch("/api/task", {
              method: "post",
              body: JSON.stringify(this.task),
              headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
              }
            })
              .then(res => res.json())
              .then(data => console.log(data));
              this.task = new Task();
              this.getTasks();   
        }
    },
    getTasks() {
      fetch("/api/tasks", {
        method: "get"
      })
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    getTask(id){
        fetch ("api/task/" + id,{
            method:"get"
        })
        .then(res => res.json())
        .then(data => {
          this.task = data.Tarea;
        }); 
    },
    deletedModified(id){
        console.log("deleted " + id);
  },
  updatedTask(task){
        fetch ("api/task/" + task._id,{
            method:"put",
             body: JSON.stringify(task),
              headers: {
             "Accept": "application/json",
            "Content-type": "application/json"
              }
        })
        .then(res => res.json())
        .then(data => {
          console.log("Se ha modificado la tarea ");
        }); 
    },
    deletedTask(id){
        fetch ("api/task/" + id,{
            method:"delete",
        })
        .then(res => res.json())
        .then(data => {
          console.log("Se ha eliminado la tarea");
          this.getTasks();
        }); 
    }
}
}
</script>

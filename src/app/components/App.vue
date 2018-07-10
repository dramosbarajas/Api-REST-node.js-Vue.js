<template>
    <v-app>
<div>
      <header-component></header-component>
  <div>
  <v-alert
      v-model="alerts.alertSuccess"
      dismissible
      type="success"
      transition="scale-transition"
    >
      Se ha creado una nueva tarea.
    </v-alert>
    <v-alert
      v-model="alerts.alertError"
      dismissible
      type="error"
      transition="scale-transition"
    >
      Ha ocurrido un error.
    </v-alert>
    <v-alert
      v-model="alerts.alertUpdated"
      dismissible
      type="info"
      transition="scale-transition"
    >
      Los datos han sido actualizados correctamente.
    </v-alert>
     <v-alert
      v-model="alerts.alertDeleted"
      dismissible
      type="success"
      transition="scale-transition"
    >
      La tarea ha sido eliminada correctamente.
    </v-alert>
  </div>
   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
          <v-form class="mt-3">
        <h2>Formulario para inserción de tareas.</h2>
        <input type="hidden" name="id" v-model="task._id">
            <v-text-field 
              name="title" 
              id="title" 
              v-model="task.title"
              required
              label="Título de la tarea">
            ></v-text-field>
             <v-textarea
              id="description" 
              v-model="task.description"
              label="Descripción de la tarea"
              required
            ></v-textarea>      
            <v-btn color="success" class="center" @click="addTask">Guardar Tarea</v-btn>
          </v-form>
      </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs8 sm8 lg8 offset-xs2 offset-sm2 offset-lg2>         
        <h2>Tareas</h2>
    </v-flex>
  </v-layout>
    <v-layout row wrap>
      <v-flex v-for="(task,index) in tasks" :key="index" xs12 sm6 lg4 offset-xs0 offset-sm0 offset-lg0 text-xs-left text-sm-left text-lg-left>
          <v-card class="mt-5" height="100%">
          <v-card-title>
            <div height="100%">
              <span class="grey--text">Tarea  {{index + 1}}</span><br>
              <span>{{ task.title }}</span><br>
              <span>{{ task.description }}</span><br>
              <v-btn v-if="task.completed" color="primary" fab outline small dark>
              <v-icon>done</v-icon>
            </v-btn>
            <v-btn v-if="!task.completed" color="primary" fab outline small dark>
              <v-icon>cancel</v-icon>
            </v-btn>
            </div>
          </v-card-title>
            <hr>
          <v-card-actions>
            <v-btn @click="getTask(task._id)"  color="primary" fab small dark>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn @click="deletedTask(task._id)" color="red" fab small dark>
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn color="deep-purple lighten-2" fab small dark>
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</v-app>
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
      alerts:{
        alertSuccess:'',
        alertError:'',
        alertUpdated:'',
        alertDeleted:'',
      }
    };
  },created: function () {
    // `this` points to the vm instance
   this.getTasks();
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
              this.alerts.alertSuccess=true;
              setTimeout(() => {
                this.alerts.alertSuccess=false;
              }, 2000);
              this.getTasks();   
        }
    },
    getTasks() {
      fetch("/api/tasks", {
        method: "get"
      })
        .then(res => res.json())
        .then(data => {
          this.tasks = data.tasks;
        });
    },
    getTask(id){
        fetch ("api/task/" + id,{
            method:"get"
        })
        .then(res => res.json())
        .then(data => {
          window.scrollTo(0,0)
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
          this.task = new Task();
          window.scrollTo(0,0)
          this.alerts.alertUpdated=true;
              setTimeout(() => {
                this.alerts.alertUpdated=false;
              }, 2000);
          this.getTasks(); 
        }); 
    },
    deletedTask(id){
        fetch ("api/task/" + id,{
            method:"delete",
        })
        .then(res => res.json())
        .then(data => {
          console.log("Se ha eliminado la tarea");
          window.scrollTo(0,0)
          this.alerts.alertDeleted=true;
              setTimeout(() => {
                this.alerts.alertDeleted=false;
              }, 2000);
          this.getTasks();
        }); 
    }
}
}
</script>
<style>
.logo:hover{
  transform: scale(1.2);
}
</style>

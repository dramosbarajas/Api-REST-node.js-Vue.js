<template>
        <v-toolbar class="deep-purple lighten-2"> 
            <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <a href="https://github.com/dramosbarajas/Api-REST-node.js-Vue.js"><img class="logo" src="img/github.png" alt="Github"></a>
        </v-toolbar>
</template>
<script>
export default {
    name:'headerComponent',
    data(){
        return{
            title:"Aplicación de Tareas."
        }
    }
}
</script>

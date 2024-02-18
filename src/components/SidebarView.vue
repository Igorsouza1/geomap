<template>
    <div class="sidebar">
      <!-- Content of the sidebar here -->
      <p>Shapes</p>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue'
  
  defineComponent({
    name: 'Sidebar'
  })
  </script>
  
  <style scoped>
  .sidebar {
    z-index: 10;
    width: 120px;
    height: 100vh;
    background-color: #333;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
  }

  
  .sidebar p {
    padding: 20px;
    font-size: 1.2em;
  }
  
  .sidebar a {
    color: #fff;
    text-decoration: none;
  }
  
  .sidebar a:hover {
    text-decoration: underline;
}
  </style>
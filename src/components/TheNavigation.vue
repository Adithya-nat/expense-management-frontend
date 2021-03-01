<template>
  <nav id="nav">
    <p class="logo"> Expense Management System</p>
    <ul class="nav-links">
      <li>
        <router-link :to="{ name: 'HomePage' }" class="links">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Analytics' }" class="links">Analytics</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Signup' }" class="links">Signup</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Login' }" class="links">Login</router-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #2c3e50;
  border: 1px solid rebeccapurple;
  z-index: 1;
}
#nav ul {
  list-style-type: none;
}
#nav a {
  font-weight: bold;
  color: #2c7fd2;
}

.nav-links {
  display: flex;
}

.links {
  padding-right: 20px;
}

.links:hover {
  text-decoration: underline;
}

.logo {
  font-size: 20px;
  color: olivedrab;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
}
</style>

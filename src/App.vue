<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@font-face {
  font-family: 'Titillium Web';
  src:  url('assets/fonts/TitilliumWeb-Regular.woff2') format('woff2'),
  url('assets/fonts/TitilliumWeb-Regular.woff') format('woff');
}

* {
   margin:0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: "Titillium Web", Arial, sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
	background: linear-gradient(360deg, #090C14 0%, #1A1E29 100%);
	color: #ACB2BB
}

#app,
#root {
  min-height: 100vh;
}
button, a {
  cursor: pointer;
  font-family: "Titillium Web", Arial, sans-serif;
}
button:disabled {
  cursor: not-allowed;
}
</style>

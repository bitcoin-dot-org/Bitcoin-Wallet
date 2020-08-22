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
}

html, body{
  height: 100vh;
  font-family: "Titillium Web", Arial, sans-serif;
  font-size: 16px;
}

a {
  color: #FFFFFF;
  text-decoration: none;
  cursor: pointer;
  outline: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  /* background: url('assets/overview-bg.svg') top no-repeat; */
  background-color: #efefef;
}

.btn {
    display: inline-block;
    max-width: 100%;
    padding: 16px 25px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 100%;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
}

.btn-orange {
    color: white;
    background: #FF9500;
}

.btn-light {
    background-color: #ffffff;
    border: 1px solid #ff9500;
    color: #ff9500;
}

.btn-home {
    width: 200px;
    height: 55px;
}

.btn:not(:first-child) {
    margin-left: 20px;
}

#box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#inner {
    padding: 20px;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


#inner h2 {
    margin: 10px;
}

#notice {
    padding: 20px;
    color: #77767e;
    background-color: #FFF9F3;

}

#navigation {
    margin-top: 20px;
}

</style>

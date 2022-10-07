window.addEventListener("DOMContentLoaded", async () =>{
    console.clear();
  
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
  
    loginBtn.addEventListener('click', (e) => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classNameList).find((element) => {
        if(element !== "slide-up") {
          parent.classNameList.add('slide-up')
        }else{
          signupBtn.parentNode.classNameList.add('slide-up')
          parent.classNameList.remove('slide-up')
        }
      });
    });
  
    signupBtn.addEventListener('click', (e) => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classNameList).find((element) => {
        if(element !== "slide-up") {
          parent.classNameList.add('slide-up')
        }else{
          loginBtn.parentNode.parentNode.classNameList.add('slide-up')
          parent.classNameList.remove('slide-up')
        }
      });
    });
}
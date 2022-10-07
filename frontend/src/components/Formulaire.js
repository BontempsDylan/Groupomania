import '../styles/CSS/main.css';

function formulaire() {

  return (
    <html className="html--formualire">
      <body className="body--formualire">
        <div className="form-structor">
          <div className="signup">
            <h2 className="form-title" id="signup"><span>ou</span>Inscrivez-vous</h2>
            <div className="form-holder">
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Inscrivez-vous</button>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="login"><span>ou</span>Connectez-vous</h2>
              <div className="form-holder">
                <input type="email" className="input" placeholder="Email" />
                <input type="password" className="input" placeholder="Password" />
              </div>
              <button className="submit-btn">Connectez-vous</button>
            </div>
          </div>
        </div>
      <script src="./SlideUp.js"></script>
      </body>
    </html>
  );
}
  
export default formulaire;
/* window.onload=function(){
  console.clear();

  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');

  console.log(loginBtn);
  console.log(signupBtn);

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
} */
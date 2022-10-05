import '../styles/CSS/main.css';

/* console.clear(); */

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

function formulaire() {

  return (
    <html className="html--formualire">
      <body className="body--formualire">
        <div class="form-structor">
          <div class="signup">
            <h2 class="form-title" id="signup"><span>ou</span>Iscrivez-vous</h2>
            <div class="form-holder">
              <input type="text" class="input" placeholder="Name" />
              <input type="email" class="input" placeholder="Email" />
              <input type="password" class="input" placeholder="Password" />
            </div>
            <button class="submit-btn">Iscrivez-vous</button>
          </div>
          <div class="login slide-up">
            <div class="center">
              <h2 class="form-title" id="login"><span>ou</span>Connectez-vous</h2>
              <div class="form-holder">
                <input type="email" class="input" placeholder="Email" />
                <input type="password" class="input" placeholder="Password" />
              </div>
              <button class="submit-btn">Connectez-vous</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
  
export default formulaire;
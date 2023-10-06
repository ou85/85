// 1) Create a new firebaseui.auth instance stored to our local variable ui
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// 2) These are our configurations.
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      //   const user = authResult.user;
      //   const uid = user.uid;

      //   // Ссылка на базу данных Firebase.
      //   const database = firebase.database();

      //   // Проверяем, существует ли пользователь с таким uid в базе данных.
      //   database
      //     .ref("users/" + uid)
      //     .once("value")
      //     .then((snapshot) => {
      //       if (snapshot.exists()) {
      //         // Пользователь существует в базе данных, входим как существующего пользователя.
      //         console.log("Пользователь уже существует.");
      //         console.log(snapshot);
      //       } else {
      //         // Пользователя с таким uid нет в базе данных, создаем нового пользователя.
      //         console.log("Создаем нового пользователя.");
      //         // Здесь вы можете выполнить создание нового пользователя в базе данных.
      //         database
      //           .ref("users/" + uid)
      //           .set({ name: user.displayName, email: user.email });
      //       }
      //     });

      //   // Возвращаем true, чтобы Firebase знал, что обработка перенаправления будет вручную.
      return true;
    },
    uiShown() {
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  //   signInSuccessUrl: "signedIn",
  signInSuccessUrl: "sidemenu_gradient.html",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // Additional login options should be listed here
    // once they are enabled within the console.
  ],
};

// 3) Call the 'start' method on our ui class
// including our configuration options.
ui.start("#firebaseui-auth-container", uiConfig);

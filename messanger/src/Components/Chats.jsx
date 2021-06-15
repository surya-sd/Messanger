import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./Firebase";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
export const Chats = () => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Messanger</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

// import React, { useRef, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { ChatEngine } from "react-chat-engine";
// import { auth } from "./Firebase";
// import { useAuth } from "../Context/AuthContext";
// import axios from "axios";
// export const Chats = () => {
//   const history = useHistory();
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   console.log(user);
//   const handleLogout = () => {
//     auth.signOut();
//     history.push("/");
//   };

//   const getFile = async (url) => {
//     const response = await fetch(url);
//     const data = await response.blob();
//     return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
//   };
//   useEffect(() => {
//     if (!user) {
//       history.push("/");
//       return;
//     }
//     console.log(user.email);
//     axios
//       .get("https://api.chatengine.io/users/me/", {
//         headers: {
//           "project-id": "4ebf1fd2-a8ae-43ea-a68d-3960355af7c4",
//           "user-name": user.email,
//           "user-secret": user.uid,
//         },
//       })
//       .then(() => setLoading(false))
//       .catch((err) => {
//         let formdata = new FormData();
//         formdata.append("email", user.email);
//         formdata.append("username", user.displayName);
//         formdata.append("secret", user.uid);
//         getFile(user.photoURL).then((avatar) => {
//           formdata.append("avatar", avatar, avatar.name);

//           for (var value of formdata.values()) {
//             console.log(value);
//           }
//           axios
//             .post("https://api.chatengine.io/users/", formdata, {
//               headers: { "private-key": "920b7cb6-448b-4168-8806-a8c6fbbd17d2" },
//             })
//             .then(() => setLoading(false))
//             .catch((error) => console.log(error));
//         });
//       });
//   }, [user, history]);
//   if (!user || loading) return "Loading...";
//   return (
//     <div className="chats-page">
//       <div className="nav-bar">
//         <div className="logo-tab">Messanger</div>
//         <div className="logout-tab" onClick={handleLogout}>
//           Logout
//         </div>
//       </div>
//       <ChatEngine
//         height="calc(100vh - 66px)"
//         projectID="4ebf1fd2-a8ae-43ea-a68d-3960355af7c4"
//         userName={user.email}
//         userSecret={user.uid}
//       />
//     </div>
//   );
// };

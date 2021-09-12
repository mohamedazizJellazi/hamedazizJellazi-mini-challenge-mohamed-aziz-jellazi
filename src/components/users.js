import React, { useState, useEffect } from "react";
import axios from "axios";
import Userdata from "./userdata";
import useFullpageLoader from "./hooks/useFullpageloader";
import Posts from "./posts";
import ErrorBoundary from "./errorbounday";
function Users() {
  const [pages, setpages] = useState(1); //le numéro de page
  const [alluser, setusers] = useState([]); // liste de tout les users
  const [userslist, setuserslist] = useState([]); // liste des users dans l'interface
  const [detailuser, setdetailuser] = useState(0); // id de users qu'on veut savoir ses détails
  const [searchuser, setsearchuser] = useState(""); // filtre par nom
  const [loader, showLoader, hideLoader] = useFullpageLoader(); //loading
  function throwerror() {
    throw "error";
  } //emettre un erreur
  function getusers(page) {
    showLoader();
    axios
      .get(`https://gorest.co.in/public/v1/users?page=${page}`)
      .then((response) => {
        const list = response.data.data;
        list.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        }); //l'ordre par nom
        setusers(list);
        setuserslist(list);
      }) // requéte pour avoir liste des users d'une page
      .then((response) => hideLoader())
      .catch((error) => console.log(error));
  } // fonction pour avoir liste de users d'une page et l'ordre par nom
  useEffect(() => {
    getusers(pages);
  }, []); //avoir liste de users du 1ere page dans le mounting
  function getnextpage() {
    getusers(pages + 1);
    setpages(pages + 1);
  } // fonction pour accéder au page suivante

  function getpreviouspage() {
    getusers(pages - 1);
    setpages(pages - 1);
  } // fonction pour accéder au page précédente
  function usersearch() {
    let newusers = [];
    if (searchuser.length) {
      alluser.forEach((user) => {
        let namesearch = user.name.toLowerCase();
        if (namesearch.indexOf(searchuser.toLowerCase()) === 0) {
          newusers.push(user);
        }
      });
    } else {
      newusers = alluser;
    }
    setuserslist(newusers);
  } //fonction pour filtrer la liste de users par nom
  return (
    <div className="App-body">
      <div>
        {detailuser ? (
          <div></div>
        ) : (
          <input
            onChange={(e) => setsearchuser(e.target.value)}
            placeholder="name"
          />
        )}
        {detailuser ? (
          <div></div>
        ) : (
          <button onClick={usersearch}>search</button>
        )}
      </div>
      {pages === 1 || detailuser ? (
        <div></div>
      ) : (
        <button onClick={getpreviouspage}>previous page</button>
      )}
      {pages > 104 || detailuser ? (
        <div></div>
      ) : (
        <button onClick={getnextpage}>next page</button>
      )}
      {userslist && !detailuser ? (
        userslist.map((users, key) => (
          <Userdata detail={(e) => setdetailuser(e)} key={key} datas={users} />
        ))
      ) : userslist && detailuser ? (
        <ErrorBoundary>
          <Posts post={detailuser} />
        </ErrorBoundary>
      ) : (
        throwerror()
      )}
      {loader}
    </div>
    // afficher la liste des users avec filtre
  );
}
export default Users;

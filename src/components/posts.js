import React, { useState, useEffect } from "react";
import axios from "axios";
import Postsdata from "./Postsdata";
import useFullpageLoader from "./hooks/useFullpageloader";
function Posts(props) {
  const [pages, setpages] = useState(1); //le numéro de page
  const [allposts, setposts] = useState([]); // liste de tout les posts
  const [postlist, setpostlist] = useState([]); // / liste des posts dans l'interface
  const [detailpost, setdetailpost] = useState(""); // id de posts qu'on veut savoir ses détails
  const [searchpost, setsearchpost] = useState(""); // filtre par title
  const [loader, showLoader, hideLoader] = useFullpageLoader(); //loading
  function throwerror() {
    throw "error";
  } //emettre un erreur
  function getposts(page) {
    showLoader();
    axios
      .get(`https://gorest.co.in/public/v1/posts?page=${page}`)
      .then((response) => {
        setposts(response.data.data);
        setpostlist(response.data.data);
      })
      .then((json) => hideLoader())
      .catch((error) => console.log(error));
  } // requéte pour avoir liste des posts d'une page
  function getPostRelatedToUser(userdId) {
    showLoader();
    axios
      .get(`https://gorest.co.in/public/v1/posts?user_id=${userdId}`)
      .then((response) => setpostlist(response.data.data))
      .then((json) => hideLoader())
      .catch((error) => console.log(error)); // requéte pour avoir liste des posts d'une page
  } // fonction pour avoir liste de posts d'une page
  useEffect(() => {
    props.post ? getPostRelatedToUser(props.post) : getposts(pages);
  }, []); //avoir liste de users du 1ere page ou liste de posts relié a un user dans le mounting
  function getnextpage() {
    getposts(pages + 1);
    setpages(pages + 1);
  } // fonction pour accéder au page suivante

  function getpreviouspage() {
    getposts(pages - 1);
    setpages(pages - 1);
  } // fonction pour accéder au page précédente
  function postsearch() {
    let newposts = [];
    if (searchpost.length) {
      allposts.forEach((post) => {
        let postsearch = post.title.toLowerCase();
        if (postsearch.indexOf(searchpost.toLowerCase()) === 0) {
          newposts.push(post);
        }
      });
    } else {
      newposts = allposts;
    }
    setpostlist(newposts);
  } //fonction pour filtrer la liste de posts par title
  return (
    <div className="App-body">
      <div>
        {detailpost || props.post ? (
          <div></div>
        ) : (
          <input
            onChange={(e) => setsearchpost(e.target.value)}
            placeholder="title"
          />
        )}
        {detailpost || props.post ? (
          <div></div>
        ) : (
          <button onClick={postsearch}>search</button>
        )}
      </div>
      {pages === 1 || detailpost || props.post ? (
        <div></div>
      ) : (
        <button onClick={getpreviouspage}>previous page</button>
      )}
      {pages > 66 || detailpost || props.post ? (
        <div></div>
      ) : (
        <button onClick={getnextpage}>next page</button>
      )}
      {postlist && !detailpost ? (
        postlist.map((posts, key) => (
          <Postsdata detail={(e) => setdetailpost(e)} key={key} datas={posts} />
        ))
      ) : postlist && detailpost ? (
        <div className="App-border">
          {" "}
          <h1>body </h1>
          {detailpost}{" "}
        </div>
      ) : (
        throwerror()
      )}
      {loader}
    </div> // afficher la liste des posts avec filtre
  );
}
export default Posts;

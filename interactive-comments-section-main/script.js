const page=document.getElementById("page-center");
const comments=document.getElementById("comments");
const modal=document.getElementById("modal");
const cancelBtnModal=document.getElementById("cancelDelete");
const isEditActive=false;

let deleteBtn=null;
let editBtn=null;

let isReplayActive=false;
let replayBtn=null;

const user={};
// 
function onReplayBtn(ev){
  const commentReplay=document.querySelector("#replayComment");
  commentReplay.remove();
  isReplayActive=false;
}
function replayButtonOnClick(ev){
  ev.preventDefault();
  const parent=ev.currentTarget.parentElement.parentElement.parentElement.parentElement;
  if(!isReplayActive){
    const isInCommentReplies=parent.classList.contains("w-50");
    parent.insertAdjacentHTML("afterend",returnReplayComment(isInCommentReplies));
    replayBtn=document.querySelector("#replayBtn");
    replayBtn.onclick=onReplayBtn;
    isReplayActive=true;
  }

}
function registerOnclickEventOnReplayButtons(){
  const replayButtons=document.getElementsByClassName("replay-button");
  for(let el in replayButtons){
    replayButtons[el].onclick=replayButtonOnClick;
  }
}
function fetchData(cb){
    return fetch("./data.json").then(res=>res.json()).then(data=>cb(data));
}

function createComment(comment){
    comments.innerHTML+=
    `
    <section class="comment" data-comment="${comment.id}">
        <div class="voter">
          <button class="voter-button" >
            <img src="./images/icon-plus.svg" alt="plus">
          </button>
          <p class="voter-text">${comment.score}</p>
          <button class="voter-button">
            <img src="./images/icon-minus.svg" alt="plus">
          </button>
        </div>
        <div class="headerOfSection">
          <div class="profile-container">
            <div class="col-left">
              <img class="profile-image" src="${comment.user.image.png}" alt="">
            </div>
            <div class="col-left">
              <p class="profile-username">${comment.user.username}</p>
            </div>
            <div class="col-left">
              <p class="profile-date">${comment.createdAt}</p>
            </div>
            ${comment.user.username!=user.username?`
            <div class="col-right">
            <div class="profile-button replay-button">
              <img src="images/icon-reply.svg" alt="">
              <a href="">Replay</a>
            </div>
            <div class="clear-fix"></div>
          </div>`:` <div class="col-right">
          <div class="profile-button ml-10">
            <img src="images/icon-edit.svg" alt="">
            <a href="">Edit</a>
          </div>
          <div class="clear-fix"></div>
          
        </div>
        <div class="col-right">
          <div class="profile-button ">
            <img src="images/icon-delete.svg" alt="">
            <a id="deleteBtn" class="red" href="">Delete</a>
          </div>
          <div class="clear-fix"></div>
        </div>
       `}
        
          </div>
        </div>
        <div class="comment-content">
          <p>${comment.content}</p>
        </div>
        <div class="comment-editing">
        <textarea class="comment-editor">${comment.content}</textarea>
        <button class="update-button">update</button>
      </div>
    </div>

      </section>
    `
    
    if(comment.replies.length>0){
      let commentString='';
      for(let i=0;i<comment.replies.length;i++){
        let currentReplay=comment.replies[i];
        commentString+=
        `
        <div  class="comment w-50 right-part" data-comment="${currentReplay.id}">
        <div class="voter">
          <button class="voter-button" >
            <img src="./images/icon-plus.svg" alt="plus">
          </button>
          <p class="voter-text">${currentReplay.score}</p>
          <button class="voter-button">
            <img src="./images/icon-minus.svg" alt="plus">
          </button>
        </div>
        <div class="headerOfSection">
          <div class="profile-container">
            <div class="col-left">
              <img class="profile-image" src="${currentReplay.user.image.png}" alt="">
            </div>
            <div class="col-left">
              <p class="profile-username">${currentReplay.user.username}</p>
            </div>
            <div class="col-left">
              <p class="profile-date">${currentReplay.createdAt}</p>
            </div>
            ${currentReplay.user.username!=user.username?`
            <div class="col-right">
            <div class="profile-button replay-button">
              <img src="images/icon-reply.svg" alt="">
              <a href="">Replay</a>
            </div>  
            <div class="clear-fix"></div>
          </div>`:` <div class="col-right">
          <div id="editBtn"  class="profile-button ml-10">
            <img src="images/icon-edit.svg" alt="">
            <a href="">Edit</a>
          </div>
          <div class="clear-fix"></div>
          
        </div>
        <div class="col-right">
          <div id="deleteBtn" class="profile-button ">
            <img src="images/icon-delete.svg" alt="">
            <a  class="red" href="">Delete</a>
          </div>
          <div class="clear-fix"></div>
        </div>
       `}
           
          </div>
        </div>
        <div class="comment-content">
          <p>
            ${currentReplay.content}
          </p>

          <div class="comment-editing">
            <textarea class="comment-editor">${currentReplay.content}</textarea>
            <button class="update-button">update</button>
          </div>
        </div>

    </div>
        `
      }
      comments.innerHTML+=
      `
      <section class="comment-replies">
        <div class="vl"></div>
      
        <div class="col">
          ${commentString}
        </div>
        </section>

      `

    }
}
function createCommentPost(user){
  comments.innerHTML+=`
  <div class="comment-post">
  <div class="comment-post-img">
    <img src="${user.image.png}" alt="">
  </div>
  <div class="comment-post-textarea">
    <textarea name="comment" placeholder="Add a comment..." id="" cols="30" rows="10"></textarea>
  </div>
  <div class="comment-post-button">
    <button class="commentBtn" id="sendBtn">send</button>
  </div>
</div>

  `
}
function returnReplayComment(isInCommentReplies){
  return `
    <div id="replayComment" class="comment-post ${isInCommentReplies?'w-50 right-part':''}">
    <div class="comment-post-img">
      <img src="${user.image.png}" alt="">
    </div>
    <div class="comment-post-textarea">
      <textarea class="${isInCommentReplies?'smallTextArea':''}" name="comment" placeholder="Add a comment..." id="" cols="30" rows="10"></textarea>
    </div>
    <div class="comment-post-button">
      <button class="commentBtn" id="replayBtn">replay</button>
    </div>
  </div>
  `;

}
function showDeleteModal(ev){
  ev.preventDefault();
  modal.style.display="block";
}
function onEditText(ev){
  ev.preventDefault();
  const commentContent=findAncestor(ev.target,"comment").querySelector(".comment-content");
  const paragraph=commentContent.querySelector("p");
  const commentEditor=commentContent.querySelector(".comment-editing");
  paragraph.style.display="none";
  commentEditor.style.display="block";

}
function cancelModal(){
  modal.style.display="none";
}
function loadingComments(data){
    Object.assign(user,data.currentUser);
    for(let i=0;i<data.comments.length;i++){
        const currentComment=data.comments[i];
        createComment(currentComment);
    }
    createCommentPost(data.currentUser);
    registerOnclickEventOnReplayButtons();
    deleteBtn=document.getElementById("deleteBtn");
    editBtn=document.getElementById("editBtn");

    cancelBtnModal.onclick=cancelModal;
    editBtn.onclick=onEditText;

    deleteBtn.onclick=showDeleteModal
}
function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));

  return el;
}
fetchData(loadingComments);

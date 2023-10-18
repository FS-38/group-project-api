const community = document.getElementById("community-wrapper");
const userLogin = JSON.parse(localStorage.getItem("user"));
const getStoryAndDisplay = async () => {
  const response = await fetch(
    "https://6526adf4917d673fd76cc91f.mockapi.io/api/story"
  );
  const data = await response.json();
  // sorting data dari terbaru
  data.sort((a, b) => b.id - a.id);

  // Bersihkan konten HTML pada elemen "community-wrapper"
  community.innerHTML = "";

  // Tambahkan cerita ke elemen "community-wrapper"
  data.forEach((story) => {
    const isLiked = story.userLike.find((data) => data === story.user.userId);
    const likeButton = document.createElement("button");
    likeButton.classList.add("btn", "like-button");

    if (isLiked) {
      likeButton.innerHTML = `
        <i class="bi bi-heart-fill" style="color:red"></i>
      `;
      likeButton.classList.add("liked"); // Tambahkan kelas CSS "liked" untuk mengubah tampilan tombol "Like".
    } else {
      likeButton.innerHTML = `
        <i class="bi bi-heart"></i>
      `;
    }

    const storyCard = document.createElement("div");
    storyCard.classList.add("card");
    storyCard.style.width = "60rem";
    storyCard.innerHTML = `
      <div class="card-body row">
        <div class="col">
          <h5 class="card-title">${story.user.name}</h5>
          <p class="card-text">${story.content}</p>
        </div>
        <div class="col-2 d-flex flex-column align-items-center">
          ${likeButton.outerHTML}
          <span>${story.userLike.length}</span>
        </div>
      </div>
    `;

    const likeElement = storyCard.querySelector(".like-button");
    likeElement.addEventListener("click", async () => {
      try {
        await likeHandler(story, isLiked);
        getStoryAndDisplay();
      } catch (error) {
        console.error(error);
      }
    });

    community.appendChild(storyCard);
  });
};

const postStory = async ({ content }) => {
  await fetch("https://6526adf4917d673fd76cc91f.mockapi.io/api/story", {
    method: "POST",
    body: JSON.stringify({
      user: {
        userId: userLogin.id,
        name: userLogin.username,
      },
      content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Setelah berhasil memposting cerita, panggil fungsi untuk mengambil dan menampilkan cerita terbaru
  getStoryAndDisplay();
};

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    // const isPost = confirm("Do you really want to post this story?");
    // if (isPost) {
    //   const inputPost = document.getElementById("input-post");
    //   await postStory({ content: inputPost.value });
    //   inputPost.value = "";
    // }

    Swal.fire({
      title: "Do you really want to post this story?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputPost = document.getElementById("input-post");
        postStory({ content: inputPost.value });
        inputPost.value = "";  
      }
    });

    // Kirim cerita baru
  });

const likeHandler = async (story, isLiked) => {
  let data = [];

  if (isLiked) {
    data = story.userLike.filter((data) => data !== userLogin.id);
  } else {
    data = [...story.userLike, userLogin.id];
  }

  const response = await fetch(
    `https://6526adf4917d673fd76cc91f.mockapi.io/api/story/${story.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        userLike: data,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Gagal mengirim permintaan Like");
  }
};

getStoryAndDisplay();

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./indexLogin.html";
});

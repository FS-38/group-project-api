const community = document.getElementById("community-wrapper");

const getStoryAndDisplay = async () => {
  const response = await fetch(
    "https://6526adf4917d673fd76cc91f.mockapi.io/api/story"
  );
  const data = await response.json();

  // Bersihkan konten HTML pada elemen "community-wrapper"
  community.innerHTML = "";

  // Tambahkan cerita ke elemen "community-wrapper"
  data.forEach((story) => {
    const storyCard = `
      <div class="card" style="width: 60rem">
        <div class="card-body">
          <h5 class="card-title">${story.userId}</h5>
          <p class="card-text">
            ${story.content}
          </p>
        </div>
      </div>`;
    community.innerHTML += storyCard;
  });
};

const postStory = async ({ content }) => {
  await fetch("https://6526adf4917d673fd76cc91f.mockapi.io/api/story", {
    method: "POST",
    body: JSON.stringify({
      userId: "Muhamad Saman",
      content,
      like: 0,
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
    const inputPost = document.getElementById("input-post").value;

    // Kirim cerita baru
    await postStory({ content: inputPost });
    location.reload();
  });
getStoryAndDisplay();

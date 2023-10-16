// coding here
const community = document.getElementById("community-wrapper");

const getStory = async () => {
  const response = await fetch(
    "https://6526adf4917d673fd76cc91f.mockapi.io/api/story"
  );
  const story = await response.json();

  return story;
};
getStory().then((data) => {
  data.map((story) => {
    const storyCard = `
    <div class="card" style="width: 60rem" ke>
              <div class="card-body">
                <h5 class="card-title">${story.userId}</h5>
                <p class="card-text">
                  ${story.content}
                </p>
            </div>`;
    community.innerHTML += storyCard;
  });
});

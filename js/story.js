// coding here

const getStory = async () => {
  const response = await fetch(
    "https://6526adf4917d673fd76cc91f.mockapi.io/api/story"
  );
  const story = await response.json();
  console.log(story);
};
getStory();

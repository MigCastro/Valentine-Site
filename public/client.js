document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  yesBtn.addEventListener('click', () => {
    console.log('Yes button clicked'); // Debugging line
    fetchLoveNote();
  });

  noBtn.addEventListener('click', () => {
    console.log('No button clicked'); // Debugging line
    showRagingCatImage();
  });
});

async function fetchLoveNote() {
  try {
    console.log('Fetching love note...'); // Debugging line
    const response = await axios.get('/loveNote');
    console.log('Love note response:', response.data); // Debugging line
    const loveNoteDiv = document.getElementById('loveNote');
    loveNoteDiv.innerHTML = `<p>${response.data.loveNote}</p>`;
    loveNoteDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching love note:', error);
  }
}

async function showRagingCatImage() {
  try {
    console.log('Fetching cat image...'); // Debugging line
    const response = await axios.get('/catImage');
    console.log('Cat image response:', response.data); // Debugging line
    const catImageDiv = document.getElementById('catImage');
    catImageDiv.innerHTML = `<img src="${response.data.catImageUrl}" alt="Raging Cat">`;
    catImageDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching cat image:', error);
  }
}

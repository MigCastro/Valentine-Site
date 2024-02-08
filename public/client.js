document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  yesBtn.addEventListener('click', () => {
    console.log('Yes button clicked');
    fetchLoveCatImage();
    if (document.getElementById('loveNote').style.display === 'block') {
      document.getElementById('loveNote').style.display = 'none'; // Hide love note if visible
    }
    fetchLoveNote();
  });

  noBtn.addEventListener('click', () => {
    console.log('No button clicked');
    document.getElementById('loveNote').style.display = 'none'; // Hide love note if visible
    showRagingCatImage();
  });
});


async function fetchLoveNote() {
  try {
    console.log('Fetching love note...');
    document.getElementById('loadingPlaceholder').style.display = 'block'; // Show loading placeholder
    const response = await axios.get('/generateLoveNote');
    console.log('Love note response:', response.data);
    const loveNoteDiv = document.getElementById('loveNote');
    loveNoteDiv.innerHTML = `<p>${response.data.loveNote}</p>`;
    loveNoteDiv.style.display = 'block';
    document.getElementById('loadingPlaceholder').style.display = 'none'; // Hide loading placeholder
  } catch (error) {
    console.error('Error fetching love note:', error);
  }
}


async function showRagingCatImage() {
  try {
    console.log('Fetching cat image...');
    const response = await axios.get('/catImage');
    console.log('Cat image response:', response.data);
    const catImageDiv = document.getElementById('catImage');
    catImageDiv.innerHTML = `<iframe src="${response.data.embedUrl}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    catImageDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching cat image:', error);
  }
}

async function fetchLoveCatImage() {
  try {
    console.log('Fetching love cat image...'); // Debugging line
    const response = await axios.get('/loveCatImage');
    console.log('Love cat image response:', response.data); // Debugging line

    const catImageDiv = document.getElementById('catImage');
    catImageDiv.innerHTML = `<iframe src="${response.data.embedUrl}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    catImageDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching love cat image:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-button');

  // Gestione click sui link dei progetti
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault(); // Impedisce il cambio pagina
      const url = link.getAttribute('href');
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Blocca lo scroll del sito sotto
      
      try {
        modalBody.innerHTML = '<div class="loader">Loading...</div>';
        const response = await fetch(url);
        const html = await response.text();
        
        // Estraiamo solo il contenuto utile (dentro <section>) per non caricare doppi head/nav
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('section').innerHTML;
        
        modalBody.innerHTML = content;
      } catch (err) {
        modalBody.innerHTML = 'Error loading content.';
      }
    });
  });

  // Chiudi il modal
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  closeBtn.onclick = closeModal;
  window.onclick = (e) => { if (e.target == modal) closeModal(); };
});
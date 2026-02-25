// script.js
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
  
    // Navbar background is static white; no scroll-based changes needed
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.add('bg-white', 'shadow-md', 'border-b', 'border-brand-beige');
    }
    // (previous scroll listener removed - navigation now stays white at all times)

  
    // Mobile Menu logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;
  
    menuBtn?.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu?.classList.toggle('hidden');
      // Simple toggle between menu and x
      if (isMenuOpen) {
         menuIcon?.setAttribute('data-lucide', 'x');
      } else {
         menuIcon?.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });
  
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        isMenuOpen = false;
        menuIcon?.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });

    // Gallery scroll functionality
    const gallery = document.querySelector('.overflow-x-auto');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (gallery && scrollLeftBtn && scrollRightBtn) {
      const scrollAmount = 400; // Adjust scroll amount as needed

      scrollLeftBtn.addEventListener('click', () => {
        gallery.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      });

      scrollRightBtn.addEventListener('click', () => {
        gallery.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });

      // Show/hide arrows based on scroll position
      const updateArrowVisibility = () => {
        const isAtStart = gallery.scrollLeft <= 0;
        const isAtEnd = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth;

        scrollLeftBtn.style.display = isAtStart ? 'none' : 'flex';
        scrollRightBtn.style.display = isAtEnd ? 'none' : 'flex';
      };

      // Initial check
      updateArrowVisibility();

      // Update on scroll
      gallery.addEventListener('scroll', updateArrowVisibility);
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    
    // Gallery images data
    const galleryImages = [
      { src: 'img/img1.jpeg', title: 'Modern Villa', description: 'Mysuru • 4,500 sq ft' },
      { src: 'img/img2.jpeg', title: 'Luxury Interior', description: 'Bengaluru • 3,200 sq ft' },
      { src: 'img/img3.jpeg', title: 'Commercial Complex', description: 'Hassan • 8,000 sq ft' },
      { src: 'img/img4.jpeg', title: 'Apartment Complex', description: 'Tumakuru • 12 Units' },
      { src: 'img/img5.jpeg', title: 'Interior Design', description: 'Mysuru • 2,800 sq ft' },
      { src: 'img/img6.jpeg', title: 'Office Building', description: 'K.R. Nagar • 5,500 sq ft' },
      { src: 'img/img7.jpeg', title: 'Resort Project', description: 'Nanjangud • 15 Acres' },
      { src: 'img/img8.jpeg', title: 'Farmhouse', description: 'Chamarajanagar • 3 Acres' },
      { src: 'img/img9.jpeg', title: 'Duplex Home', description: 'Mysuru • 3,600 sq ft' },
      { src: 'img/img10.jpeg', title: 'Contemporary Design', description: 'Bengaluru • 4,200 sq ft' },
      { src: 'img/img11.jpeg', title: 'Traditional Home', description: 'Mysuru • 3,800 sq ft' },
      { src: 'img/img12.jpeg', title: 'Modern Kitchen', description: 'Bengaluru • 1,200 sq ft' },
      { src: 'img/img13.jpeg', title: 'Bedroom Design', description: 'Mysuru • 450 sq ft' },
      { src: 'img/img14.jpeg', title: 'Living Room', description: 'Hassan • 680 sq ft' },
      { src: 'img/img15.jpeg', title: 'Bathroom Design', description: 'Tumakuru • 180 sq ft' },
      { src: 'img/img16.jpeg', title: 'Exterior Design', description: 'K.R. Nagar • 5,200 sq ft' },
      { src: 'img/img17.jpeg', title: 'Garden Space', description: 'Nanjangud • 2,500 sq ft' },
      { src: 'img/img18.jpeg', title: 'Swimming Pool', description: 'Chamarajanagar • 800 sq ft' },
      { src: 'img/img19.jpeg', title: 'Terrace Garden', description: 'Mysuru • 1,200 sq ft' },
      { src: 'img/img20.jpeg', title: 'Parking Area', description: 'Bengaluru • 600 sq ft' },
      { src: 'img/img21.jpeg', title: 'Staircase Design', description: 'Mysuru • 240 sq ft' },
      { src: 'img/img22.jpeg', title: 'Balcony Space', description: 'Hassan • 180 sq ft' },
      { src: 'img/img23.jpeg', title: 'Pooja Room', description: 'Tumakuru • 80 sq ft' },
      { src: 'img/img24.jpeg', title: 'Study Room', description: 'K.R. Nagar • 150 sq ft' },
      { src: 'img/img25.jpeg', title: 'Kids Room', description: 'Nanjangud • 200 sq ft' },
      { src: 'img/img26.jpeg', title: 'Guest Room', description: 'Chamarajanagar • 220 sq ft' }
    ];
    
    let currentImageIndex = 0;

    // Add click handlers to all gallery images
    const galleryImageElements = document.querySelectorAll('.overflow-x-auto img');
    console.log('Found gallery images:', galleryImageElements.length);
    
    galleryImageElements.forEach((img, index) => {
      img.style.cursor = 'pointer';
      console.log('Adding click handler to image:', img.getAttribute('src'));
      
      img.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Image clicked:', img.getAttribute('src'));
        
        // Extract image number from src attribute
        const imgSrc = img.getAttribute('src');
        const match = imgSrc.match(/img(\d+)\.jpeg/);
        
        if (match) {
          const imgNumber = match[1];
          const arrayIndex = parseInt(imgNumber) - 1; // Convert to 0-based index
          console.log('Image number:', imgNumber, 'Array index:', arrayIndex);
          
          if (arrayIndex >= 0 && arrayIndex < galleryImages.length) {
            console.log('Opening lightbox for index:', arrayIndex);
            openLightbox(arrayIndex);
          } else {
            console.error('Invalid array index:', arrayIndex);
          }
        } else {
          console.error('Could not extract image number from:', imgSrc);
        }
      });
    });

    function openLightbox(index) {
      currentImageIndex = index;
      const imageData = galleryImages[index];
      
      if (!imageData || !lightboxImage || !lightboxTitle || !lightboxDescription) {
        console.error('Invalid image data or missing lightbox elements');
        return;
      }
      
      lightboxImage.src = imageData.src;
      lightboxTitle.textContent = imageData.title;
      lightboxDescription.textContent = imageData.description;
      
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Recreate lucide icons for lightbox
      lucide.createIcons();
    }

    function closeLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    }

    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }

    function updateLightboxImage() {
      const imageData = galleryImages[currentImageIndex];
      lightboxImage.src = imageData.src;
      lightboxTitle.textContent = imageData.title;
      lightboxDescription.textContent = imageData.description;
    }

    // Lightbox event listeners
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrevImage);
    lightboxNext?.addEventListener('click', showNextImage);
    
    // Close lightbox on background click
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Test function
    window.testLightbox = function() {
      console.log('Testing lightbox...');
      if (lightbox && lightboxImage && lightboxTitle && lightboxDescription) {
        console.log('Opening test lightbox with first image');
        openLightbox(0);
      } else {
        console.error('Lightbox elements not found');
      }
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('hidden')) {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            showPrevImage();
            break;
          case 'ArrowRight':
            showNextImage();
            break;
        }
      }
    });
  });